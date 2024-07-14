#include <stdlib.h>
#include <stdio.h>

int main() {
  setvbuf(stdout, NULL, _IONBF, 0);
  setvbuf(stderr, NULL, _IONBF, 0);
  setvbuf(stdin, NULL, _IONBF, 0);

  int num;

  printf("Type the number 123: ");
  scanf("%d", &num);

  if (num != 123) {
    printf("You typed the wrong number!\n");
    return 1;
  }

  system("cat /flag.txt");
  return 0;
}
