from pathlib import Path
from PIL import Image, ImageOps, ImageFilter, ImageDraw
p=Path('docs/visual-audit/phase-02')
labels=['Gladia.io - reference','StratonLab - avant','StratonLab - apres']
files=['reference-1440-hero.png','before-1440-hero.png','after-1440-hero.png']
board=Image.new('RGB',(1440,340),'#eeeeea'); d=ImageDraw.Draw(board)
for i,(f,label) in enumerate(zip(files,labels)):
 im=Image.open(p/f).convert('RGB'); im.thumbnail((480,300)); board.paste(im,(480*i,35)); d.text((480*i+12,12),label,fill='black')
board.save(p/'hero-comparison.png')
r=ImageOps.grayscale(Image.open(p/files[0])).filter(ImageFilter.FIND_EDGES)
a=ImageOps.grayscale(Image.open(p/files[2])).resize(r.size).filter(ImageFilter.FIND_EDGES)
Image.merge('RGB',(r,a,a)).save(p/'hero-edge-overlay.png')
board=Image.new('RGB',(1500,448),'#eeeeea'); d=ImageDraw.Draw(board)
for row,prefix in enumerate(['reference','after']):
 for col,state in enumerate(['000','025','050','075','100']):
  im=Image.open(p/f'{prefix}-motion-{state}.png').convert('RGB'); im.thumbnail((300,188)); board.paste(im,(col*300,row*224+30)); d.text((col*300+8,row*224+8),f'{prefix} - sticky {int(state)}%',fill='black')
board.save(p/'motion-comparison.png')
print('Three comparison boards generated; no similarity score.')
