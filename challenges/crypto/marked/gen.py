from itertools import cycle

flag = b"uiuctf{n0t_ju5t_th3_st4rt_but_4l50_th3_3nd!!!!!}"
key  = b"hdiqbfjq"
ct = bytes(x ^ y for x, y in zip(flag, cycle(key)))

with open("ct", "wb") as ct_file:
    ct_file.write(ct)
