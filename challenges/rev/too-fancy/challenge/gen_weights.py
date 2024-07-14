flag = 'uiuctf{1_hope_that_tcls_y0ur_f4ncy!}'

# If A is invertible, Ax=b has a unique solution
# flag is x
# A^-1 @ x
'''
1) Generate a random invertible matrix A
2) Convert flag to a vector x
3) Compute b = A @ x
'''

import numpy as np
import random

random.seed(123)
np.random.seed(123)



size = len(flag)
def convert_flag(flag):
	x = []
	for i in range(size):
		x.append(ord(flag[i]))
	return x

def compute_b(A, x):
	b = A @ x
	return b

def gen_matrix(n):
	input = np.random.randint(0, 256, n*n)
	while True:
		i = 0
		j = n - 1
		idx = 1
		lookup = {}
		n = size
		matrix = np.array([[0 for _ in range(n)] for _ in range(n)])

		for val in input:
			matrix[i][j] = val
			i += 1
			j += 1
			idx += 1
			if j >= n and i < n:
				j = n - i - 1
				i = 0

			if i >= n:
				i = n - j + 1
				j = 0

			if i == 40:
				break
		if np.linalg.det(matrix) != 0:
			return input, matrix

input, A = gen_matrix(size)
x = convert_flag(flag)
b = compute_b(A, x)

# print(f'A = {A}')
# print(f'x = {x}')
# print(f'b = {b}')
assert np.allclose(A @ x, b)

assert np.allclose(np.linalg.inv(A) @ b, x)

# In the middle of A, insert N rows and columns of random numbers
# N = 4
# A = np.insert(A, size // 2, np.random.randint(0, 256, (N, size)), axis=0)
# A = np.insert(A, size // 2, np.random.randint(0, 256, (size + N, N)), axis=1)

print(f'set matrix [list {" ".join(map(str, input))}]')
print(f'set b [list {" ".join(map(str, b))}]')

# print(A[0])
# print(x)

# print(A[0] @ x)
total = 0
for i in range(len(A[0])):
	total += A[0][len(flag)-i-1] * x[len(flag)-i-1]
	# print(A[0][35-i], x[35-i], total)
# print(total)


print(len(input))
print(len(b))

# print(A @ x)
# np.savetxt('b.txt', b, fmt='%d')