'use client';
import Link from 'next/link';
import {useRef,useState} from 'react';
import {ArrowDown,ArrowUpRight,Check,Inbox,UserCheck} from 'lucide-react';
import {useCases} from '@/lib/content';
export function UseCases(){
 const [active,setActive]=useState(0);const buttons=useRef<(HTMLButtonElement|null)[]>([]);const c=useCases[active];
 return <div className="use-cases"><div className="case-tabs" role="tablist" aria-label="Explorer les cas d’usage">{useCases.map((item,i)=><button key={item.id} ref={el=>{buttons.current[i]=el;}} role="tab" id={'tab-'+item.id} aria-selected={i===active} aria-controls="case-panel" tabIndex={i===active?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%3;else if(e.key==='ArrowLeft')next=(i+2)%3;else if(e.key==='Home')next=0;else if(e.key==='End')next=2;else return;e.preventDefault();setActive(next);buttons.current[next]?.focus();}}>{item.label}</button>)}</div>
 <div id="case-panel" role="tabpanel" aria-labelledby={'tab-'+c.id} className="case-panel" tabIndex={0}><div className="case-copy" key={c.id}><span className="eyebrow">SCÉNARIO ILLUSTRATIF / 0{active+1}</span><h3>{c.title}</h3><div className="before-after"><p><span>AUJOURD’HUI</span>{c.before}</p><p><span>À ENVISAGER</span>{c.after}</p></div><p className="case-benefit">{c.benefit}</p><Link href="/contact" className="text-link">Étudier un cas similaire <ArrowUpRight size={18}/></Link></div>
 <div className="case-demo" aria-label="Exemple de parcours"><span className="demo-caption">EXEMPLE DE FONCTIONNEMENT</span><div className="demo-input"><Inbox size={19}/>{c.input}</div><ArrowDown className="demo-arrow" size={20}/><div className="demo-process"><span className="demo-brand"><LayersSymbol/>Traitement assisté par l’IA</span>{c.fields.map(f=><span key={f}><Check size={16}/>{f}</span>)}</div><ArrowDown className="demo-arrow" size={20}/><div className="demo-output"><UserCheck size={20}/>{c.output}</div><small>Illustration de principe, sans traitement de données réelles.</small></div></div>
 </div>
}
function LayersSymbol(){return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m3 7 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 17l9 5 9-5"/></svg>}
