# SECURITY, COMPLIANCE & WEB QUALITY REQUIREMENTS

## MISSION

Le site inspiré de https://www.gladia.io doit respecter les bonnes pratiques professionnelles de cybersécurité, confidentialité, accessibilité, performance et développement web moderne.

Ces exigences sont obligatoires dans le développement et dans le Visual & Motion Fidelity Audit.

La fidélité au design de référence ne doit jamais justifier une faille de sécurité, un manquement réglementaire ou une dégradation majeure de l'accessibilité.

## 1. CYBERSÉCURITÉ — OWASP

Utiliser comme références :
- OWASP Top 10 pour les risques applicatifs.
- OWASP ASVS 5.0.0, niveau 1, comme base de vérification proportionnée au projet.
- OWASP Cheat Sheet Series pour les recommandations d'implémentation.

Exigences :
- Utiliser HTTPS en production.
- Configurer HSTS lorsque le domaine et l'infrastructure sont prêts.
- Définir une Content Security Policy (CSP) restrictive, compatible avec Next.js et les scripts réellement nécessaires.
- Configurer les protections contre le clickjacking, notamment `frame-ancestors`.
- Utiliser `X-Content-Type-Options: nosniff`.
- Définir une Referrer-Policy adaptée.
- Limiter les permissions navigateur inutiles avec Permissions-Policy.
- Ne jamais exposer de secrets, clés privées ou tokens sensibles dans le frontend.
- Valider les données côté serveur.
- Prévenir les vulnérabilités XSS et injections.
- Éviter tout HTML brut non fiable.
- Protéger les endpoints sensibles contre les abus avec des limites de requêtes adaptées.
- Configurer correctement CORS lorsqu'il est nécessaire.
- Prévoir des protections CSRF lorsque le modèle d'authentification et les actions sensibles le nécessitent.
- Utiliser des cookies Secure, HttpOnly et SameSite lorsque pertinent.
- Ne pas journaliser de secrets ou de données personnelles inutiles.
- Utiliser des messages d'erreur qui ne divulguent pas d'informations internes.
- Maintenir les dépendances à jour et analyser leurs vulnérabilités.
- Ne pas exposer de fichiers `.env`, de clés ou de ressources internes.
- Ajouter des contrôles automatisés de sécurité dans la CI lorsque l'environnement le permet.

Si le site contient des comptes utilisateurs, API privées, paiements ou données sensibles, renforcer les contrôles proportionnellement aux risques.

## 2. RGPD ET CONFIDENTIALITÉ

Appliquer les exigences pertinentes du RGPD et des règles européennes et françaises sur les cookies et traceurs.

Prévoir :
- Une politique de confidentialité adaptée aux traitements réels.
- Des mentions légales complétées avec les vraies informations de l'éditeur.
- Une description des données collectées et de leurs finalités.
- Une base légale appropriée pour chaque traitement.
- Une collecte limitée aux données réellement nécessaires.
- Des durées de conservation définies.
- Des mécanismes adaptés pour exercer les droits des utilisateurs.
- Une gestion appropriée des sous-traitants et services tiers.
- Un dispositif de consentement pour les traceurs qui l'exigent.
- La possibilité de refuser ou retirer son consentement aussi simplement que de l'accepter.

Ne pas charger de traceurs non essentiels soumis à consentement avant un choix valide de l'utilisateur.

Ne pas afficher une bannière de cookies inutile si seuls des traceurs exemptés sont utilisés.

Ne pas inventer les coordonnées de l'entreprise, les prestataires, les finalités ou les déclarations légales.

Identifier les informations juridiques manquantes et les signaler pour validation.

## 3. ACCESSIBILITÉ — WCAG 2.2 AA

Viser WCAG 2.2 niveau AA et prendre en compte le RGAA si applicable.

Exigences :
- HTML sémantique.
- Structure de titres cohérente.
- Navigation utilisable au clavier.
- Focus visible.
- Contrastes suffisants.
- Alternatives textuelles pertinentes.
- Formulaires correctement étiquetés.
- Messages d'erreur compréhensibles.
- Composants accessibles aux technologies d'assistance.
- Zones interactives suffisamment grandes ou espacées selon les critères applicables.
- Adaptation aux préférences `prefers-reduced-motion`.
- Aucun blocage lié à des animations au scroll.
- Aucun élément essentiel dépendant uniquement du survol.
- Zoom et redimensionnement utilisables.

Tester particulièrement la couleur officielle #FDD33C pour vérifier la lisibilité du texte et des éléments interactifs.

Ne jamais dégrader l'accessibilité pour reproduire un effet visuel de Gladia.

## 4. PERFORMANCES WEB

Viser les seuils de qualité des Core Web Vitals :
- LCP inférieur ou égal à 2,5 secondes.
- INP inférieur ou égal à 200 millisecondes.
- CLS inférieur ou égal à 0,1.

Ces seuils doivent être évalués idéalement sur les données réelles au 75e percentile. Les tests locaux et Lighthouse servent de diagnostics complémentaires.

Optimiser :
- Images avec dimensions adaptées.
- Formats de médias modernes.
- Chargement différé des ressources non critiques.
- Chargement prioritaire des ressources essentielles du hero.
- Polices et `font-display`.
- Taille du JavaScript.
- Code splitting.
- Cache.
- Transforms et animations performantes.
- Consommation mémoire des animations.
- Chargement des vidéos.
- Stabilité visuelle de la page.

Les animations doivent rester fluides sans compromettre les performances mobiles.

## 5. STANDARDS DE DÉVELOPPEMENT

Respecter :
- HTML moderne et sémantique.
- CSS conforme aux standards web.
- JavaScript et TypeScript maintenables.
- React et Next.js selon leurs bonnes pratiques documentées.
- Responsive design.
- Compatibilité avec les navigateurs modernes.
- Gestion explicite des erreurs.
- Architecture modulaire et lisible.

Éviter les dépendances inutiles, les styles contradictoires, les composants dupliqués et les solutions fragiles.

## 6. SEO TECHNIQUE

Implémenter :
- Balises title et meta description pertinentes.
- Hiérarchie H1/H2/H3 cohérente.
- URLs propres.
- Balises canonical appropriées.
- Sitemap XML.
- Robots.txt.
- Métadonnées Open Graph.
- Métadonnées pour le partage social.
- Données structurées Schema.org lorsque pertinentes et factuellement justifiées.
- Textes alternatifs pertinents.
- HTML exploitable par les moteurs de recherche.
- Gestion correcte des erreurs 404.

Ne pas inventer de données structurées, avis, évaluations ou informations commerciales.

## 7. SÉCURITÉ DU DÉPLOIEMENT

Préparer un déploiement sécurisé :

- Variables d'environnement correctement séparées.
- Secrets gérés côté serveur.
- HTTPS et certificat valide.
- En-têtes de sécurité.
- Dépendances auditées.
- Journalisation adaptée.
- Gestion des erreurs.
- Sauvegardes lorsque des données persistantes existent.
- Permissions minimales.
- Aucun mode debug exposé en production.
- CI/CD avec vérifications automatiques lorsque disponible.

Ne jamais présenter une configuration locale comme une garantie de sécurité en production.

## 8. TESTS ET VALIDATION

Exécuter les contrôles réalisables :

- TypeScript.
- Lint.
- Build de production.
- Audit des dépendances.
- Tests fonctionnels.
- Tests responsive.
- Tests d'accessibilité automatisés avec axe-core ou un outil équivalent.
- Lighthouse lorsque disponible.
- Inspection des en-têtes HTTP de production ou de préproduction.
- Vérification des politiques CSP et cookies.
- Contrôle des erreurs navigateur.
- Vérification des fonctionnalités interactives.

Les tests d'accessibilité automatisés doivent être complétés par des contrôles manuels, notamment au clavier.

Ne pas effectuer de tests intrusifs contre le site de référence Gladia.

Limiter tous les tests de sécurité actifs à l'application du projet ou aux environnements explicitement autorisés.

## 9. RAPPORT FINAL

Créer `docs/security-compliance-audit.md`.

Pour chaque domaine, indiquer :
- Les exigences applicables.
- Les protections implémentées.
- Les tests réellement exécutés.
- Les résultats.
- Les risques résiduels.
- Les points à valider avant mise en production.

Utiliser les statuts :
- Conforme aux contrôles réalisés.
- Partiellement vérifié.
- Non vérifié.
- Non applicable.
- Correction nécessaire.

Ne pas affirmer que le site est certifié OWASP, RGPD ou WCAG uniquement parce qu'il suit ce brief.

Ne pas déclarer une conformité réglementaire complète sans les informations nécessaires ni validation appropriée.

## DIRECTIVE FINALE

La sécurité, la confidentialité, l'accessibilité et la performance sont des exigences fondamentales du projet.

Elles doivent être intégrées dès l'architecture, contrôlées durant l'implémentation et revérifiées pendant le Visual & Motion Fidelity Audit.

Objectif : une expérience visuelle premium, fidèle à la référence, avec une qualité technique et un niveau de sécurité adaptés à une exploitation professionnelle.