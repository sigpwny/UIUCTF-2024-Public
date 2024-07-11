FROM rust:1.79-alpine

WORKDIR /tmp
COPY Cargo.toml Cargo.lock ./
COPY src ./src
RUN cargo build

RUN apk add socat build-base
WORKDIR /home/user
COPY flag /
RUN cp /tmp/target/debug/pwnyexec .

CMD socat TCP-LISTEN:1337,reuseaddr,fork EXEC:"./pwnyexec"
