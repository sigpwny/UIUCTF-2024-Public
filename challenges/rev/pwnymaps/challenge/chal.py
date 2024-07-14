import coords
import solve as s
from random import randint
# use matplotlib to plot all coords
from matplotlib import  pyplot as plt

xs, ys = zip(*coords.COORDS)

max_y = max(ys)
# invert coords
y_change = 28 - 12
x_change = 32 - 15

xs = [10 * i for i in xs]
ys = [int((max_y - i) * 10) for i in ys]


xs = [
    (x << x_change) + randint(0, 1 << x_change) for x in xs
]
ys = [
    (y << y_change) + randint(0, 1 << y_change) for y in ys
]
bxs = list(map(lambda x: x.bit_length(), xs))
bys = list(map(lambda x: x.bit_length(), ys))
print(min(bxs), max(bxs), 'y', min(bys), max(bys))

'''
    zeta = x >> 8; // upper 24 bits
    phi = ((x & 0b11111111) << 8) | (y >> 28); // lower 8 bits of x, upper 4 bits of y
    beta = (y >> 16) & 0b111111111111; // 4-16th bits of y
    rho = (y >> 10) & 0b111111;
    kappa = (y >> 4) & 0b111111;
    
    a = EncodeMorton_12bit(rho, kappa);
    b = EncodeMorton_24bit(a, beta);
    c = EncodeMorton_48bit(zeta, beta);
    d = (c << 12) | phi;
    
    counts[iter][0] = Unpad64Bit_8Bit(d >> 0);
    counts[iter][1] = Unpad64Bit_8Bit(d >> 1);
    counts[iter][2] = Unpad64Bit_8Bit(d >> 2);
    counts[iter][3] = Unpad64Bit_8Bit(d >> 3);
    counts[iter][4] = Unpad64Bit_8Bit(d >> 4);
    counts[iter][5] = Unpad64Bit_8Bit(d >> 5);
    counts[iter][6] = Unpad64Bit_8Bit(d >> 6);
    counts[iter][7] = Unpad64Bit_8Bit(d >> 7);

    xorred = (counts[iter][0] << 8 || counts[iter][1]) ^ (counts[iter][2] << 8 || counts[iter][3]) ^ (counts[iter][4] << 8 || counts[iter][5]) ^ (counts[iter][6] << 8 || counts[iter][7]);
    
    count = numberOfSetBits(xorred);
    if (count == correct[iter]) {
      n_correct += 1;
    }
'''


# print(x, y)
# plt.plot(xs, ys)
# plt.show()


# First, need to draw out the flag as a list of coordinates
# uiuctf{i_prefer_pwnymaps}

# Now, invert encryption in chal.c
counts = [None for _ in  range(len(xs))]

with open('correct_coords.txt', 'w') as f:
    for x, y in zip(xs, ys):
        f.write(f'{x} {y}\n')

n_correct_checksums = [None for _ in range(len(counts))]

for i, [x, y] in enumerate(zip(xs, ys)):
    print(x, y)
    assert x.bit_length() <= 32
    assert y.bit_length() <= 28
    zeta = x >> 8
    phi = ((x & 0b11111111) << 4) | (y >> 28)
    beta = (y >> 16) & 0b111111111111
    rho = (y >> 10) & 0b111111
    kappa = (y >> 4) & 0b111111

    a = s.EncodeMorton_12bit(rho, kappa)
    b = s.EncodeMorton_24bit(a, beta)
    c = s.EncodeMorton_48bit(zeta, beta)
    d = (c << 12) | phi
    print(zeta, phi, beta, rho, kappa, a, b, c, d)
    counts[i] = [
        s.Unpad64Bit_8Bit(d >> 0),
        s.Unpad64Bit_8Bit(d >> 1),
        s.Unpad64Bit_8Bit(d >> 2),
        s.Unpad64Bit_8Bit(d >> 3),
        s.Unpad64Bit_8Bit(d >> 4),
        s.Unpad64Bit_8Bit(d >> 5),
        s.Unpad64Bit_8Bit(d >> 6),
        s.Unpad64Bit_8Bit(d >> 7),
    ]

    '''
    // Rearrange using transformation matrix on segments
    uint8_t tmp = counts[iter][1];
    counts[iter][1] = counts[iter][5];
    counts[iter][5] = tmp;
    '''
    counts[i][1], counts[i][5] = counts[i][5], counts[i][1]
    print(counts[i])
    '''
    xorred = (counts[iter][0] << 8 || counts[iter][1]) ^ (counts[iter][2] << 8 || counts[iter][3]) ^ (counts[iter][4] << 8 || counts[iter][5]) ^ (counts[iter][6] << 8 || counts[iter][7]);
    
    count = numberOfSetBits(xorred);
    '''
    print('iter', i)
    xorred = (counts[i][0] << 8 | counts[i][1]) ^ (counts[i][2] << 8 | counts[i][3]) ^ (counts[i][4] << 8 | counts[i][5]) ^ (counts[i][6] << 8 | counts[i][7])
    print('xorred', xorred)
    n_correct_checksums[i] = s.hash(s.numberOfSetBits(xorred))
    print('checksum', n_correct_checksums[i])
'''
  for (int iter=1;iter<iters;iter++) {
    // count is 0-8, shift by 8,7
    for (int j=0;j<8;j++) {
      counts[iter][j] ^= (numberOfSetBits(counts[iter-1][j]) << 8) & 0xff;
    }
  }
'''

for i in range(1, len(counts)):
    for j in range(8):
        counts[i][j] ^= (s.numberOfSetBits(counts[i-1][j]) << 8) & 0xff

'''
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
    final |= ((counts[iter][0] >> 7) << 63);
    if (final != correct[iter]) {
      goto fail;
    }
  }
'''

finals = [None for _ in range(len(counts))]
for i in range(len(counts)):
    # print(counts[i])
    upper_bits = (counts[i][1] & 0x80) >> 1 | (counts[i][2] & 0x80) >> 2 | (counts[i][3] & 0x80) >> 3 | (counts[i][4] & 0x80) >> 4 | (counts[i][5] & 0x80) >> 5 | (counts[i][6] & 0x80) >> 6 | (counts[i][7] & 0x80) >> 7
    final = s.EncodeMorton_9x7bit(
        counts[i][0] & 0x7f,
        counts[(i) % len(counts)][1] & 0x7f,
        counts[(i) % len(counts)][2] & 0x7f,
        counts[(i) % len(counts)][3] & 0x7f,
        counts[(i) % len(counts)][4] & 0x7f,
        counts[(i) % len(counts)][5] & 0x7f,
        counts[(i) % len(counts)][6] & 0x7f,
        counts[(i) % len(counts)][7] & 0x7f,
        upper_bits
    )
    final |= ((counts[i][0] >> 7) << 63)
    print('final', final)
    finals[i] = final

with open('correct.h', 'w') as f:
    f.write('#include <inttypes.h>\nuint64_t correct[] = {\n')
    for i in finals:
        f.write(f'{i}UL,\n')
    f.write('};\n')

    f.write('unsigned int correct_checksums[] = {\n')
    for i in n_correct_checksums:
        f.write(f'{i},\n')
    f.write('};\n')
    # print(x.bit_length(), y.bit_length())
    # counts = s.DecodeMorton_9x7bit(coord)
    # print(counts)
    # assert coord == s.EncodeMorton_9x7bit(counts)