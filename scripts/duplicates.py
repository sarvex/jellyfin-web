import sys
import os
import json

# load every string in the source language
# print all duplicate values to a file

cwd = os.getcwd()
source = f'{cwd}/../src/strings/en-us.json'

reverse = {}
with open(source) as en:
    strings = json.load(en)
    for key, value in strings.items():
        if value not in reverse:
            reverse[value] = [key]
        else:
            reverse[value].append(key)

duplicates = {key: value for key, value in reverse.items() if len(value) > 1}
print(f'LENGTH: {len(duplicates)}')
with open('duplicates.txt', 'w') as out:
    for item, value_ in duplicates.items():
        out.write(f'{json.dumps(item)}: ')
        out.write(json.dumps(value_) + '\n')
    out.close()

print('DONE')
