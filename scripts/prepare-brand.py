from pathlib import Path
from zipfile import ZipFile
from PIL import Image
import shutil,json
base=Path('public'); base.mkdir(exist_ok=True)
(base/'brand').mkdir(exist_ok=True)
shutil.copy2('logo/logo-StratonLab.png',base/'brand/logo-StratonLab.png')
shutil.copy2('logo/logo-favicon.svg',base/'brand/symbol.svg')
with ZipFile('logo/favicon.zip') as z:
    for item in z.infolist():
        target=(base/item.filename).resolve()
        if not target.is_relative_to(base.resolve()) or item.file_size>2_000_000 or item.is_dir():
            raise ValueError('Entrée ZIP inattendue')
        if item.filename not in ['apple-touch-icon.png','favicon-32x32.png','favicon-16x16.png','favicon.ico','site.webmanifest','android-chrome-192x192.png','android-chrome-512x512.png']:
            raise ValueError('Fichier inattendu')
        target.write_bytes(z.read(item))
manifest=json.loads((base/'site.webmanifest').read_text())
manifest.update(name='StratonLab',short_name='StratonLab',theme_color='#FDD33C',background_color='#f8f8f4',lang='fr',start_url='/',display='browser')
(base/'site.webmanifest').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Logo copié sans transformation, 7 entrées du ZIP contrôlées et intégrées.')
