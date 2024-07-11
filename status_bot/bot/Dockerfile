FROM --platform=linux/amd64 python:3.11-alpine

RUN pip install requests pyyaml

WORKDIR /home/user
COPY kube.py .
COPY main.py .

CMD cd /home/user && python3 -u main.py
