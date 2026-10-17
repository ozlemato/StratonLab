'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { mountWorkflowMotion } from '@/lib/workflow-motion';

export function Motion() {
  const path = usePathname();
  useEffect(() => {
    let cancelled = false;
    let dispose = () => {};
    // Le premier écran ne charge pas GSAP avant le premier défilement.
    const start = () => { Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]');
        reveals.forEach(el => {
          // Ne jamais remasquer un contenu déjà visible au chargement ou au retour de route.
          if (el.getBoundingClientRect().top < window.innerHeight) return;
          gsap.from(el, { y: 36, opacity: 0, duration: .85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
        });

      });
      media.add({ desktop: '(min-width: 900px)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
        if (!context.conditions?.desktop || !context.conditions?.motion) return;
        const visual = document.querySelector<HTMLElement>('.workflow-visual');
        const track = document.querySelector<HTMLElement>('.workflow-track');
        const journey = document.querySelector<HTMLElement>('.method-journey');
        const steps = gsap.utils.toArray<HTMLElement>('.method-step');
        const nodes = gsap.utils.toArray<HTMLElement>('.workflow-node');
        if (!visual || !track || !journey || nodes.length !== 4) return;
        return mountWorkflowMotion(visual, track, steps, nodes);
      });
      // matchMedia réagit aussi à un changement de préférence pendant la visite.
      dispose = () => media.revert();
    }); };
    if (window.scrollY > 0) start();
    else window.addEventListener('scroll', start, { once: true, passive: true });
    return () => { cancelled = true; window.removeEventListener('scroll', start); dispose(); };
  }, [path]);
  return null;
}
