from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
out=root/'dist'
if out.exists():shutil.rmtree(out)
shutil.copytree(root/'public',out)
print('Static portfolio built in dist/')
