# Correctif ciblé — éclipse et workflow, 13 octobre 2026

## Référence vérifiée
Gladia.io consulté en direct à 1440×900, avec lecture de ses scripts publics hero-canvas.js et homepage-deferred.js et de la feuille homepage-deferred.css. Copies de référence conservées sous .cache/*.txt, jamais exécutées dans le site local.

## Changements
- Ancien fond vertical remplacé par une éclipse radiale noire avec halo jaune de marque ; rendu mis en cache hors écran. Voile inférieur intégré au fond pour ne pas assombrir les libellés du cercle.
- Ancienne piste synchronisée en continu avec le scroll remplacée par les transitions discrètes de la référence.
- Connecteur animé 620 ms, puis tour lumineux du flow-ticket 1600 ms démarrant à 440 ms. Petite pointe claire, traînée jaune, fil discret persistant ; quatre étapes et rattrapage des étapes sautées.
- Manifeste public : nom StratonLab et theme_color #FDD33C rétablis après échec du test de marque. Fichiers d’icônes et originaux logo/ préservés.

## Validation
Lint, TypeScript, build production réussis. Neuf tests HTTP réussis après réparation du manifeste. Contrôle navigateur des quatre étapes : quatre connecteurs persistants en fin de parcours, aucun segment temporaire restant, aucune erreur/alerte console retournée, aucun débordement horizontal à 1440 px et 390 px. Contrôle visuel mobile et desktop. Pas de nouvelle mesure Lighthouse/axe ; les résultats de l’audit antérieur restent historiques.

## Preuves
- reference-eclipse.png : Gladia au scroll 495 px.
- reference-workflow.png : phase de capture Gladia.
- hero-desktop.png, hero-mobile.png, hero-mobile-eclipse.png : fond local.
- workflow-stage-4-2.png : segment descendant.
- workflow-stage-4-3.png : segment ayant atteint le contour supérieur du ticket.
- Autres captures : étapes et déplacement de la piste.

Les images sont des instants de séquences réelles, pas des mesures frame par frame. Les timings sont confirmés par la source publique. Adaptations intentionnelles : jaune #FDD33C, fond #080908, contenus français, cartes métier propres au projet. Aucun fichier requis inaccessible ; l’accès live à la référence a fonctionné.
