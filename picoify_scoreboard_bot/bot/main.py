#!/usr/bin/env python3

import datetime
import enum
import json
import os
import time

import requests
import subprocess
import os

WEBHOOK = os.environ['WEBHOOK']
MESSAGE_ID = os.environ['MESSAGE_ID']

def get_solves():
    # os.environ already has PGPASSWORD set
    postgres_cmd = "select users.name, solves.metadata, solves.createdat from users join solves on users.id = userid where solves.challengeid='picoify' order by solves.metadata desc limit 20;"
    res = subprocess.check_output([
        'psql',
        '--host=10.43.123.3',
        '--username=rctf',
        '--no-password',
        '--dbname=rctf',
        '-c', postgres_cmd
    ])

    res_data = res.decode().split('\n')
    res_data[0] = res_data[0].replace('name', 'Team')
    res_data[0] = res_data[0].replace('metadata', ' Score  ')
    res_data[0] = res_data[0].replace('createdat', '  Time   ')
    res = '\n'.join(res_data)

    message = {
        'content': ''
    }
    raw_content = ''
    raw_content += f'Showing top 20 solves for picoify\n'
    raw_content += f'Last updated: {datetime.datetime.now()}\n'
    raw_content += '```\n'
    raw_content += res
    raw_content += '```\n'
    message['content'] = raw_content

    r = requests.patch(f'{WEBHOOK}/messages/{MESSAGE_ID}', json=message)
    print(r.status_code, r.content)


def main_loop():
    get_solves()


def main():
    print('running...')
    r = requests.patch(f'{WEBHOOK}/messages/{MESSAGE_ID}',
                       json={'content': f'bot starting... @ {datetime.datetime.now()}'})
    print(r.status_code, r.content)

    while True:
        main_loop()
        time.sleep(10)

main()
