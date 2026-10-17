'use client';
import {useState} from 'react';
import {Download,ArrowUpRight} from 'lucide-react';
export function ContactForm({email}:{email?:string}){
 const [status,setStatus]=useState('');const [draft,setDraft]=useState('');
 function prepare(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();const form=e.currentTarget;const data=new FormData(form);
  const company=String(data.get('company')||'').trim();const objective=String(data.get('objective')||'').trim();const context=String(data.get('context')||'').trim();
  if(context.length<20){setStatus('Décrivez votre besoin en au moins 20 caractères pour préparer un brief utile.');form.querySelector<HTMLTextAreaElement>('textarea')?.focus();return;}
  const text=`MON PROJET IA — STRATONLAB\n\nEntreprise : ${company||'À préciser'}\nObjectif : ${objective}\n\nMon contexte\n${context}\n\nÀ clarifier ensemble\n- Les utilisateurs concernés\n- Les outils et données disponibles\n- Les critères de réussite\n- Le budget et le calendrier\n\nDocument préparatoire créé localement. Aucune donnée n’a été envoyée à StratonLab.\n`;
  setDraft(text);const blob=new Blob([text],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='mon-projet-stratonlab.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
  setStatus('Votre brief a été préparé. Le téléchargement a été demandé à votre navigateur. Aucune information n’a été envoyée à StratonLab.');
 }
 return <form className="contact-form" onSubmit={prepare}>
  <div className="form-field"><label htmlFor="company">Votre entreprise <span>(facultatif)</span></label><input id="company" name="company" autoComplete="organization" maxLength={120} placeholder="Nom de votre entreprise"/></div>
  <div className="form-field"><label htmlFor="objective">Votre priorité</label><select id="objective" name="objective" defaultValue="Automatiser un processus"><option>Automatiser un processus</option><option>Faciliter l’accès à l’information</option><option>Améliorer la relation client</option><option>Créer un outil métier</option><option>Identifier un premier projet IA</option></select></div>
  <div className="form-field"><label htmlFor="context">Quel besoin souhaitez-vous explorer ?</label><textarea id="context" name="context" required minLength={20} maxLength={2000} aria-describedby="context-help form-status" placeholder="Aujourd’hui, notre équipe consacre du temps à… Nous aimerions pouvoir…"/><small id="context-help">De 20 à 2 000 caractères. N’incluez pas de données sensibles ou confidentielles.</small></div>
  <div className="form-actions"><button className="button" type="submit">Télécharger mon brief <Download size={17}/></button>{email&&draft&&<a className="button button-ghost" href={`mailto:${email}?subject=${encodeURIComponent('Mon projet IA — StratonLab')}&body=${encodeURIComponent(draft)}`}>Préparer un e-mail <ArrowUpRight size={17}/></a>}</div>
  <p className="form-note">Le brief est créé sur votre appareil. Ce formulaire ne transmet et ne conserve aucune donnée sur un serveur.</p>
  <p className="form-status" id="form-status" role="status">{status}</p>
 </form>
}
