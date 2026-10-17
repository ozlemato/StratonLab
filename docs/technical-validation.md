# Vérification technique — première implémentation

Date : 12 octobre 2026. Application Next.js de production locale. Le deuxième prompt n’a pas été exécuté.

## Contrôles exécutés

- npm.cmd run lint : réussi.
- npm.cmd run typecheck : réussi.
- npm.cmd run build : réussi, y compris après la correction de FAQ étroite.
- npm.cmd test : 9 tests réussis ; pages, français, titres, fragments, assets, sécurité, nonce, 404 et non-indexation.
- Audit production : 0 vulnérabilité signalée. Audit complet : 5 alertes élevées de développement, voir rapport de sécurité.
- Axe accueil desktop/mobile : 0 violation, 28 contrôles réussis, 2 résultats incomplets. Contact : 0 violation, 26 réussis, 1 incomplet. Les résultats incomplets exigent un examen humain.
- Lighthouse mobile local : performance 95, accessibilité 100, bonnes pratiques 100, SEO 66. LCP 2,9 s, FCP 0,9 s, Speed Index 1,2 s, TBT 50 ms, CLS 0. SEO réduit par le noindex volontaire.

Lighthouse a réussi après relance autorisée hors sandbox, le premier lancement ne pouvant joindre Chromium. Le rapport précède les corrections finales de FAQ étroite et des ancres natives, ainsi que la désactivation du panneau QA. Ces mesures de laboratoire ne remplacent pas les Core Web Vitals terrain. INP non mesuré. Le LCP dépasse encore la cible 2,5 s.

## Parcours manuels

Navigation desktop/mobile, mégamenu, liens de sections, détails de solutions, fermeture Escape et retour du focus, onglets au clic et aux flèches, FAQ, contact. Formulaire vide : refus natif du champ requis. Formulaire renseigné : téléchargement réel de mon-projet-stratonlab.txt, contenu lu et conforme aux données fictives ; confirmation qu’aucun message n’est envoyé. Aucune erreur de console observée pendant ces parcours.

Captures aux quatre formats demandés : 1440×900, 1280×800, 768×1024, 390×844. Pas de débordement horizontal aux formats demandés ; sticky supprimé sur tablette/mobile ; cartes empilées sur téléphone. Une vérification complémentaire à 320 px a conduit à corriger le min-width de la FAQ.

## Accès aux fichiers et limites

Les trois fichiers demandés, les logos, le ZIP de favicon, les captures et le HAR sont accessibles. Le texte joint initial a été lu pendant l’inspection. Aucun fichier d’instructions demandé n’est resté inaccessible. Le MP4 desktop existe mais n’a pas pu être décodé avec le FFmpeg embarqué ; ses timings n’ont donc pas été mesurés. Le MP4 mobile n’a pas fait l’objet d’une extraction valide. Les captures et Gladia.io live ont fourni les références vérifiables.

Pas de garantie de fidélité parfaite ou de certification réglementaire. Détails dans security-compliance-audit.md. Reduced motion implémenté, mais non testé avec une préférence système effective. Safari, Firefox, lecteur d’écran et zoom système restent à tester.

Vérification finale : les ancres successives retournent correctement #contenu, #solutions puis #questions sans cumul. Après correction, la largeur totale à 320 px est égale aux 305 px disponibles (barre de défilement exclue). Panneau QA absent. Build, lint et 9 tests HTTP réussis après les corrections.

