# Preuves visuelles — première implémentation et audit 02

Ces preuves répondent au premier prompt. Elles ne constituent pas l’exécution de instructions/02-visual-motion-audit.md.

## Captures

- reference-desktop.jpg et reference-mobile.jpg : planches des captures fournies.
- desktop-1440-hero.png, desktop-1280-hero.png : hero, identité et navigation.
- desktop-method.png, desktop-solutions.png : parcours et grille asymétrique.
- tablet-768-hero.png, tablet-solutions.png : adaptation tablette.
- mobile-390-hero.png, mobile-contact.png, mobile-solution-dialog.png, mobile-faq.png : mobile et interactions.
- axe-desktop.json, axe-mobile.json, axe-contact.json : résultats automatisés.

## Ajustements

Palette ivoire, or et noir, accent exact #FDD33C. Vrai logo sans déformation. Hero avec arcs, parcours en quatre étapes, grille de cinq cartes et halo final. Illustrations originales en code, textes français et scénarios clairement illustratifs. Aucun faux témoignage ou logo client.

Les nœuds du parcours restent opaques pour conserver le contraste ; état actif par échelle, bordure et halo. Navigation mobile repliée, vrais dialogues de solutions, FAQ corrigée à 320 px.

## Limites

Typographie et durées reconstituées visuellement, sans mesure frame par frame. Référence live différente des captures. Aucune frame vidéo exploitable avec le décodeur disponible. Les témoignages et comparatifs propriétaires ne sont pas transposés faute de preuves commerciales StratonLab. Ces limites décrivent la première passe. L’audit approfondi a ensuite été exécuté.

## Audit 02 terminé les 12 et 13 octobre 2026

Voir [rapport final](final-report.md) et le dossier phase-02/ : captures de référence, captures corrigées, cinq progressions du parcours, planches avant/après, superposition des contours, résultats axe et Lighthouse. Reproduction des planches : scripts/compare-audit.py. Journal de reprise à la racine : JOURNAL-DE-BORD.md.
