def run(program, max_steps=1000000):
    ip = 0
    ptr = 0
    tape = [0]*30000
    steps = 0
    while ip < len(program):
        if (program[ip] == ">"):
            ptr = (ptr+1) % len(tape)
        elif (program[ip] == "<"):
            ptr = (ptr-1) % len(tape)
        elif (program[ip] == "+"):
            tape[ptr] = (tape[ptr]+1) % 256
        elif (program[ip] == "-"):
            tape[ptr] = (tape[ptr]-1) % 256
        elif (program[ip] == "["):
            if (tape[ptr] == 0):
                counter = 1
                while (counter != 0 and ip < len(program)):
                    ip += 1
                    if (program[ip] == "["):
                        counter += 1
                    elif (program[ip] == "]"):
                        counter -= 1
        elif (program[ip] == "]"):
            if (tape[ptr] != 0):
                counter = 1
                while (counter != 0 and ip >= 0):
                    ip -= 1
                    if (program[ip] == "["):
                        counter -= 1
                    elif (program[ip] == "]"):
                        counter += 1
        ip += 1
        steps += 1
        if (steps > max_steps):
            print("warning: {} did not terminate".format(program))
            return None
    return tape
