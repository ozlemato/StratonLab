from pathlib import Path
files=['src/components/header.tsx','src/components/footer.tsx','src/app/not-found.tsx','src/app/page.tsx','src/components/solutions.tsx','src/components/use-cases.tsx']
for name in files:
    p=Path(name);s=p.read_text(encoding='utf-8');s=s.replace('<a ','<Link ').replace('</a>','</Link>')
    if s.startswith("'use client';"):
        s=s.replace("'use client';","'use client';\nimport Link from 'next/link';",1)
    else:s="import Link from 'next/link';\n"+s
    p.write_text(s,encoding='utf-8')
p=Path('src/components/header.tsx');s=p.read_text(encoding='utf-8').replace('<nav aria-label=','<nav id="primary-navigation" aria-label=').replace('aria-controls="mobile-navigation"','aria-controls="primary-navigation"');s=s.replace('    <div id="mobile-navigation" className="sr-only" aria-hidden="true">Navigation mobile</div>\n','');p.write_text(s,encoding='utf-8')
p=Path('postcss.config.mjs');p.write_text("const config = { plugins: { '@tailwindcss/postcss': {} } };\nexport default config;\n",encoding='utf-8')
