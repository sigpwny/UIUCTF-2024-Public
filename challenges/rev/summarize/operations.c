#include "operations.h"

unsigned int add(unsigned int x, unsigned int y) {
    unsigned long res = 0;
    unsigned int carry = 0;
    unsigned int count = 0;
    while (x != 0 || y != 0) {
        int last1 = x & 1;
        int last2 = y & 1;
        x >>= 1;
        y >>= 1;
        res += ((last1 ^ last2 ^ carry) << count);
        carry = (last1 & last2) | (last1 & carry) | (last2 & carry); 
        count++;
    }
    res = res + ((unsigned long)carry << count);
    return res & 0xffffffff;
}

unsigned int subtract(unsigned int x, unsigned int y) {
    y = ~y + 1;
    return add(x, y);
}

unsigned int multiply(unsigned int x, unsigned int y) {
    unsigned result = 0;
    int count = 0;
    while (x != 0) {
        unsigned int digit = x & 1;
        result += digit * (y << count);
        x = x >> 1;
        count += 1;
    }
    return result;
}

unsigned int xor(unsigned int x, unsigned int y) {
    unsigned int result = 0;
    unsigned int count = 0;
    while (x != 0 || y != 0) {
        unsigned int last1 = x & 1;
        unsigned int last2 = y & 1;
        x >>= 1;
        y >>= 1;
        result += (last1 ^ last2) << count;
        count += 1;
    }
    return result;
}

unsigned int and(unsigned int x, unsigned int y) {
    unsigned int result = 0;
    unsigned int count = 0;
    while (x != 0 || y != 0) {
        unsigned int last1 = x & 1;
        unsigned int last2 = y & 1;
        x >>= 1;
        y >>= 1;
        result += (last1 & last2) << count;
        count += 1;
    }
    return result;
}