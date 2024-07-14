#include <stdio.h>
#include <stdbool.h> 
#include <string.h>
#include <stdlib.h>
#include "abstract.h"
#include "operations.h"

bool check(unsigned int, unsigned int, unsigned int, unsigned int, unsigned int, unsigned int);

int main(int argc, char** argv) {
    printf("To get the flag, you must correctly enter six 9-digit positive integers: a, b, c, d, e, and f.\n");

    printf("\n");

    printf("a = ");
    unsigned int a;
    scanf("%d", &a);

    printf("b = ");
    unsigned int b;
    scanf("%d", &b);

    printf("c = ");
    unsigned int c;
    scanf("%d", &c);

    printf("d = ");
    unsigned int d;
    scanf("%d", &d);

    printf("e = ");
    unsigned int e;
    scanf("%d", &e);

    printf("f = ");
    unsigned int f;
    scanf("%d", &f);

    if (check(a, b, c, d, e, f)) {
        printf("Correct.\n");
        char buf[56];
        sprintf(buf, "uiuctf{%x%x%x%x%x%x}", a, b, c, d, e, f);
        printf("%s\n", buf);
    } else {
        printf("Wrong.\n");
    }
}

bool check(unsigned int a, unsigned int b, unsigned int c, unsigned int d, unsigned int e, unsigned int f) {
    // solution: 705965527 780663452 341222189 465893239 966221407 217433792
    
    if (a <= 100000000 || b <= 100000000 || c <= 100000000 || d <= 100000000 || e <= 100000000 || f <= 100000000) {
        return false;
    }

    if (a >= 1000000000 || b >= 1000000000 || c >= 1000000000 || d >= 1000000000 || e >= 1000000000 || f >= 1000000000) {
        return false;
    }

    int c1 = (add(subtract(a, b), c)) % 17492321;
    int c2 = (add(a, b)) % 17381917;
    int c3 = (subtract(multiply(3, a), multiply(2, b))) % (xor(a, d));

    int c4 = (and(b, add(c, a))) % 28194;
    int c5 = (add(b, d)) % a;
    int c6 = (xor(c, add(d, f))) % 1893928; 
    int c7 = (subtract(e, f)) % 18294018;
    int c8 = (add(e, f)) % 48328579;

    return (c1 == 4139449) && (c2 == 9166034) && (c3 == 556569677) 
    && (c4 == 12734) && (c5 == 540591164) && (c6 == 1279714) && (c7 == 17026895) && (c8 == 23769303);
}