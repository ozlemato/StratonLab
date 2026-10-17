/* eslint-disable @next/next/no-html-link-for-pages -- Les ancres natives évitent le cumul de fragments observé avec le routeur ; les routes utilisent Link. */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, ChevronDown, TrendingUp, Target, Database, ShieldCheck, Cable } from 'lucide-react';
import { solutions } from '@/lib/content';
const icons=[TrendingUp,Target,Database,ShieldCheck,Cable];
export function Header(){
  const [menu,setMenu]=useState(false);
  const [expanded,setExpanded]=useState(false);
  const root=useRef<HTMLElement>(null);
  const closeTimer=useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose=()=>{if(closeTimer.current)clearTimeout(closeTimer.current);};
  const menuButton=useRef<HTMLButtonElement>(null);
  const solutionButton=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    function outside(e:PointerEvent){if(!root.current?.contains(e.target as Node)){setMenu(false);setExpanded(false);}}
    document.addEventListener('pointerdown',outside);
    return ()=>{document.removeEventListener('pointerdown',outside);if(closeTimer.current)clearTimeout(closeTimer.current);};
  },[]);
  const close=()=>{cancelClose();setMenu(false);setExpanded(false);};
  return <header ref={root} className="site-header" onPointerEnter={cancelClose} onPointerLeave={()=>{if(matchMedia("(min-width:900px) and (hover:hover)").matches)closeTimer.current=setTimeout(()=>setExpanded(false),140);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))close();}} onKeyDown={e=>{if(e.key==='Escape'){if(expanded){setExpanded(false);solutionButton.current?.focus();}else{setMenu(false);menuButton.current?.focus();}}}}>
    <div className="nav-bar">
      <Link className="brand" href="/" aria-label="StratonLab, accueil"><Image src="/brand/Logo-StratonLab-white.png" alt="StratonLab" width={1042} height={262} priority sizes="180px" /></Link>
      <nav id="primary-navigation" aria-label="Navigation principale" className={menu?'primary-nav is-open':'primary-nav'}>
        <button ref={solutionButton} className="nav-link solution-toggle" aria-expanded={expanded} aria-controls="solutions-menu" onClick={()=>{cancelClose();setExpanded(!expanded);}}><span className="nav-label">Solutions</span><ChevronDown className="nav-chevron" size={14}/></button>
    <div id="solutions-menu" className="mega-menu" data-open={expanded} inert={!expanded} aria-hidden={!expanded}>
      <div className="mega-intro"><span className="eyebrow">À VOTRE MESURE</span><h2>Un besoin métier.<br/>Une solution utile.</h2><a href="/#solutions" onClick={close}>Explorer les possibilités <ArrowUpRight size={17}/></a></div>
      <div className="mega-links">{solutions.map((s,i)=>{const Icon=icons[i];return <a key={s.id} href={'/#'+s.id} onClick={close}><Icon size={20}/><span>{s.name}<small>{s.text}</small></span><ArrowUpRight size={16}/></a>;})}</div>
    </div>
        <a href="/#methode" onClick={close}>Notre méthode</a>
        <a href="/#cas-usage" onClick={close}>Cas d’usage</a>
        <a href="/#agence" onClick={close}>L’agence</a>
        <Link href="/contact" className="mobile-contact" onClick={close}>Parlons de votre projet</Link>
      </nav>
      <Link href="/contact" className="button button-small nav-cta">Parlons de votre projet</Link>
      <button ref={menuButton} className="menu-toggle icon-button" aria-label={menu?'Fermer le menu':'Ouvrir le menu'} aria-expanded={menu} aria-controls="primary-navigation" onClick={()=>{setMenu(!menu);setExpanded(false);}}>{menu?<X/>:<Menu/>}</button>
    </div>

  </header>;
}


