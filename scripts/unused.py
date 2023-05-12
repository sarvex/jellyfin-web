import os
import subprocess
import json

# load all keys in the source language
# check entire codebase for usages
# print unused keys to a text file
# TODO: dynamic string usages cause false positives

cwd = os.getcwd()
langdir = f'{cwd}/../src/strings'
langlst = ['en-us.json']
# unused keys
dep = []

def grep(key):
    command = 'grep -r -E "(\\\"|\'|\{)%s(\\\"|\'|\})" --include=\*.{js,html} --exclude-dir=../src/strings ../src' % key
    p = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if output := p.stdout.readlines():
        print(f'DONE: {key}')
        return True
    print(f'UNUSED: {key}')
    dep.append(key)
    return False

for lang in langlst:
    with open(f'{langdir}/{lang}') as f:
        langjson = json.load(f)
        for key in langjson:
            grep(key)

print(dep)
print(f'LENGTH: {len(dep)}')
with open('unused.txt', 'w') as out:
    for item in dep:
        out.write(item + '\n')
    out.close()
