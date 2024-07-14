This challenge asks us to enter six 9-digit positive integers, performs some check on the integers, and prints the flag if the check succeeds. The flag consists of the six integers hex-encoded and wrapped in the flag format. 

We begin by opening up the binary in a decompiler (I will use Ghidra for this writeup) to try to see what information we can get. 

The binary is symbol-stripped, but we can identify `main` as the first argument of `__libc_start_main`. The decompilation for `main` is about what we would expect for a challenge like this one: 

```c
undefined8 FUN_004011d6(void)

{
  char cVar1;
  long in_FS_OFFSET;
  undefined4 local_60;
  undefined4 local_5c;
  undefined4 local_58;
  undefined4 local_54;
  undefined4 local_50;
  undefined4 local_4c;
  char local_48 [56];
  long local_10;
  
  local_10 = *(long *)(in_FS_OFFSET + 0x28);
  puts(
      "To get the flag, you must correctly enter six 9-digit positive integers: a, b, c, d, e, and f ."
      );
  putchar(10);
  printf("a = ");
  __isoc99_scanf(&DAT_0040206c,&local_60);
  printf("b = ");
  __isoc99_scanf(&DAT_0040206c,&local_5c);
  printf("c = ");
  __isoc99_scanf(&DAT_0040206c,&local_58);
  printf("d = ");
  __isoc99_scanf(&DAT_0040206c,&local_54);
  printf("e = ");
  __isoc99_scanf(&DAT_0040206c,&local_50);
  printf("f = ");
  __isoc99_scanf(&DAT_0040206c,&local_4c);
  cVar1 = FUN_0040137b(local_60,local_5c,local_58,local_54,local_50,local_4c);
  if (cVar1 == '\0') {
    puts("Wrong.");
  }
  else {
    puts("Correct.");
    FUN_004010e0(local_48,"uiuctf{%x%x%x%x%x%x}",local_60,local_5c,local_58,local_54,local_50,
                 local_4c);
    puts(local_48);
  }
  if (local_10 != *(long *)(in_FS_OFFSET + 0x28)) {
                    /* WARNING: Subroutine does not return */
    __stack_chk_fail();
  }
  return 0;
}
```


`main` reads in `a`, `b`, `c`, `d`, `e`, and `f` and passes their values to a function (on my computer, Ghidra calls that function `FUN_0040137b`). If the function returns 0, `main` prints `Wrong`. Otherwise, `main` prints out the flag. So our goal is to find values of `a` - `f` that will make `FUN_0040137b` return a non-zero value. 

Let's begin by renaming `FUN_0040137b` to `check` and looking at its disassembly. We will also rename `check`'s arguments to `a`, `b`, `c`, `d`, `e`, `f`:

```c
undefined4 check(uint a,uint b,uint c,uint d,uint e,uint f)

{
  undefined4 uVar1;
  uint uVar2;
  uint uVar3;
  undefined4 uVar4;
  uint uVar5;
  uint uVar6;
  uint uVar7;
  uint uVar8;
  uint uVar9;
  uint uVar10;
  ulong uVar11;
  
  if (((((a < 0x5f5e101) || (b < 0x5f5e101)) || (c < 0x5f5e101)) ||
      ((d < 0x5f5e101 || (e < 0x5f5e101)))) || (f < 0x5f5e101)) {
    uVar1 = 0;
  }
  else if (((a < 1000000000) && (b < 1000000000)) &&
          ((c < 1000000000 && (((d < 1000000000 && (e < 1000000000)) && (f < 1000000000)))))) {
    uVar1 = FUN_004016d8(a,b);
    uVar2 = FUN_0040163d(uVar1,c);
    uVar3 = FUN_0040163d(a,b);
    uVar1 = FUN_004016fe(2,b);
    uVar4 = FUN_004016fe(3,a);
    uVar5 = FUN_004016d8(uVar4,uVar1);
    uVar6 = FUN_0040174a(a,d);
    uVar1 = FUN_0040163d(c,a);
    uVar7 = FUN_004017a9(b,uVar1);
    uVar11 = FUN_0040163d(b,d);
    uVar1 = FUN_0040163d(d,f);
    uVar8 = FUN_0040174a(c,uVar1);
    uVar9 = FUN_004016d8(e,f);
    uVar10 = FUN_0040163d(e,f);
    if ((((uVar2 % 0x10ae961 == 0x3f29b9) && (uVar3 % 0x1093a1d == 0x8bdcd2)) &&
        ((uVar5 % uVar6 == 0x212c944d &&
         ((uVar7 % 0x6e22 == 0x31be && ((int)((uVar11 & 0xffffffff) % (ulong)a) == 0x2038c43c))))) )
       && ((uVar8 % 0x1ce628 == 0x1386e2 &&
           ((uVar9 % 0x1172502 == 0x103cf4f && (uVar10 % 0x2e16f83 == 0x16ab0d7)))))) {
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}

```

`check` first checks that its arguments are actually 9 digits long. If they are, it performs a sequence of computations using a few other functions. It then makes a series of comparisons on the return values of those computations. If all the comparisons succeed, it returns 1. 

Something that we should start realizing at this point is that it's likely impossible to reverse this binary by hand. We will need to use some automation, like symbolic execution. We could try executing check() symbolically to figure out what inputs make it return 1, but we would find that symbolic execution hangs (possibly suggesting a state explosion). 

Opening up one of the functions called by `check` in the decompiler reveals why this happens. 

```c
long FUN_0040163d(uint param_1,uint param_2)

{
  byte bVar1;
  uint uVar2;
  uint uVar3;
  uint local_30;
  uint local_2c;
  uint local_20;
  long local_10;
  
  local_10 = 0;
  local_20 = 0;
  bVar1 = 0;
  local_2c = param_1;
  for (local_30 = param_2; (local_2c != 0 || (local_30 != 0)); local_30 = local_30 >> 1) {
    uVar2 = local_2c & 1;
    uVar3 = local_30 & 1;
    local_2c = local_2c >> 1;
    local_10 = local_10 + (ulong)((uVar2 ^ uVar3 ^ local_20) << (bVar1 & 0x1f));
    local_20 = uVar3 & local_20 | uVar2 & (uVar3 | local_20);
    bVar1 = bVar1 + 1;
  }
  return local_10 + ((ulong)local_20 << (bVar1 & 0x3f));
}
```

We have a for loop with a symbolic constraint. This (and the other similar loops in the other functions called by `check`) are causing the state explosion. 

While this function looks intimidating, some manual reversing (plus, optionally, dynamic analysis) will reveal that all it is doing is adding its arguments with the full adder algorithm. We can similarly reverse the other functions called by `check` and they all turn out to be arithmetic and bitwise operations. After labelling the functions, `check` looks like this:

```c

undefined4 check(uint a,uint b,uint c,uint d,uint e,uint f)

{
  undefined4 uVar1;
  uint uVar2;
  uint uVar3;
  undefined4 uVar4;
  uint uVar5;
  uint uVar6;
  uint uVar7;
  uint uVar8;
  uint uVar9;
  uint uVar10;
  ulong uVar11;
  
  if (((((a < 0x5f5e101) || (b < 0x5f5e101)) || (c < 0x5f5e101)) ||
      ((d < 0x5f5e101 || (e < 0x5f5e101)))) || (f < 0x5f5e101)) {
    uVar1 = 0;
  }
  else if (((a < 1000000000) && (b < 1000000000)) &&
          ((c < 1000000000 && (((d < 1000000000 && (e < 1000000000)) && (f < 1000000000)))))) {
    uVar1 = subtract(a,b);
    uVar2 = add(uVar1,c);
    uVar3 = add(a,b);
    uVar1 = multiply(2,b);
    uVar4 = multiply(3,a);
    uVar5 = subtract(uVar4,uVar1);
    uVar6 = XOR(a,d);
    uVar1 = add(c,a);
    uVar7 = AND(b,uVar1);
    uVar11 = add(b,d);
    uVar1 = add(d,f);
    uVar8 = XOR(c,uVar1);
    uVar9 = subtract(e,f);
    uVar10 = add(e,f);
    if ((((uVar2 % 0x10ae961 == 0x3f29b9) && (uVar3 % 0x1093a1d == 0x8bdcd2)) &&
        ((uVar5 % uVar6 == 0x212c944d &&
         ((uVar7 % 0x6e22 == 0x31be && ((int)((uVar11 & 0xffffffff) % (ulong)a) == 0x2038c43c))))) )
       && ((uVar8 % 0x1ce628 == 0x1386e2 &&
           ((uVar9 % 0x1172502 == 0x103cf4f && (uVar10 % 0x2e16f83 == 0x16ab0d7)))))) {
      uVar1 = 1;
    }
    else {
      uVar1 = 0;
    }
  }
  else {
    uVar1 = 0;
  }
  return uVar1;
}
```

This looks like a perfect candidate for symboilic execution. The only problem is the loops in the arithmetic and bitwise functions. The solution is to hook those functions out by replacing them with *function summaries* (that's where the name of this challenge comes from). 

For instance, here's a a function summary for the `add` function written in `angr`:

```python

class Add(angr.SimProcedure):
    def run(self, a, b):
        return a + b
```

And this is how we can hook `add`:

```python
proj.hook_symbol(0x40163d, Add(prototype=SimTypeFunction(args=[SimTypeInt(), SimTypeInt()], returnty=SimTypeInt())))
```

Adding hooks for the rest of the arithmetic/bitwise functions, executing `check` symbolically, and solving for the values of a, b, c, d, e, and f that make the return value 1 gives the solution (look at `solve.py` for the full solve script). On my computer, the solve script runs in about 2 minutes. 







