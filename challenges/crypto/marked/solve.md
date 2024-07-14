For the challenge `X Marked the Spot`, the challenge was an XOR cipher, also called a one-time-pad, with known plaintext.
Solution code is in `sol.py`.
Look at that to see how the XOR operation was implemented using Python and how to load the bytes in `ct` into Python.

We want to recover `flag = b"uiuctf{????????????????????????????????????????}"` which is of length 48.
However, the `key = b"????????"` is unknown, but is of length 8.
The result of `flag ^ key` was stored in the file `ct`.
Since we have an XOR cipher, we know that `ct ^ key = flag ^ key ^ key = flag`.
So we have to find what `key` is.
By a similar logic, we have that `ct ^ flag = flag ^ key ^ flag = key`.
So if we know portions of `flag` we can find portions of `key`.
Thankfully, we know that the first 7 characters of `ct` are `uiuctf{`.
Thus, we can recover the first 7 characters of the `key`.
How do we find the last character?
Well, we don't know what the character after the opening `{` is.
However, since the length of `flag` is a multiple of the length of `key`, the last character of `key` can be recovered from the last character of `ct` which we know is `}`.
Combining all this gives us the full `key = hdiqbfjq`.
Using the full `key`, we can now decrypt `ct` to give us the `flag`:

`flag = uiuctf{n0t_ju5t_th3_st4rt_but_4l50_th3_3nd!!!!!}`.
