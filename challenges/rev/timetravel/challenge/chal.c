#define _GNU_SOURCE

#include "chal.h"

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

char **input_buffer;
pthread_t main_thread;
pthread_mutex_t timeline_mutex;
#ifdef DEBUG
pthread_mutex_t logging_mutex;
#endif

void breakpoint() {}

// structs for timelines and tapes
#define NUM_CELLS 30000
struct mem_ptr_node {
  struct mem_ptr_node *next;
  size_t ptr;
};
struct history_node {
  struct history_node *next;
  size_t loc;
  char value;
  int timestep;
};
struct timeline {
  size_t ip;
  char tape[NUM_CELLS];
  struct history_node *history;
  struct mem_ptr_node *mem_ptrs;
  pthread_mutex_t mutex;
  int history_enabled;
  int wait;
};
struct timeline_node {
  struct timeline_node *next;
  struct timeline_node *prev;
  struct timeline tl;
};
void (*instructions[])(struct timeline_node *);

// helper functions
struct history_node *new_history_node(struct history_node *next, size_t loc,
                                      char value, int timestep) {
  struct history_node *hn = malloc(sizeof(struct history_node));
  hn->next = next;
  hn->loc = loc;
  hn->value = value;
  hn->timestep = timestep;
  return hn;
}
struct history_node *copy_history_nodes(struct history_node *nodes) {
  struct history_node *root = NULL;
  struct history_node **cur = &root;
  while (nodes != NULL) {
    *cur = new_history_node(NULL, nodes->loc, nodes->value, nodes->timestep);
    cur = &(*cur)->next;
    nodes = nodes->next;
  }
  return root;
}
void free_history_nodes(struct history_node *nodes) {
  while (nodes != NULL) {
    struct history_node *prev = nodes;
    nodes = nodes->next;
    free(prev);
  }
}
struct mem_ptr_node *copy_mem_ptr_nodes(struct mem_ptr_node *nodes) {
  struct mem_ptr_node *root = NULL;
  struct mem_ptr_node **cur = &root;
  while (nodes != NULL) {
    *cur = malloc(sizeof(struct mem_ptr_node));
    (*cur)->next = NULL;
    (*cur)->ptr = nodes->ptr;
    cur = &(*cur)->next;
    nodes = nodes->next;
  }
  return root;
}
void free_mem_ptr_nodes(struct mem_ptr_node *nodes) {
  while (nodes != NULL) {
    struct mem_ptr_node *prev = nodes;
    nodes = nodes->next;
    free(prev);
  }
}
struct timeline_node *new_timeline_node(struct timeline_node *next,
                                        struct timeline_node *prev, size_t ip,
                                        char *tape,
                                        struct history_node *history,
                                        struct mem_ptr_node *mem_ptrs) {
  struct timeline_node *tl = malloc(sizeof(struct timeline_node));
  pthread_mutex_init(&tl->tl.mutex, NULL);
  pthread_mutex_lock(&tl->tl.mutex);
  tl->next = next;
  tl->prev = prev;
  if (next != NULL) next->prev = tl;
  if (prev != NULL) prev->next = tl;
  tl->tl.ip = ip;
  if (tape == NULL) {
    memset(tl->tl.tape, 0, NUM_CELLS / sizeof(tl->tl.tape[0]));
  } else {
    memcpy(tl->tl.tape, tape, NUM_CELLS / sizeof(tl->tl.tape[0]));
  }
  tl->tl.history = history;
  tl->tl.mem_ptrs = mem_ptrs;
  tl->tl.history_enabled = 1;
  tl->tl.wait = 0;
  pthread_mutex_unlock(&tl->tl.mutex);
  return tl;
}
char read_char() {
  char c = **input_buffer;
  if (c == '\0') {
    return -1;
  }
  ++*input_buffer;
  return c;
}
void *run_timeline(void *timeline) {
  struct timeline_node *tl = timeline;

  int prev_wait = tl->tl.wait;
  while (tl->tl.ip < PROGRAM_LENGTH) {
    pthread_mutex_lock(&tl->tl.mutex);
    instructions[(size_t)program[tl->tl.ip]](timeline);
    ++tl->tl.ip;
    pthread_mutex_unlock(&tl->tl.mutex);

    if (tl->tl.wait == prev_wait) {
      tl->tl.wait = 0;
    }
    if (tl->tl.wait) {
      if (!prev_wait) {
        struct sched_param param = {};
        pthread_setschedparam(pthread_self(), SCHED_IDLE, &param);
      }
      usleep(100000 * tl->tl.wait);
    } else if (prev_wait) {
      struct sched_param param = {};
      pthread_setschedparam(pthread_self(), SCHED_OTHER, &param);
    }
    prev_wait = tl->tl.wait;
  }

  breakpoint();
  pthread_mutex_lock(&timeline_mutex);
  if (tl->prev != NULL) pthread_mutex_lock(&tl->prev->tl.mutex);
  if (tl->next != NULL) pthread_mutex_lock(&tl->next->tl.mutex);
  if (tl->prev != NULL) tl->prev->next = tl->next;
  if (tl->next != NULL) tl->next->prev = tl->prev;
  if (tl->prev != NULL) pthread_mutex_unlock(&tl->prev->tl.mutex);
  if (tl->next != NULL) pthread_mutex_unlock(&tl->next->tl.mutex);
  pthread_mutex_destroy(&tl->tl.mutex);
  pthread_mutex_unlock(&timeline_mutex);

  free_history_nodes(tl->tl.history);
  free_mem_ptr_nodes(tl->tl.mem_ptrs);
  free(tl);
  return NULL;
}

// instructions
void nop() {}
void move_right(struct timeline_node *tl) {
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
    mpn->ptr = (mpn->ptr + 1) % NUM_CELLS;
    mpn = mpn->next;
  }
}
void move_left(struct timeline_node *tl) {
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
    mpn->ptr = ((mpn->ptr - 1) % NUM_CELLS + NUM_CELLS) % NUM_CELLS;
    mpn = mpn->next;
  }
}
void increment(struct timeline_node *tl) {
  int timestep = tl->tl.history == NULL ? 0 : tl->tl.history->timestep + 1;
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
    if (tl->tl.history_enabled) {
      tl->tl.history = new_history_node(tl->tl.history, mpn->ptr,
                                        tl->tl.tape[mpn->ptr], timestep);
    }
    ++tl->tl.tape[mpn->ptr];
    mpn = mpn->next;
  }
}
void decrement(struct timeline_node *tl) {
  int timestep = tl->tl.history == NULL ? 0 : tl->tl.history->timestep + 1;
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
    if (tl->tl.history_enabled) {
      tl->tl.history = new_history_node(tl->tl.history, mpn->ptr,
                                        tl->tl.tape[mpn->ptr], timestep);
    }
    --tl->tl.tape[mpn->ptr];
    mpn = mpn->next;
  }
}
void read_in(struct timeline_node *tl) {
  int timestep = tl->tl.history == NULL ? 0 : tl->tl.history->timestep + 1;
  char c = read_char();
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
    if (tl->tl.history_enabled) {
      tl->tl.history = new_history_node(tl->tl.history, mpn->ptr,
                                        tl->tl.tape[mpn->ptr], timestep);
    }
    tl->tl.tape[mpn->ptr] = c;
    mpn = mpn->next;
  }
}
void write_out(struct timeline_node *tl) {
#ifdef DEBUG
  pthread_mutex_lock(&logging_mutex);
#endif
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
#ifdef DEBUG
    printf("%hhu ", tl->tl.tape[mpn->ptr]);
#else
    putchar(tl->tl.tape[mpn->ptr]);
#endif
    fflush(NULL);
    mpn = mpn->next;
  }
#ifdef DEBUG
  pthread_mutex_unlock(&logging_mutex);
#endif
}
void end_loop(struct timeline_node *tl);
void begin_loop(struct timeline_node *tl) {
  int all_0 = 1;
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
    all_0 &= tl->tl.tape[mpn->ptr] == 0;
    mpn = mpn->next;
  }
  if (all_0) {
    int num_brackets = 1;
    while (tl->tl.ip < PROGRAM_LENGTH && num_brackets > 0) {
      ++tl->tl.ip;
      if (instructions[(size_t)program[tl->tl.ip]] == begin_loop) {
        ++num_brackets;
      } else if (instructions[(size_t)program[tl->tl.ip]] == end_loop) {
        --num_brackets;
      }
    }
  }
}
void end_loop(struct timeline_node *tl) {
  int all_0 = 1;
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
    all_0 &= tl->tl.tape[mpn->ptr] == 0;
    mpn = mpn->next;
  }
  if (!all_0) {
    int num_brackets = 1;
    while (tl->tl.ip > 0 && num_brackets > 0) {
      --tl->tl.ip;
      if (instructions[(size_t)program[tl->tl.ip]] == begin_loop) {
        --num_brackets;
      } else if (instructions[(size_t)program[tl->tl.ip]] == end_loop) {
        ++num_brackets;
      }
    }
  }
}
void rewind_tape(struct timeline_node *tl) {
  int timestep = tl->tl.history == NULL ? 0 : tl->tl.history->timestep;
  while (tl->tl.history != NULL && tl->tl.history->timestep == timestep) {
    tl->tl.tape[tl->tl.history->loc] = tl->tl.history->value;
    struct history_node *prev = tl->tl.history;
    tl->tl.history = tl->tl.history->next;
    free(prev);
  }
}
void end_timeline(struct timeline_node *tl);
void begin_timeline(struct timeline_node *tl) {
  pthread_mutex_unlock(&tl->tl.mutex);
  breakpoint();
  pthread_mutex_lock(&timeline_mutex);
  pthread_mutex_lock(&tl->tl.mutex);
  struct timeline_node *new_tl = new_timeline_node(
      tl->next, tl, tl->tl.ip + 1, tl->tl.tape,
      copy_history_nodes(tl->tl.history), copy_mem_ptr_nodes(tl->tl.mem_ptrs));
  pthread_mutex_unlock(&timeline_mutex);

  pthread_t th;
  pthread_mutex_unlock(&tl->tl.mutex);
  pthread_create(&th, NULL, run_timeline, new_tl);
  pthread_mutex_lock(&tl->tl.mutex);
  pthread_detach(th);

  int num_parens = 1;
  while (tl->tl.ip < PROGRAM_LENGTH && num_parens > 0) {
    ++tl->tl.ip;
    if (instructions[(size_t)program[tl->tl.ip]] == begin_timeline) {
      ++num_parens;
    } else if (instructions[(size_t)program[tl->tl.ip]] == end_timeline) {
      --num_parens;
    }
  }
}
void end_timeline(struct timeline_node *tl) {
  if (pthread_self() == main_thread) {
    return;
  }
  tl->tl.ip = PROGRAM_LENGTH;
}
void move_down(struct timeline_node *tl) {
  pthread_mutex_unlock(&tl->tl.mutex);
  breakpoint();
  pthread_mutex_lock(&timeline_mutex);
  pthread_mutex_lock(&tl->tl.mutex);
  if (tl->next == NULL) {
    free_mem_ptr_nodes(tl->tl.mem_ptrs);
    tl->tl.mem_ptrs = NULL;
    goto UNLOCK;
  }
  pthread_mutex_lock(&tl->next->tl.mutex);
  struct mem_ptr_node **cur = &tl->next->tl.mem_ptrs;
  while (*cur != NULL) {
    cur = &(*cur)->next;
  }
  *cur = tl->tl.mem_ptrs;
  tl->tl.mem_ptrs = NULL;
  pthread_mutex_unlock(&tl->next->tl.mutex);
UNLOCK:
  pthread_mutex_unlock(&timeline_mutex);
}
void move_up(struct timeline_node *tl) {
  pthread_mutex_unlock(&tl->tl.mutex);
  breakpoint();
  pthread_mutex_lock(&timeline_mutex);
  pthread_mutex_lock(&tl->tl.mutex);
  if (tl->prev == NULL) {
    free_mem_ptr_nodes(tl->tl.mem_ptrs);
    tl->tl.mem_ptrs = NULL;
    goto UNLOCK;
  }
  pthread_mutex_lock(&tl->prev->tl.mutex);
  struct mem_ptr_node **cur = &tl->prev->tl.mem_ptrs;
  while (*cur != NULL) {
    cur = &(*cur)->next;
  }
  *cur = tl->tl.mem_ptrs;
  tl->tl.mem_ptrs = NULL;
  pthread_mutex_unlock(&tl->prev->tl.mutex);
UNLOCK:
  pthread_mutex_unlock(&timeline_mutex);
}
void wait_for_below(struct timeline_node *tl) {
  pthread_mutex_unlock(&tl->tl.mutex);
  breakpoint();
  pthread_mutex_lock(&timeline_mutex);
  pthread_mutex_lock(&tl->tl.mutex);
  if (tl->next == NULL) {
    goto UNLOCK;
  }
  pthread_mutex_lock(&tl->next->tl.mutex);
  if (tl->next->tl.mem_ptrs != NULL) {
    --tl->tl.ip;
    ++tl->tl.wait;
  }
  pthread_mutex_unlock(&tl->next->tl.mutex);
UNLOCK:
  pthread_mutex_unlock(&timeline_mutex);
}
void wait_for_cur(struct timeline_node *tl) {
  if (tl->tl.mem_ptrs == NULL) {
    --tl->tl.ip;
    ++tl->tl.wait;
  }
}
void wait_for_above(struct timeline_node *tl) {
  pthread_mutex_unlock(&tl->tl.mutex);
  breakpoint();
  pthread_mutex_lock(&timeline_mutex);
  pthread_mutex_lock(&tl->tl.mutex);
  if (tl->prev == NULL) {
    goto UNLOCK;
  }
  pthread_mutex_lock(&tl->prev->tl.mutex);
  if (tl->prev->tl.mem_ptrs != NULL) {
    --tl->tl.ip;
    ++tl->tl.wait;
  }
  pthread_mutex_unlock(&tl->prev->tl.mutex);
UNLOCK:
  pthread_mutex_unlock(&timeline_mutex);
}
// stop tracking history to save on memory (still allows rewinding, just
// prevents making more history)
void disable_history(struct timeline_node *tl) { tl->tl.history_enabled = 0; }
#ifdef DEBUG
void print_state(struct timeline_node *tl) {
  pthread_mutex_lock(&logging_mutex);
  printf("\ntimeline %p status (ip %zu, mem_ptrs [", tl, tl->tl.ip);
  struct mem_ptr_node *mpn = tl->tl.mem_ptrs;
  while (mpn != NULL) {
    printf("%lu", mpn->ptr);
    mpn = mpn->next;
    if (mpn != NULL) {
      printf(" ");
    }
  }
  printf("])\n");

  for (size_t i = 0; i < NUM_CELLS; ++i) {
    if (tl->tl.tape[i] == -2) {
      printf("\n");
    }
    printf("%hhu ", tl->tl.tape[i]);
    size_t j = i;
    while (j < NUM_CELLS && tl->tl.tape[i] == tl->tl.tape[j]) {
      ++j;
    }
    if (j - i > 10) {
      printf("<repeats %lu times> ", j - i);
      i = j - 1;
    }
  }
  printf("\n");
  pthread_mutex_unlock(&logging_mutex);
}
void exit_program() { exit(0); }
#else
void print_state() {}
void exit_program() {}
#endif

void (*instructions[])(struct timeline_node *) = {
    nop,          move_right,     move_left,
    increment,    decrement,      read_in,
    write_out,    begin_loop,     end_loop,
    rewind_tape,  begin_timeline, end_timeline,
    move_down,    move_up,        wait_for_below,
    wait_for_cur, wait_for_above, disable_history,
    print_state,  exit_program,
};

// main
int main(int argc, char **argv) {
  if (argc < 2) {
    puts("Usage: ./timetravel flag");
    return 1;
  }
  input_buffer = &argv[1];
  main_thread = pthread_self();
  pthread_mutex_init(&timeline_mutex, NULL);
#ifdef DEBUG
  pthread_mutex_init(&logging_mutex, NULL);
#endif

  struct mem_ptr_node *main_mpn = malloc(sizeof(struct mem_ptr_node));
  main_mpn->next = NULL;
  main_mpn->ptr = 0;
  struct timeline_node *main_timeline =
      new_timeline_node(NULL, NULL, 0, NULL, NULL, main_mpn);

  run_timeline(main_timeline);
#ifdef DEBUG
  printf("\nterminated\n");
  usleep(1000000);
#endif
  printf("\n");

  return 0;
}
