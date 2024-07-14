import bf
from program import program
import re
import z3

ops = '0><+-,.[]~()v^@$%*?!'

program = "".join([ops[x] for x in program])
with open("program.txt", "w") as f:
    f.write(program)

flag = [z3.BitVec("x"+str(i), 8) for i in range(50)]
solver = z3.Solver()

# find input increments
chars = []
for i, match in enumerate(re.findall("\(\+\+\+\+\+>\+\+\+\+\+\+\+\+\+<\[->\[->\+>\+<<]>\[-<\+>]<<]>>>\+\.,(\++)\[-\[->\+<]>]@v\)@", program)):
    chars.append(flag[i] + len(match) + 3)


def transform(x, base, offset):
    # if the ith bit is set, add base[i]
    res = sum([z3.If(x & (1 << i) == (1 << i), z3.BitVecVal(base[i], 8), 0) for i in range(8)])
    res += offset
    return res


# find all transformations
for i, match in reversed(list(enumerate(re.findall("\$([<>\-\+\[\]]*)@v", program)))):
    match2 = re.search("<\+\+\[-->\[-<\+>]<\+<\+\+]-->\[->>>\+<<<]>>>\[\[-<-\[<<\[-->>>>>>>\+(?:-\+)?<<<<<<]\+\[->\+]]<<\+>>>]>>>>]\+\+\[--<\+\+]-->(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>\+\+\[-->\[-<\+>]<<\+\+]--([<>\-\+\[\]]*)\[\[->\+<]>-]", match)
    match3 = re.search("<\+\+\[-->\[-<\+>]<\+<\+\+]-->\[->>>\+<<<]>>>\[\[-<-\[<<\[-->>>>>>>\+(?:-\+)?<<<<<<]\+\[->\+]]<<\+>>>]>>>>]\+\+\[--<\+\+]-->(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>(\[[<>\-\+\[\]]*])>>>>\+\+\[-->\[-<\+>]<<\+\+]--([<>\-\+\[\]]*)\[\[->\+<]>-]", match)
    if (match3):
        # edge case
        match2 = [match3[j] for j in range(9)] + [match3[10]]
    if (match2):
        # first 8 groups are bases, last group is offset
        base = []
        for j in range(8):
            res = bf.run("+" + match2[j + 1])
            if (res == None):
                # if it does not halt, then we want to avoid it
                base.append(0)
                solver.add(chars[i % 50] & (1 << j) == 0)
            else:
                base.append(sum(res) % 256)
        offset = sum(bf.run(match2[9]))
        if (i % 50 == 10):
            print(base)
            print(offset)
        chars[i % 50] = transform(chars[i % 50], base, offset)

for i, x in enumerate(chars):
    solver.add(x == 0)

assert solver.check().r == 1
model = solver.model()
flag = [model.eval(x).as_long() for x in flag]
flag = "".join([chr(x) for x in flag])
print(flag)
