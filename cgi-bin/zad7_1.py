#!/usr/bin/python3
import os
import json

dir_path = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.dirname(dir_path)
file_path = os.path.join(parent_dir, 'zad07', 'choices.json')

with open(file_path, 'w') as f:
    json.dump({choice: 0 for choice in ['Zima', 'Wiosna', 'Lato', 'Jesien']}, f)

print("Content-Type: application/json")
print()