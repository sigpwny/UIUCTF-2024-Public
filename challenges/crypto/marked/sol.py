from itertools import cycle

with open("ct", "rb") as ct_file:
    ct = ct_file.read()

arr = bytearray(ct)
key = bytearray(x ^ y for x, y in zip(ct, b'uiuctf{'))
key.append(arr[-1] ^ ord("}"))
flag = bytes(x ^ y for x, y in zip(ct, cycle(key)))
print(flag)
