program.py contains the 5dbfwmvtt bytecode extracted from the binary

Input it taken and an offset of 3 + number of `+`s is applied

Each character is transformed where the ith bit indicates the ith base, then an offset applied.
E.g. if the base was [4, 211, 252, 175, 190, 31, 29, 48], the offset was 173, and the character was 151, \
151 == 0b10010111 => 48 + 190 + 252 + 211 + 4 == 705 => 705 + 173 == 110 (mod 256)

The goal is to get all transformed characters to be 0.
