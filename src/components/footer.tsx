/* eslint-disable @next/next/no-html-link-for-pages -- Les ancres natives évitent le cumul de fragments observé avec le routeur ; les routes utilisent Link. */
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
export function Footer(){return <footer className="footer"><div className="container footer-top">
  <div><Link href="/" className="footer-brand" aria-label="StratonLab, accueil"><Image src="/brand/Logo-StratonLab-white.png" alt="StratonLab" width={1042} height={262} sizes="210px" /></Link><p>L’intelligence artificielle.<br/>À votre service.</p></div>
  <div><span className="footer-label">EXPLORER</span><a href="/#solutions">Solutions IA</a><a href="/#methode">Notre méthode</a><a href="/#cas-usage">Cas d’usage</a><a href="/#agence">L’agence</a></div>
  <div><span className="footer-label">ÉCHANGEONS</span><Link href="/contact">Votre projet <ArrowUpRight size={15}/></Link><a href="/#questions">Questions fréquentes</a><Link href="/confidentialite">Confidentialité</Link><Link href="/mentions-legales">Mentions légales</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} StratonLab</span><span>Conçu pour les besoins réels.</span><a href="#contenu">Retour en haut ↑</a></div></footer>}


