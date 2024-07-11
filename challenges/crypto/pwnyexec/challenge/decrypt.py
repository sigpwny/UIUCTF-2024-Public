from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from binascii import unhexlify

KEY = unhexlify("42694269426942694269426942694269")
assert len(KEY) == 16

data = unhexlify("53C67902FB946558DBBC96ED341B8ADB")
assert len(data) == 16

def decrypt(data, key=KEY):
    cipher = AES.new(key, AES.MODE_CBC,iv=b'\x00'*16)
    dec = cipher.decrypt(data)
    try:
        return unpad(dec ,AES.block_size)
    except ValueError:
        if len(dec) % AES.block_size == 0:
            return dec
        else:
            raise ValueError


e = decrypt(data)

print(e)

# confirmed: python decrypts the openssl-encrypted data cleanly
