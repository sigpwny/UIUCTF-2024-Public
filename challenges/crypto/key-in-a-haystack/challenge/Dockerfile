FROM ubuntu:22.04 as chroot
RUN apt update && apt install -y socat python3 python3-pip openssl
RUN pip3 install pycryptodome

FROM gcr.io/kctf-docker/challenge@sha256:eb0f8c3b97460335f9820732a42702c2fa368f7d121a671c618b45bbeeadab28

COPY --from=chroot / /chroot

RUN mkdir /chroot/home/user
COPY ./runner.py /chroot/home/user
COPY ./primes.txt /chroot/home/user
COPY ./secret.py /chroot/home/user

COPY nsjail.cfg /home/user/

CMD kctf_setup && \
    kctf_drop_privs \
    socat \
        TCP-LISTEN:1337,reuseaddr,fork \
        EXEC:"kctf_pow nsjail --config /home/user/nsjail.cfg -- /usr/bin/python3 /home/user/runner.py"
