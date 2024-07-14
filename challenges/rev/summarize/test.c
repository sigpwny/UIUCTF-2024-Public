#include <stdio.h>
#include "operations.h"
#include <assert.h>

void test_add();
void test_subtract();

void main() {
    // test_add();
    test_subtract();
}

void test_add() {
    assert(add(2, 3) == 5);
    assert(add(100, 200) == 300);
}

void test_subtract() {
    assert(subtract(3, 2) == 1);
    assert(subtract(100, 75) == 25);
}