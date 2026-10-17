import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
export default function NotFound(){return <main id="contenu" className="legal-main not-found"><div className="container page-intro"><span className="eyebrow">ERREUR 404</span><h1>Cette page a pris<br/>un autre chemin.</h1><p>La page demandée n’existe pas ou a été déplacée.</p><Link href="/" className="button">Revenir à l’accueil <ArrowUpRight size={18}/></Link></div></main>}
