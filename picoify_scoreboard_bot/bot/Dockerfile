FROM --platform=linux/amd64 python:3.11-alpine

RUN apk add postgresql-client

RUN pip install requests pyyaml

WORKDIR /home/user
COPY main.py .

CMD cd /home/user && python3 -u main.py
