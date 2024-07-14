from itertools import cycle

with open("ct", "rb") as ct_file:
    ct = ct_file.read()

# load ct into bytes
arr = bytearray(ct)

# get first 7 characters of key
key = bytearray(x ^ y for x, y in zip(ct, b'uiuctf{'))

# get last character of key
key.append(arr[-1] ^ ord("}"))

print(f"key = {bytes(key)}")

# ct ^ key = flag ^ key ^ key = flag
flag = bytes(x ^ y for x, y in zip(ct, cycle(key)))
print(f"{flag = }")
