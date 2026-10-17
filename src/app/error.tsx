'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="contenu" className="legal-main not-found"><div className="container page-intro"><h1>Un imprévu est survenu.</h1><p>Le contenu n’a pas pu être affiché. Vous pouvez réessayer.</p><button className="button" onClick={reset}>Réessayer</button></div></main>}
