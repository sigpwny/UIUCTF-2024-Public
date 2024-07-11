from pwn import *

with open('correct_coords.txt', 'r') as f:
    coords = [
        [int(w) for w in c.split(' ')] for c in
        f.read().strip().split('\n')
    ]

complexity = len(coords)
print(complexity)
r = process(['./chal'])
r.recvuntil(b'level: ')
r.sendline(str(complexity).encode('utf-8'))
# r.interactive()

for (x, y) in coords:
    r.recvuntil(b': ')
    # print(f'Sending {x} {y}')
    r.sendline(f'{x} {y}'.encode('utf-8'))
    # print('ok')

buf = r.recvall()
if b'reached your destination' in buf:
    print('OK')
else:
    print('FAIL')