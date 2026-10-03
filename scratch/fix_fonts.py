import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("url('/fonts/Nevera-Regular.otf')", "url('${import.meta.env.BASE_URL}fonts/Nevera-Regular.otf')")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed fonts")
