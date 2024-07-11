import re

mapping1 = {
    ">": "move_right",
    "<": "move_left",
    "+": "increment",
    "-": "decrement",
    ",": "read_in",
    ".": "write_out",
    "[": "begin_loop",
    "]": "end_loop",
    "~": "rewind_tape",
    "(": "begin_timeline",
    ")": "end_timeline",
    "v": "move_down",
    "^": "move_up",
    "@": "wait_for_below",
    "$": "wait_for_cur",
    "%": "wait_for_above",
    "*": "disable_history",
    "?": "print_state",
    "!": "exit_program",
}

with open("program.5dbfwmvtt") as f:
    program = f.read()
with open("chal.c") as f:
    code = f.read()
    m = re.search(r"instructions[\[\]()a-z _*,]+ = {((?:\s*[a-z_]+,)+)\s*};", code)
    assert m != None
    mapping2 = {s: i for i, s in enumerate(map(str.strip, m.group(1).split(",")))}


with open("chal.h", "w") as f:
    f.write("#include <stddef.h>\n")
    f.write("const char program[] = ")
    f.write(str("".join([chr(mapping2[mapping1[s]]) for s in program if s in mapping1]).encode()).replace("'", '"').strip("b"))
    f.write(";\n")
    f.write("const size_t PROGRAM_LENGTH = sizeof(program) / sizeof(*program);\n")
