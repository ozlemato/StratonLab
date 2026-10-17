import test from 'node:test';
import assert from 'node:assert/strict';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:3000';
for(const path of ['/','/contact','/confidentialite','/mentions-legales'])test(`Page française et protégée : ${path}`,async()=>{
 const response=await fetch(base+path);assert.equal(response.status,200);const html=await response.text();
 assert.match(html,/<html[^>]+lang="fr"/);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 assert.ok(!html.includes('href="#"'));assert.equal(response.headers.get('x-content-type-options'),'nosniff');
 assert.equal(response.headers.get('x-frame-options'),'DENY');assert.equal(response.headers.get('set-cookie'),null);
 const csp=response.headers.get('content-security-policy');assert.match(csp,/frame-ancestors 'none'/);assert.match(csp,/object-src 'none'/);assert.ok(!csp.includes("'unsafe-eval'"));
 const nonce=csp.match(/'nonce-([^']+)'/)[1];assert.ok(html.includes(`nonce="${nonce}"`));
});
test('Nonces distincts à chaque requête',async()=>{const a=await fetch(base);const b=await fetch(base);assert.notEqual(a.headers.get('content-security-policy'),b.headers.get('content-security-policy'));});
test('Ancres et ressources de la homepage valides',async()=>{const html=await(await fetch(base)).text();const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));for(const [,id] of html.matchAll(/href="\/?#([^"]+)"/g))assert.ok(ids.has(id),`Ancre ${id} introuvable`);const assets=new Set([...html.matchAll(/(?:src|href)="((?:\/_next\/|\/brand\/|\/favicon|\/apple-touch-icon)[^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')));for(const asset of assets)assert.equal((await fetch(base+asset)).status,200,asset);});
test('Marque, favicon et partage disponibles',async()=>{for(const p of ['/favicon.ico','/site.webmanifest','/brand/logo-StratonLab.png','/brand/symbol.svg','/opengraph-image'])assert.equal((await fetch(base+p)).status,200,p);const manifest=await(await fetch(base+'/site.webmanifest')).json();assert.equal(manifest.name,'StratonLab');assert.equal(manifest.theme_color,'#FDD33C');});
test('Fichiers internes non publiés, erreurs françaises',async()=>{for(const p of ['/brief.md','/.env','/.git/config','/page-inexistante']){const r=await fetch(base+p);assert.equal(r.status,404,p);assert.match(await r.text(),/Cette page a pris/);}});
test('Aperçu non indexable',async()=>{assert.match(await(await fetch(base+'/robots.txt')).text(),/Disallow: \//);assert.match(await(await fetch(base)).text(),/noindex/);});
