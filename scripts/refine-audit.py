from pathlib import Path
p=Path('src/app/globals.css')
s=p.read_text(encoding='utf-8-sig')
replacements={
'width:min(1160px,calc(100% - 48px))':'width:min(1200px,calc(100% - 48px))',
'gap:27px;font-size:12px;font-weight:550':'gap:27px;font-size:14px;font-weight:500',
'padding:10px 0;font-size:12px':'padding:10px 0;font-size:14px',
'padding-top:158px':'padding-top:132px',
'font-size:clamp(48px,5.55vw,80px);line-height:1.12;margin:37px -30px 0;letter-spacing:-.064em;font-weight:500':'font-size:79px;line-height:1.2;margin:36px auto 0;max-width:1040px;letter-spacing:-.035em;font-weight:400',
'margin:28px auto 0;font-size:17px;line-height:1.75;max-width:650px':'margin:32px auto 0;font-size:20px;line-height:1.5;max-width:720px',
'font-size:clamp(34px,4vw,56px);line-height:1.15':'font-size:48px;line-height:1.2',
'.section-heading>p{font-size:16px':'.section-heading>p{font-size:18px',
'.agency{padding-top:74px;padding-bottom:140px}':'.agency{padding-top:64px;padding-bottom:64px}',
'gap:48px;margin-top:45px':'gap:48px;margin-top:28px',
'gap:11px;color:#c7c9be;font-size:12px':'gap:11px;color:#c7c9be;font-size:13px',
'.method{padding-bottom:100px}':'.method{width:min(1240px,calc(100% - 96px));padding-bottom:0}',
'gap:60px;margin-top:80px;align-items:start':'gap:60px;margin-top:0;align-items:start',
'min-height:565px':'min-height:85svh',
'padding:70px 38px 70px 0':'padding:80px 30px 80px 0',
'.method-step>p{font-size:15px':'.method-step>p{font-size:18px',
'color:#b1b4a8;max-width:420px':'color:#b1b4a8;max-width:520px',
'gap:12px;font-size:12px;margin:14px 0':'gap:12px;font-size:16px;line-height:1.6;margin:20px 0',
'margin-top:22px;font-size:11px;color:#959b88':'margin-top:24px;font-size:13px;color:#a7ad9a',
'.workflow-sticky{position:sticky;top:140px;height:650px}':'.workflow-sticky{position:sticky;top:0;height:100svh}',
'min-height:365px':'min-height:398px',
'.card-4{grid-column:span 3;min-height:270px}':'.card-4{grid-column:span 3;min-height:398px}',
'.solution-card h3{font-size:28px':'.solution-card h3{font-size:32px',
'.card-bottom p{font-size:11px':'.card-bottom p{font-size:13px',
'.final-cta h2{font-size:70px':'.final-cta h2{font-size:52px',
'.footer-top>div:not(:first-child) a{font-size:12px':'.footer-top>div:not(:first-child) a{font-size:14px',
'.hero h1{font-size:60px;margin-inline:-15px}':'.hero h1{font-size:48px;margin-inline:auto}',
'.hero-copy>p{font-size:15px;max-width:570px}':'.hero-copy>p{font-size:18px;max-width:650px}',
'.method-steps{display:grid;grid-template-columns:1fr 1fr;gap:15px 35px}':'.method-steps{display:grid;grid-template-columns:1fr;gap:0}',
'.method-step>p{font-size:13px}':'.method-step>p{font-size:17px}',
'.method-step li{font-size:10px}':'.method-step li{font-size:15px}',
'.hero{min-height:925px}':'.hero{min-height:1080px}',
'.hero-copy{padding-top:145px}':'.hero-copy{padding-top:170px}',
'.hero h1{font-size:42px;line-height:1.15;letter-spacing:-.065em;':'.hero h1{font-size:40px;line-height:1.2;letter-spacing:-.04em;',
'.hero-copy>p{margin-top:23px;font-size:13px;line-height:1.8;max-width:325px}':'.hero-copy>p{margin-top:28px;font-size:17px;line-height:1.6;max-width:335px}',
'.section-heading>p{font-size:13px;margin-top:21px}':'.section-heading>p{font-size:16px;margin-top:21px}',
'.method-step>p{max-width:none;font-size:13px}':'.method-step>p{max-width:none;font-size:17px}',
'.method-step li{font-size:11px;margin:12px 0;gap:9px}':'.method-step li{font-size:14px;margin:16px 0;gap:12px}',
'.method-step h3{font-size:37px;margin:18px 0}':'.method-step h3{font-size:34px;margin:18px 0}',
'.card-bottom p{font-size:11px;max-width:230px}':'.card-bottom p{font-size:13px;max-width:230px}',
'.before-after p{font-size:12px}':'.before-after p{font-size:15px}',
'.commitment-grid p{margin-top:12px;font-size:12px;max-width:340px}':'.commitment-grid p{margin-top:12px;font-size:15px;max-width:340px}',
'.faq-list summary{font-size:12px;padding-block:23px}':'.faq-list summary{font-size:15px;padding-block:23px}',
'.faq-list p{font-size:12px;padding-right:10px}':'.faq-list p{font-size:15px;padding-right:10px}',
'.final-cta p{font-size:12px;max-width:315px':'.final-cta p{font-size:15px;max-width:315px',
'.footer-top>div:not(:first-child) a{font-size:11px':'.footer-top>div:not(:first-child) a{font-size:13px',
}
for old,new in replacements.items():
 if old not in s: print('Motif absent:',old)
 s=s.replace(old,new,1)
# Toutes les teintes qui représentent exactement la marque dérivent du token.
import re
s=re.sub(r'#fdd33c([0-9a-fA-F]{2})(?![0-9a-fA-F])',lambda m:f'rgb(var(--brand-accent-rgb) / {int(m[1],16)/255:.3f})',s,flags=re.I)
s=s.replace('background:#fdd33c;','background:var(--brand-accent);')
s+='''
/* Audit 02 — diagramme séquentiel, avec une version statique sans animation. */
.method-step:last-child{min-height:140svh;justify-content:flex-start;padding-top:140px}
.workflow-visual{display:block;padding:0;border:0;border-radius:24px;overflow:hidden;background:none;mask-image:linear-gradient(transparent,#000 15%,#000 84%,transparent)}
.workflow-caption{top:120px;font-size:9px}
.workflow-track{position:relative;padding:160px 28px;display:flex;flex-direction:column;gap:190px}
.workflow-node{transform:none;opacity:1;transition:opacity .65s var(--ease),transform .65s var(--ease),visibility .65s}
.workflow-visual[data-animated=true] .workflow-node[data-active=false]{opacity:0;visibility:hidden;transform:translateY(26px) scale(.97)}
.workflow-visual[data-animated=true] .workflow-track{will-change:transform}
.workflow-line{top:230px;bottom:250px}
.source-pills>span{font-size:11px;padding:12px}
.source-branches{display:flex;width:70%;height:40px;margin:-22px auto 0}
.source-branches span{width:33.33%;height:28px;border:solid #adb69440;border-width:0 0 1px 1px;border-radius:0 0 0 12px}
.source-branches span:last-child{border-width:0 1px 1px 0;border-radius:0 0 12px}
.flow-ticket{padding:22px 20px;background:linear-gradient(120deg,#1b1d16,#0c0e0a)}
.flow-ticket small{font-size:9px}.flow-ticket strong{font-size:16px}.flow-icon svg{width:22px;height:22px}
.flow-context{margin-top:16px;text-align:center;font-size:12px;color:#b5bba7}
.flow-blueprint{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:20px;padding:25px 10px;border:1px solid var(--line);border-radius:12px;background:#10120e;font-size:11px;color:#ced4c1}
.flow-blueprint svg{width:14px;color:var(--brand-accent)}.mini-fields{margin-top:12px;gap:8px}.mini-fields>span{font-size:9px;padding:8px}
.connection-stack{display:grid;gap:12px;margin:20px 25px 0}.connection-stack>div{display:flex;align-items:center;gap:16px;padding:17px 20px;background:#12140f;border:1px solid var(--line);border-radius:12px;font-size:13px}.connection-stack small{display:block;color:#a9b19b;font-size:11px;margin-top:4px}.connection-stack svg{width:18px;color:var(--brand-accent)}.connection-stack>div>svg:last-child{margin-left:auto}
.flow-followup{display:grid;gap:15px;margin:20px 0;padding:24px;background:#11140e;border:1px solid var(--line);border-radius:12px}.flow-followup span{display:flex;align-items:center;gap:12px;font-size:14px}.flow-followup svg{width:16px;color:var(--brand-accent)}.flow-result{font-size:12px;max-width:none;padding:15px}
.solutions-section>.container{max-width:1120px}.card-4 .strategy-art{top:45%}
.solution-dialog{width:min(1120px,calc(100% - 48px));max-height:90dvh;background:var(--paper);color:var(--ink);border-color:#dfe1d8;box-shadow:0 25px 90px #0006}
.solution-dialog::backdrop{background:#0007;backdrop-filter:blur(5px)}
.dialog-inner{padding:72px 56px 56px;display:grid;grid-template-columns:1.2fr .8fr;gap:48px}
.dialog-inner .eyebrow{color:#715b0c}.dialog-inner h2{font-size:40px;letter-spacing:-.04em}.dialog-inner p{font-size:18px;color:#4c5442;line-height:1.7}.dialog-inner .scope-note{border:0;padding:0;font-size:15px;color:#4c5442}
.dialog-aside{align-self:start;padding:32px;border:1px solid #dfe1d8;border-radius:20px;background:linear-gradient(145deg,#fff,#f4f0de)}.dialog-aside>svg{color:#796018;width:36px;height:36px;margin-bottom:28px}.dialog-aside h3{font-size:25px;line-height:1.25}.solution-dialog :focus-visible{outline-color:#6c5400}
@media(min-width:900px){.method-journey{grid-template-columns:.46fr .54fr}.method-step{scroll-margin-top:0}}
@media(max-width:899px){.method{width:calc(100% - 64px)}.method-step,.method-step:last-child{min-height:0;padding:48px 0;max-width:650px}.method-step>p{max-width:none}.method-journey{margin-top:0}.dialog-inner{grid-template-columns:1fr;padding:65px 36px 36px;gap:32px}.dialog-aside{padding:24px}.dialog-aside>svg{margin-bottom:18px}.dialog-inner h2{font-size:34px}.solution-dialog{max-height:88dvh}}
@media(max-width:599px){.method{width:calc(100% - 40px)}.hero-bottom{bottom:60px}.hero-bottom>span{font-size:9px}.hero-bottom>p{font-size:12px}.hero-label{font-size:8px}.hero h1{margin-inline:auto}.agency .section-heading>p{font-size:16px}.step-label{font-size:10px}.step-label>span{font-size:8px}.step-outcome{font-size:12px}.solution-card h3{font-size:28px}.solution-card,.card-4{min-height:350px}.dialog-inner{padding:68px 24px 28px;gap:24px}.dialog-inner h2{font-size:30px}.dialog-inner p{font-size:16px}.dialog-inner .scope-note{font-size:14px}.dialog-aside h3{font-size:23px}.dialog-aside{padding:22px}.solution-dialog{width:calc(100% - 24px)}.contact-notes{font-size:15px}.form-field label{font-size:14px}.form-field small{font-size:12px}.form-field input,.form-field select,.form-field textarea{font-size:16px}.form-note{font-size:12px}.legal-content p,.legal-content li{font-size:15px}}
@media(prefers-reduced-motion:reduce){.workflow-visual{mask-image:none}.workflow-track{padding:90px 20px 20px;gap:25px;transform:none!important}.workflow-node{visibility:visible!important;opacity:1!important;transform:none!important}.workflow-sticky{height:auto;position:static}.workflow-line{display:none}.workflow-caption{top:30px}.method-step,.method-step:last-child{min-height:0;padding-block:60px}.workflow-track{will-change:auto}}
'''
p.write_text(s,encoding='utf-8')
p=Path('src/app/page.tsx');s=p.read_text(encoding='utf-8-sig')
s=re.sub(r'<div className="method-heading" data-reveal>.*?</div><div className="method-journey">','<h2 className="sr-only">Notre méthode : de votre réalité à votre solution.</h2><div className="method-journey">',s)
p.write_text(s,encoding='utf-8')
p=Path('src/components/solutions.tsx');s=p.read_text(encoding='utf-8-sig')
s=s.replace('<span className="eyebrow">UNE POSSIBILITÉ À EXPLORER</span>','<div className="dialog-copy"><span className="eyebrow">UNE POSSIBILITÉ À EXPLORER</span>')
s=s.replace('<p className="scope-note">{solutions[selected].scope}</p>','')
s=s.replace('Préparer mon projet <ArrowUpRight size={18}/></Link></div>','Préparer mon projet <ArrowUpRight size={18}/></Link></div><aside className="dialog-aside"><Compass/><h3>Le cadre de votre projet.</h3><p className="scope-note">{solutions[selected].scope}</p><p className="scope-note">Le périmètre et la faisabilité sont à confirmer ensemble.</p></aside></div>')
p.write_text(s,encoding='utf-8')
