# Key in a Haystack

Get parameters:
```sh
$ ncat --ssl key-in-a-haystack.chal.uiuc.tf 1337 > response.txt
$ tail -n1 response.txt | cut -d: -f2 > N.txt
```

With $N$, we can find the large factor either with ECM or Pollard-Rho:


## ECM
We can use `gmp-ecm` to find the small factor (note that this is one run - $N$ was run on 15 curves before finding a factor):

```
$ ecm -timestamp -one -c 1000 -v -v -inp ./N.txt  5000 |& sed -E "s/[0-9]{500,}/.../g"
GMP-ECM 7.0.4 [configured with GMP 6.2.1, --enable-asm-redc] [ECM]
Tuned for x86_64/k8/params.h
Running on DESKTOP-JT7D7S9
Input number is 6033358213...6642677847 (92472 digits)
[Fri Jun 28 20:54:39 2024]
Using REDC
Using B1=5000, B2=515980, polynomial x^1, sigma=0:15163481205861489210
dF=168, k=2, d=1470, d2=11, i0=-7
A=...
starting point: x0=...
Expected number of curves to find a factor of n digits:
35      40      45      50      55      60      65      70      75      80
4.8e+07 5.5e+09 Inf     Inf     Inf     Inf     Inf     Inf     Inf     Inf
Step 1 took 194422ms
x=...
After switch to Weierstrass form, P=(..., ...)
on curve Y^2 = X^3 + ... * X + b
Estimated memory usage: 283.13MB
Initializing tables of differences for F took 641ms
Computing roots of F took 4734ms
Building F from its roots took 6672ms
Computing 1/F took 2719ms
Initializing table of differences for G took 1765ms
Computing roots of G took 3594ms
Building G from its roots took 6547ms
Computing roots of G took 3812ms
Building G from its roots took 6594ms
Computing G * H took 1750ms
Reducing  G * H mod F took 2281ms
Computing polyeval(F,G) took 8391ms
Computing product of all F(g_i) took 609ms
Step 2 took 50125ms
********** Factor found in step 2: 951970865119
Found prime factor of 12 digits: 951970865119
Composite cofactor ... has 92460 digits
Peak memory usage: 0MB
```

With the small factor found, we can decrypt the flag:
```py
>>> enc_flag = bytes.fromhex( "ce4c5e2f2537a0a215ed30fd9fe6861d162d01d505d89cdd9255c38cf18ce89423cc7681c2f7874d698531ff5531893b" )
>>> AES.new(key = md5(b"951970865119").digest(), mode = AES.MODE_ECB).decrypt(enc_flag)
b'uiuctf{Finding_Key_Via_Small_Subgroups}\t\t\t\t\t\t\t\t\t'
```

## Pollard Rho
We can also use Pollard-Rho to extract the small factor from $N$. Note that, letting $p$ be the small prime factor of $N$, Pollard-Rho has a time complexity of $O(\sqrt{p})$ whereas ECM has a time complexity of $O(e^{\sqrt{2} \sqrt{\log{p} \log{\log{p}}} })$. While ECM has a greater time complexity, the smaller amount of arithmetic operations that Pollard Rho per iteration requires makes it a viable alternative to finding $p$. An example implementation is provided below:

```py
import gmpy2
from gmpy2 import mpz
from itertools import count
from tqdm import tqdm
from random import seed, randint

# Only take gcd every k steps
k = 1000
# N is number to factor
N = mpz(open("N.txt", "r").read())

ITERATION_DEBUG = len(str(N)) > 10**6
# Following implementation as given in Prime Numbers: A Computational Perspective Algorithm 5.2.1

"""
1) Choose seeds
"""

# Fix seed for reproducibility
seed(0x1337)

N_int = int(N)
a = randint(1, N_int-3)
s = randint(0, N_int-1)
U = mpz(s)
V = mpz(s)
F = lambda x: (x*x + a) % N

"""
2) Factor search
"""

tmp = mpz(1)
for i in tqdm(count(1)):
	if ITERATION_DEBUG: print(f"[+] Iteration {i}: Calculating polys")
	U = F(U)
	V = F(V); V = F(V);
	tmp_new = (tmp * abs(U-V)) % N
	# Check if tmp ever becomes 0
	if tmp_new == 0:
		# We found a factor
		print("[+] Product has become 0 - we can extract a factor!")
		print(gmpy2.gcd(abs(U-V), N), N)
		break
	tmp = tmp_new
	if i % k == 0:
		# Calculate gcd
		print(f"[+] Calculating gcd: gcd([{tmp.num_digits()} digits], [{N.num_digits()} digits])")
		# print(tmp, N)
		g = gmpy2.gcd(tmp, N)
		if g == 1:
			# Continue factor search
			continue
		elif g == N:
			# Invalid seeds
			print("[+] Invalid seeds, try again!")
			break
		else:
			# Found factor
			print(f"[+] Found factor! {g},")
			break
```

