#include <stdint.h>
#include <inttypes.h>
#include <stdint.h>

uint64_t Pad16Bit(uint16_t in) {
  uint64_t x = in;
  x &= 0xffff;
  x = (x | (x << 32)) & 0xf800000007ff;
  x = (x | (x << 16)) & 0xf80007c0003f;
  x = (x | (x << 8)) & 0xc0380700c03807;
  x = (x | (x << 4)) & 0x843084308430843;
  x = (x | (x << 2)) & 0x909090909090909;
  x = (x | (x << 1)) & 0x1111111111111111;
  return x;
}
uint16_t Unpad64Bit(uint64_t x) {
  x &= 0x1111111111111111;
  x = (x | (x >>  1)) & 0x909090909090909;
  x = (x | (x >>  2)) & 0x843084308430843;
  x = (x | (x >>  4)) & 0x0c0380700c03807;
  x = (x | (x >>  8)) & 0x000f80007c0003f;
  x = (x | (x >> 16)) & 0x000f800000007ff;
  x = (x | (x >> 32)) & 0x00000000000ffff;
  return x;
}

uint8_t Unpad64Bit_8Bit(uint64_t x) {
  x &= 0x101010101010101;
  x = (x | (x >> 1)) & 0x81008100810081;
  x = (x | (x >> 2)) & 0x80402100804021;
  x = (x | (x >> 4)) & 0x80402010080403;
  x = (x | (x >> 8)) & 0x80006000180007;
  x = (x | (x >> 16)) & 0xe00000001f;
  x = (x | (x >> 32)) & 0xff;
  return x;
}

uint16_t Pad6Bit(uint8_t in) {
  uint16_t x = in;
  x &= 0x3f;
  x = (x | (x << 4)) & 0x30f;
  x = (x | (x << 2)) & 0x333;
  x = (x | (x << 1)) & 0x555;
  return x;
}

uint32_t Pad12Bit(uint16_t in) {
  uint32_t x = in;
  x &= 0xfff;
  x = (x | (x << 8)) & 0xf00ff;
  x = (x | (x << 4)) & 0xf0f0f;
  x = (x | (x << 2)) & 0x333333;
  x = (x | (x << 1)) & 0x555555;
  return x;
}

uint64_t Pad24Bit(uint32_t in) {
  uint64_t x = in;
  x &= 0xffffff;
  x = (x | (x << 16)) & 0xff0000ffff;
  x = (x | (x << 8)) & 0xff00ff00ff;
  x = (x | (x << 4)) & 0xf0f0f0f0f0f;
  x = (x | (x << 2)) & 0x333333333333;
  x = (x | (x << 1)) & 0x555555555555;
  return x;
}

uint64_t Pad7Bit(uint8_t in) {
  // spacing: 8 bits. so 9*7=63 bit out
  uint64_t x = in;
  x &= 0x7f;
  x = (x | (x << 32)) & 0x700000000f;
  x = (x | (x << 16)) & 0x400030000c0003;
  x = (x | (x << 8)) & 0x40201008040201;
  return x;
}

uint16_t EncodeMorton_12bit(uint8_t a, uint8_t b) {
  return Pad6Bit(a) | (Pad6Bit(b) << 1);
}

uint32_t EncodeMorton_24bit(uint16_t a, uint16_t b) {
  return Pad12Bit(a)| Pad12Bit(b) << 1;
}

uint64_t EncodeMorton_48bit(uint32_t a, uint32_t b) {
  return Pad24Bit(a) | Pad24Bit(b) << 1;
}

uint64_t EncodeMorton_64bit(uint16_t a, uint16_t b, uint16_t c, uint16_t d) {
  return Pad16Bit(a) | Pad16Bit(b) << 1 | Pad16Bit(c) << 2 | Pad16Bit(d) << 3;
}

uint64_t EncodeMorton_9x7bit( uint8_t a, uint8_t b, uint8_t c, uint8_t d, uint8_t e, uint8_t f, uint8_t g, uint8_t h, uint8_t i) {
  return Pad7Bit(a) | (Pad7Bit(b) << 1) | (Pad7Bit(c) << 2) | \
  (Pad7Bit(d) << 3) | (Pad7Bit(e) << 4) | (Pad7Bit(f) << 5) | \
  (Pad7Bit(g) << 6) | (Pad7Bit(h) << 7) | (Pad7Bit(i) << 8);
}

int numberOfSetBits(uint32_t i)
{
     i = i - ((i >> 1) & 0x55555555);        // add pairs of bits
     i = (i & 0x33333333) + ((i >> 2) & 0x33333333);  // quads
     i = (i + (i >> 4)) & 0x0F0F0F0F;        // groups of 8
     i *= 0x01010101;                        // horizontal sum of bytes
     return  i >> 24;               // return just that top byte (after truncating to 32-bit even when int is wider than uint32_t)
}

unsigned int hash(unsigned int x) {
    x = ((x >> 16) ^ x) * 0x45d9f3b;
    x = ((x >> 16) ^ x) * 0x45d9f3b;
    x = (x >> 16) ^ x;
    return x;
}