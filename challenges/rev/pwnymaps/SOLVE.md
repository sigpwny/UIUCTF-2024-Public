This challenge was a bit-manipulation reverse engineering challenge. The source can be seen in `chal.c`. I will not provide an explanation of morton encoding, though I reccommend reading the "Magic Bits" method from [this blog](https://www.forceflow.be/2013/10/07/morton-encodingdecoding-through-bit-interleaving-implementations/).


First, I want to address two bugs competitiors found in this challenge. 

1) I don't use the lower `16` bits of `y`.

```c
    a = EncodeMorton_12bit(rho, kappa);
    b = EncodeMorton_24bit(a, beta);
    c = EncodeMorton_48bit(zeta, beta);
```

2) The `countSetBits` function always returns `0`.


The first bug requires you to either do a `2 ** 16` bit bruteforce on `y`, or to do some clever thinking. The second bug makes the challenge easier.


As this is a pretty standard reverse engineering challenge, I didn't write a solve script. I will provide a high-level overview of the solution.

The challenge isn't stripped, so you can determine what the functions are doing rather easily. The next step is to invert all the functions. This is pretty easy, as the functions are all invertible. See some examples in `solve.py` for how to do this. This lets you determine x and y from the expected outputs.

Finally, brute force the lower `16` bits of `y` until you can pass the check. Then, plotting the results gets you ![](./challenge/Screenshot%202024-06-29%20002720.png)