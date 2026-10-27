'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useRef,useState} from 'react';
import {ArrowUpRight,Plus,X,Compass} from 'lucide-react';
import {solutions} from '@/lib/content';
const illustrations = [
 '/solutions/01-adoption-ia.png',
 '/solutions/application-sur-mesure.png',
 '/solutions/conversation.png',
 '/solutions/base-de-connaissances.png',
 '/solutions/outils-connectes.png',
] as const;
export function Solutions(){
 const dialog=useRef<HTMLDialogElement>(null);const lastButton=useRef<HTMLButtonElement|null>(null);
 const [selected,setSelected]=useState(0);const [resetCard,setResetCard]=useState<number|null>(null);
 function open(i:number,button:HTMLButtonElement){setResetCard(null);setSelected(i);lastButton.current=button;dialog.current?.showModal();}
 function close(){dialog.current?.close();}
 return <><div className="solutions-grid">{solutions.map((s,i)=><article className={'solution-card card-'+i+(resetCard===i?' is-reset':'')} key={s.id} id={s.id} data-reveal onPointerMove={e=>{if(resetCard===i&&Math.abs(e.movementX)+Math.abs(e.movementY)>2)setResetCard(null);}}>
  {i < illustrations.length && <div className="solution-media" aria-hidden="true"><Image className="solution-illustration" src={illustrations[i]} alt="" fill unoptimized/></div>}
  <h3>{s.title}</h3><div className="card-bottom"><div className="card-copy"><p>{s.text}</p>{'source' in s && s.source && <a className="card-source" href={s.source} target="_blank" rel="noopener noreferrer">{s.sourceLabel}</a>}</div><span className="expand-card" aria-hidden="true"><Plus size={22}/></span></div><button type="button" className="card-hit-area" onClick={e=>open(i,e.currentTarget)} aria-label={'Découvrir : '+s.name}/>
 </article>)}</div>
 <dialog ref={dialog} className="solution-dialog" aria-labelledby="dialog-title" onClose={()=>{setResetCard(selected);lastButton.current?.focus();}} onClick={e=>{if(e.target===dialog.current)close();}}>
  <div className="dialog-inner"><button className="icon-button dialog-close" onClick={close} aria-label="Fermer le détail"><X/></button><div className="dialog-copy"><span className="eyebrow">UNE POSSIBILITÉ À EXPLORER</span><h2 id="dialog-title">{solutions[selected].name}</h2><p>{solutions[selected].detail}</p><Link href="/contact" className="button" onClick={close}>Préparer mon projet <ArrowUpRight size={18}/></Link></div><aside className="dialog-aside"><Compass/><h3>Le cadre de votre projet.</h3><p className="scope-note">{solutions[selected].scope}</p><p className="scope-note">Le périmètre et la faisabilité sont à confirmer ensemble.</p></aside></div>
 </dialog></>;
}
