#!/usr/bin/python3
import cgi
import json
import os

choices_pory = ['Zima', 'Wiosna', 'Lato', 'Jesien']
dir_path = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.dirname(dir_path)
file_path = os.path.join(parent_dir, 'zad07', 'choices.json')

try:
    with open(file_path, 'r') as f:
        pory_count = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    pory_count = {choice: 0 for choice in choices_pory}

form = cgi.FieldStorage()
choice = form.getvalue("pora")

if choice in pory_count:
    pory_count[choice] += 1

with open(file_path, 'w') as f:
    json.dump(pory_count, f)

data = [{'pora': choice, 'count': count} for choice, count in pory_count.items()]

print("Content-Type: application/json")
print()
print(json.dumps({'pora_roku': data}))