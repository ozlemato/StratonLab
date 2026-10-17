from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
for folder,name in [('screenshots','reference-desktop'),('screenshots mobile','reference-mobile')]:
    paths=sorted(Path('Référence',folder).glob('*.png'),key=lambda p:int(p.name.split('.')[0]))
    w=520 if folder=='screenshots' else 260
    thumbs=[]
    for p in paths:
        im=Image.open(p).convert('RGB'); im.thumbnail((w,370))
        c=Image.new('RGB',(w,410),'#dddddd');c.paste(im,((w-im.width)//2,25));ImageDraw.Draw(c).text((10,5),p.name,fill='black');thumbs.append(c)
    cols=3 if folder=='screenshots' else 5
    sheet=Image.new('RGB',(w*cols,410*((len(thumbs)+cols-1)//cols)),'white')
    for i,t in enumerate(thumbs):sheet.paste(t,((i%cols)*w,(i//cols)*410))
    sheet.save(Path('docs/visual-audit',name+'.jpg'))
