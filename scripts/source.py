import sys
import os
import json

# load every key in the source language
# check the keys in all translations
# remove keys that only exist in translations

cwd = os.getcwd()
langdir = f'{cwd}/../src/strings'
langlst = os.listdir(langdir)

langlst.remove('en-us.json')
print(langlst)
input('press enter to continue')

keysus = []
missing = []

with open(f'{langdir}/en-us.json') as en:
    langus = json.load(en)
    keysus.extend(iter(langus))
for lang in langlst:
    with open(f'{langdir}/{lang}', 'r') as f:
        inde = 2
        if '\n    \"' in f.read():
            inde = 4
        f.close()
    with open(f'{langdir}/{lang}', 'r+') as f:
        langjson = json.load(f)
        langjnew = {}
        for key in langjson:
            if key in keysus:
                langjnew[key] = langjson[key]
            elif key not in missing:
                missing.append(key)
        f.seek(0)
        f.write(json.dumps(langjnew, indent=inde, sort_keys=False, ensure_ascii=False))
        f.write('\n')
        f.truncate()
        f.close()

print(missing)
print(f'LENGTH: {len(missing)}')
with open('missing.txt', 'w') as out:
    for item in missing:
        out.write(item + '\n')
    out.close()

print('DONE')
