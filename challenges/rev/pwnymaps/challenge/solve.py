DEBUG=False
def debug(*args):
  if DEBUG:
    print(*args)
  
def numberOfSetBits(x):
  return bin(x)[2:].count('1')

'''
unsigned int hash(unsigned int x) {
    x = ((x >> 16) ^ x) * 0x45d9f3b;
    x = ((x >> 16) ^ x) * 0x45d9f3b;
    x = (x >> 16) ^ x;
    return x;
}
'''
def hash(x):
  x = ((x >> 16) ^ x) * 0x45d9f3b
  x &= 0xffffffff
  x = ((x >> 16) ^ x) * 0x45d9f3b
  x &= 0xffffffff
  x = (x >> 16) ^ x
  return x

# def hash(x):
#   x = ((x >> 16) ^ x) * 0x45d9f3b
#   x = ((x >> 16) ^ x) * 0x45d9f3b
#   x = (x >> 16) ^ x
#   return x

def to16bit(x):
  return x & 0xffff

def Pad16Bit(x):
  x &= 0xffff
  debug('pre-pad', hex(x), bin(x))
  x = (x | (x << 32)) & 0xf800000007ff
  x = (x | (x << 16)) & 0xf80007c0003f
  x = (x | (x << 8)) & 0xc0380700c03807
  x = (x | (x << 4)) & 0x843084308430843
  x = (x | (x << 2)) & 0x909090909090909
  x = (x | (x << 1)) & 0x1111111111111111
  debug('pad', hex(x), bin(x))
  return x

def Unpad64Bit(x):
  debug('pre-unpad', hex(x), bin(x))
  x &= 0x1111111111111111
  x = (x | (x >>  1)) & 0x909090909090909
  x = (x | (x >>  2)) & 0x843084308430843
  x = (x | (x >>  4)) & 0x0c0380700c03807
  x = (x | (x >>  8)) & 0x000f80007c0003f
  x = (x | (x >> 16)) & 0x000f800000007ff
  x = (x | (x >> 32)) & 0x00000000000ffff
  debug('unpad', hex(x), bin(x))
  return x


def Pad6Bit(x):
  x &= 0x3f
  x = (x | (x << 4)) & 0x30f
  x = (x | (x << 2)) & 0x333
  x = (x | (x << 1)) & 0x555
  return x


def Pad12Bit(x):
  x &= 0xfff
  x = (x | (x << 8)) & 0xf00ff
  x = (x | (x << 4)) & 0xf0f0f
  x = (x | (x << 2)) & 0x333333
  x = (x | (x << 1)) & 0x555555
  return x


def Pad24Bit(x):
  x &= 0xffffff
  x = (x | (x << 16)) & 0xff0000ffff
  x = (x | (x << 8)) & 0xff00ff00ff
  x = (x | (x << 4)) & 0xf0f0f0f0f0f
  x = (x | (x << 2)) & 0x333333333333
  x = (x | (x << 1)) & 0x555555555555
  return x

def Pad7Bit(x):
  x &= 0x7f
  x = (x | (x << 32)) & 0x700000000f
  x = (x | (x << 16)) & 0x400030000c0003
  x = (x | (x << 8)) & 0x40201008040201
  return x

def Unpad7Bit(x):
  x &= 0x40201008040201
  x = (x | (x >>  8)) & 0x400030000c0003
  x = (x | (x >> 16)) & 0x700000000f
  x = (x | (x >> 32)) & 0x7f
  assert x | (1 << 64) == 0
  return x

'''
uint8_t Unpad64Bit_8Bit(uint64_t x) {
  x &= 0x80006000180007;
  x = (x | (x >> 1)) & 0x80402010080403;
  x = (x | (x >> 2)) & 0x80402100804021;
  x = (x | (x >> 4)) & 0x81008100810081;
  x = (x | (x >> 8)) & 0x101010101010101;
  x = (x | (x >> 16)) & 0xe00000001f;
  x = (x | (x >> 32)) & 0xff;
}
'''
def Unpad64Bit_8Bit(x):
  x &= 0x101010101010101
  x = (x | (x >> 1)) & 0x81008100810081
  x = (x | (x >> 2)) & 0x80402100804021
  x = (x | (x >> 4)) & 0x80402010080403
  x = (x | (x >> 8)) & 0x80006000180007
  x = (x | (x >> 16)) & 0xe00000001f
  x = (x | (x >> 32)) & 0xff
  return x

def Pad64Bit_8Bit(x):
  x &= 0xff
  x = (x | (x << 32)) & 0xe00000001f
  x = (x | (x << 16)) & 0x80006000180007
  x = (x | (x << 8)) & 0x80402010080403
  x = (x | (x << 4)) & 0x80402100804021
  x = (x | (x << 2)) & 0x81008100810081
  x = (x | (x << 1)) & 0x101010101010101
  return x
'''
uint64_t EncodeMorton_9x7bit( uint8_t a, uint8_t b, uint8_t c, uint8_t d, uint8_t e, uint8_t f, uint8_t g, uint8_t h, uint8_t i) {
  return Pad7Bit(a) | Pad7Bit(b) << 1 | Pad7Bit(c) << 2 | Pad7Bit(d) << 3 | Pad7Bit(e) << 4 | Pad7Bit(f) << 5 | Pad7Bit(g) << 6 | Pad7Bit(h) << 7 | Pad7Bit(i) << 8;
}
'''
def EncodeMorton_9x7bit(a, b, c, d, e, f, g, h, i):
  return Pad7Bit(a) | Pad7Bit(b) << 1 | Pad7Bit(c) << 2 | Pad7Bit(d) << 3 | Pad7Bit(e) << 4 | Pad7Bit(f) << 5 | Pad7Bit(g) << 6 | Pad7Bit(h) << 7 | Pad7Bit(i) << 8

def DecodeMorton_9x7bit(x):
  print(x)
  return Unpad7Bit(x), Unpad7Bit(x >> 1), Unpad7Bit(x >> 2), Unpad7Bit(x >> 3), Unpad7Bit(x >> 4), Unpad7Bit(x >> 5), Unpad7Bit(x >> 6), Unpad7Bit(x >> 7), Unpad7Bit(x >> 8)

def EncodeMorton_12bit(a, b):
  return Pad6Bit(a) | (Pad6Bit(b) << 1)

def EncodeMorton_24bit(a,  b):
  return Pad12Bit(a) | Pad12Bit(b) << 1

def EncodeMorton_48bit(a, b):
  return Pad24Bit(a) | Pad24Bit(b) << 1

def EncodeMorton_64bit( a,  b,  c,  d):
  debug('encode', hex(a), hex(b), hex(c), hex(d))
  res = Pad16Bit(a) | Pad16Bit(b) << 1 | Pad16Bit(c) << 2 | Pad16Bit(d) << 3

  return res

if __name__ == '__main__':
  target_out = 0xce_ce_ce_ce_ce_ce_ce_ce
  debug('target', hex(target_out), bin(target_out))
  # working backwards...
  a = Unpad64Bit(target_out >> 0)
  b = Unpad64Bit(target_out >> 1)
  c = Unpad64Bit(target_out >> 2)
  d = Unpad64Bit(target_out >> 3)
  debug(hex(a), hex(b), hex(c), hex(d))
  re_encoded = EncodeMorton_64bit(a,b,c,d)

  prevSetBits = [numberOfSetBits(0), numberOfSetBits(0), numberOfSetBits(0)]

  a ^= prevSetBits[0]
  b ^= prevSetBits[1]
  c ^= prevSetBits[2]
  d ^= prevSetBits[3]

  assert re_encoded == target_out
