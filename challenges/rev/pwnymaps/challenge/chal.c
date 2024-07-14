#include <stdlib.h>
#include <inttypes.h>
#include <stdio.h>
#include "chal.h"
#include "correct.h"
/*

step 1:

5 way morton: construct 60 bit input from (5) input values
zeta,phi,beta,rho,kappa
24,12,12,6,6

de-morton into 4 16-bit integers

<we are taking in multiple integers>

# count number of '1' bits in the 16-bit integer: (a ^ b ^ c ^ d)

for i in range(len(x)):
  if x[i] == 1:
    counts[x] += 1

n_correct = 0
for j in range(len(integers)):
  if counts[j] == correct[j]:
    n_correct += 1

if n_correct != NUM_INTS:
  # wipe all integers

if NUM_ints != TARGET_INTS:
  # wipe all integers

# count number of '1' bits in each 16-bit integer, and XOR with integer
a ^= count(a)
b ^= count(b)
c ^= count(c)
d ^= count(d)

final = morton(a,b,c,d)
x = final[:first_half]
y = final[first_half:]
if x is correct and y is correct for all, done.
*/

int main(int argc, char *argv[]) {
  setvbuf(stdout, NULL, _IONBF, 0);
  setvbuf(stdin, NULL, _IONBF, 0);
  // zeta,phi,beta,rho,kappa
  int n_correct;
  uint8_t counts[512][8];

  for (int j=0;j<512;j++)
    for (int i=0;i<8;i++)
      counts[i][j] = 0;

  unsigned int n_correct_checksum;

  int iters;
  uint32_t x, y;
  uint32_t zeta;
  uint16_t phi, beta;
  uint8_t rho, kappa;
  uint16_t a;
  uint32_t b;
  uint64_t c, d;
  uint16_t xorred;
  int count;

  puts("*****************");
  puts("* PWNYMAPS v0.1 *");
  puts("*****************");
  puts("The developer has only tested non-earth planetary systems. Please proceed with caution.");
  printf("%s", "Indicate your directional complexity level: ");
  scanf("%u", &iters); getchar();
  if (iters > 512 || iters < 0)
    goto fail;
  

  int right = 1;

  for (int iter=0;iter<iters;iter++) {
    
    printf("Indicate your 'Earth'-type coordinate %x {{hintText.toUpperCase()}}: ", iter);
    scanf("%u%u", &x, &y); getchar();
    // printf("Got %u %u", x, y);
    // check that y isn't more than 28 bits
    if (y > 0x0FFFFFFF) {
      goto fail;
    }
    
    zeta = x >> 8; // upper 24 bits
    phi = ((x & 0b11111111) << 4) | (y >> 28); // lower 8 bits of x, upper 4 bits of y
    beta = (y >> 16) & 0b111111111111; // 4-16th bits of y
    rho = (y >> 10) & 0b111111;
    kappa = (y >> 4) & 0b111111;
    
    a = EncodeMorton_12bit(rho, kappa);
    b = EncodeMorton_24bit(a, beta);
    c = EncodeMorton_48bit(zeta, beta);
    d = (c << 12) | phi;
    
    // printf("Got %u %u %u %u %u %u %u %lu %lu\n", zeta, phi, beta, rho, kappa, a, b, c, d);
    counts[iter][0] = Unpad64Bit_8Bit(d >> 0);
    counts[iter][1] = Unpad64Bit_8Bit(d >> 1);
    counts[iter][2] = Unpad64Bit_8Bit(d >> 2);
    counts[iter][3] = Unpad64Bit_8Bit(d >> 3);
    counts[iter][4] = Unpad64Bit_8Bit(d >> 4);
    counts[iter][5] = Unpad64Bit_8Bit(d >> 5);
    counts[iter][6] = Unpad64Bit_8Bit(d >> 6);
    counts[iter][7] = Unpad64Bit_8Bit(d >> 7);
    // printf("Got %u %u %u %u %u %u %u %u\n", counts[iter][0], counts[iter][1], counts[iter][2], counts[iter][3], counts[iter][4], counts[iter][5], counts[iter][6], counts[iter][7]);
    
    // Rearrange using transformation matrix on segments
    uint8_t tmp = counts[iter][1];
    counts[iter][1] = counts[iter][5];
    counts[iter][5] = tmp;

    xorred = (counts[iter][0] << 8 | counts[iter][1]) ^ (counts[iter][2] << 8 | counts[iter][3]) ^ (counts[iter][4] << 8 | counts[iter][5]) ^ (counts[iter][6] << 8 | counts[iter][7]);
    // printf("\nGot xorred %u", xorred);
    count = numberOfSetBits(xorred);
    // printf("iter %d, Got count %d\n, hash %u, expected %u\n\n\n", iter, count, hash(count), correct_checksums[iter]);
    if (correct_checksums[iter] != hash(count)) {
      // printf("!!!! wrong\n");
      right *= 0;
    }
  }

  if (right == 0) {
    goto fail;
  }

  for (int iter=1;iter<iters;iter++) {
    // count is 0-8, shift by 8,7
    for (int j=0;j<8;j++) {
      counts[iter][j] ^= (numberOfSetBits(counts[iter-1][j]) << 8) & 0xff;
    }
  }

  // printf("reached here\n");
  for (int iter=0; iter<iters;iter++) {
    uint8_t upper_bits = (counts[iter][1] & 0x80) >> 1 | (counts[iter][2] & 0x80) >> 2 | (counts[iter][3] & 0x80) >> 3 | (counts[iter][4] & 0x80) >> 4 | (counts[iter][5] & 0x80) >> 5 | (counts[iter][6] & 0x80) >> 6 | (counts[iter][7] & 0x80) >> 7; 
    // uppermost bit of counts[iter][0] not used yet
    uint64_t final = EncodeMorton_9x7bit(\
    counts[iter][0] & 0x7f, \
    counts[(iter) % iters][1] & 0x7f, \
    counts[(iter) % iters][2] & 0x7f, \
    counts[(iter) % iters][3] & 0x7f, \
    counts[(iter) % iters][4] & 0x7f, \
    counts[(iter) % iters][5] & 0x7f, \
    counts[(iter) % iters][6] & 0x7f, \
    counts[(iter) % iters][7] & 0x7f, \
    upper_bits);
    // Add in uppermost bit;
    uint64_t bit = (counts[iter][0] & 0x80) >> 7;
    final |= (bit << 63);

    // printf("got %lu, expected %lu\n", final, correct[iter]);
    if (final != correct[iter]) {
      goto fail;
    }
  }

  win:
  printf("%s", "You have reached your destination. PWNYMAPS does not support route plotting yet.\n");
  return 0;

  fail:
  printf("%s", "Continue straight for 500 meter(s) into Lake Michigan.\n");
  return 1;
}