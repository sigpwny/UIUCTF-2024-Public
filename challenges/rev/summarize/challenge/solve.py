import angr
import claripy
from angr.sim_type import SimTypeInt, SimTypeFunction

proj = angr.Project('./summarize')

a, b, c, d, e, f = (claripy.BVS('a', 32), claripy.BVS('b', 32), claripy.BVS('c', 32), claripy.BVS('d', 32), claripy.BVS('e', 32), claripy.BVS('f', 32))

class Add(angr.SimProcedure):
    def run(self, a, b):
        print(a, b, a + b)
        return a + b

class Subtract(angr.SimProcedure):
    def run(self, a, b):
        return a - b

class Multiply(angr.SimProcedure):
    def run(self, a, b):
        return a * b

class XOR(angr.SimProcedure):
    def run(self, a, b):
        return a ^ b

class AND(angr.SimProcedure):
    def run(self, a, b):
        return a & b

proj.hook_symbol(0x40163d, Add(prototype=SimTypeFunction(args=[SimTypeInt(), SimTypeInt()], returnty=SimTypeInt())))
proj.hook_symbol(0x4016d8, Subtract(prototype=SimTypeFunction(args=[SimTypeInt(), SimTypeInt()], returnty=SimTypeInt())))
proj.hook_symbol(0x4016fe, Multiply(prototype=SimTypeFunction(args=[SimTypeInt(), SimTypeInt()], returnty=SimTypeInt())))
proj.hook_symbol(0x40174a, XOR(prototype=SimTypeFunction(args=[SimTypeInt(), SimTypeInt()], returnty=SimTypeInt())))
proj.hook_symbol(0x4017a9, AND(prototype=SimTypeFunction(args=[SimTypeInt(), SimTypeInt()], returnty=SimTypeInt())))

state = proj.factory.call_state(0x40137b, *[a, b, c, d, e, f])
simgr = proj.factory.simulation_manager(state)
simgr.explore(find=[0x401628], avoid=[0x4013d2, 0x401412, 0x40162f])

if len(simgr.found) == 0:
    print('No solution found')

solution = simgr.found[0]
print('a', solution.solver.eval(a))
print('b', solution.solver.eval(b))
print('c', solution.solver.eval(c))
print('d', solution.solver.eval(d))
print('e', solution.solver.eval(e))
print('f', solution.solver.eval(f))



'''

sprintf(local_48,"uiuctf{%x%x%x%x%x%x}",(ulong)local_60,(ulong)local_5c,(ulong)local_58, (ulong)local_54,(ulong)local_50,(ulong)local_4c);

To get the flag, you must correctly enter six 9-digit positive integers: a, b, c, d, e, and f.

a = 705965527
b = 780663452
c = 341222189
d = 465893239
e = 966221407
f = 217433792                                                                                                                                                                                                                      Correct.
uiuctf{2a142dd72e87fa9c1456a32d1bc4f77739975e5fcf5c6c0}
'''