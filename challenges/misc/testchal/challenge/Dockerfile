FROM ubuntu:22.04 AS build

RUN apt-get update && apt-get install -y socat build-essential

WORKDIR /tmp
COPY chal.c .
RUN gcc -static -O2 -pipe -o chal chal.c

FROM alpine

RUN apk add socat
WORKDIR /home/user
COPY flag.txt /
COPY --from=build /tmp/chal .

CMD socat TCP-LISTEN:1337,reuseaddr,fork EXEC:"./chal"
