# Sécurité, confidentialité et qualité — audit actualisé

Contrôles du 12 octobre 2026 sur le build de production local, accessible uniquement sur 127.0.0.1:3000. La base de contrôles ci-dessous provient de la première implémentation et a été complétée lors du second audit, les 12 et 13 octobre 2026. Aucune certification OWASP, RGPD ou WCAG n’est revendiquée.

| Domaine | Statut | Protections et contrôles réalisés | Limites et actions avant publication |
| --- | --- | --- | --- |
| En-têtes et CSP | Conforme aux contrôles réalisés | Tests HTTP sur quatre pages : nonce unique correspondant au HTML, aucun unsafe-eval production, frame-ancestors none, DENY, nosniff, Referrer-Policy, Permissions-Policy. | Recontrôler derrière le futur CDN. style-src conserve unsafe-inline pour React/GSAP, compromis réduisant la protection contre les injections CSS. |
| Secrets et fichiers internes | Conforme aux contrôles réalisés | Aucune clé ajoutée ou nécessaire. .env, .git/config et brief.md renvoient 404. Pas de HTML non fiable injecté. React échappe les valeurs. | Inspection proportionnée, pas test d’intrusion exhaustif. Vérifier les futurs secrets et permissions. |
| Formulaire | Conforme aux contrôles réalisés | Brief TXT construit localement. Champ obligatoire et téléchargement réel testés avec données fictives ; contenu téléchargé vérifié. Aucun envoi serveur. | CONTACT_EMAIL permet un brouillon mailto, sans envoi automatique. Fournir le vrai contact. |
| Authentification, CSRF, validation serveur, CORS, cookies de session | Non applicable | Aucun compte, API privée, paiement, session ou mutation serveur. Les champs restent sur l’appareil. | Avant un futur envoi serveur : validation, limitation d’abus, protections et conservation adaptées. |
| HTTPS et HSTS | Non vérifié | Écoute locale seulement. HSTS configurable après HTTPS effectif. | Certificat, redirections, domaine et infrastructure à contrôler après déploiement. |
| Dépendances | Correction nécessaire | Audit production : 0 vulnérabilité. Audit complet : 5 alertes élevées dans l’outillage de développement, liées à braces/micromatch/fast-glob et eslint-config-next. Rapports JSON conservés. | Dernière version braces disponible lors du contrôle : 3.0.3, encore concernée. Pas de rétrogradation automatique incompatible. Surveiller le correctif ; ne pas traiter de configurations de lint non fiables. |
| Mentions légales et RGPD | Correction nécessaire | Pages françaises décrivant la préparation locale du brief ; informations manquantes signalées. | Compléter éditeur, forme juridique, immatriculation, publication, hébergeur, contact droits, traitements et durées réels. Vérifier les journaux et sous-traitants du futur hébergeur. |
| Cookies et tiers | Conforme aux contrôles réalisés | Aucun Set-Cookie sur les réponses testées. Police locale, aucun analytics/pixel, aucune bannière inutile. | Réexaminer l’information et le consentement avant ajout d’un service externe. |
| Accessibilité | Partiellement vérifié | Axe : zéro violation sur accueil desktop, mobile et contact. Contrastes corrigés. Menu/Escape, dialogue/focus restitué, onglets/flèches, formulaire et FAQ contrôlés. Lighthouse 100. | Axe conserve 2 résultats incomplets sur accueil, 1 sur contact. Pas de lecteur d’écran ou d’audit RGAA exhaustif. Reduced motion revu dans le code mais non émulé dans le système. |
| Responsive | Conforme aux contrôles réalisés | Captures à 1440×900, 1280×800, 768×1024, 390×844 ; menu et dialogue mobiles vérifiés. FAQ corrigée à 320 px. | Chromium uniquement ; Safari/iOS, Firefox et zoom système restent à tester. |
| Performance | Partiellement vérifié | Lighthouse mobile local : 95, LCP 2,9 s, CLS 0, TBT 50 ms, FCP 0,9 s. Police locale, images dimensionnées, illustrations CSS/SVG, GSAP chargé dynamiquement avec nettoyage. | LCP au-dessus de la cible de 2,5 s. Mesures terrain et INP indisponibles. TBT n’est pas INP. Poursuivre les mesures sur le futur hébergement. |
| SEO | Partiellement vérifié | Titres et descriptions français, H1 unique, Open Graph, favicon, robots, sitemap, vraie 404. Lighthouse SEO 66. | Noindex volontaire avant validation. Renseigner SITE_URL HTTPS et SITE_INDEXABLE=true ; vérifier canonical et sitemap réels. |
| CI et exploitation | Partiellement vérifié | Workflow fourni : lint, types, build, audit production et tests HTTP. Contrôles locaux réussis, aucune erreur de console observée. Pages d’erreur françaises. | CI distante, permissions, surveillance et logs d’hébergement non vérifiés. Pas de données persistantes à sauvegarder actuellement. |

## Sources et preuves

- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) : base proportionnée, sans couverture exhaustive du niveau 1.
- [CSP Next.js](https://nextjs.org/docs/app/guides/content-security-policy) : nonce par requête et rendu dynamique.
- [CNIL — cookies et traceurs](https://www.cnil.fr/fr/cookies-et-autres-traceurs) : adapter aux traitements réels.
- Preuves : http-tests.txt, production-dependency-audit.json, dependency-audit.json, lighthouse-mobile.json, visual-audit/axe-*.json.

Avant publication : valider les prestations, fournir les informations réelles de l’entreprise et de contact, compléter les pages légales, définir le domaine et l’hébergement, contrôler HTTPS et les en-têtes déployés, réauditer les dépendances et compléter les vérifications manuelles d’accessibilité. L’aperçu reste volontairement non indexable.


## Actualisation après le Visual & Motion Audit (13 octobre 2026)

- **Conforme aux contrôles réalisés** : lint/types, build de production et neuf tests HTTP. Nonces CSP distincts, assets/ancres/favicon valides, routes internes non publiées. Aucun nouvel endpoint, service tiers ou collecte introduit.
- **Partiellement vérifié — accessibilité** : axe final desktop et mobile, zéro violation, 28 passes et 2 incomplets chacun ; contact, zéro violation, 27 passes et aucun incomplet. Clavier du dialogue, focus restitué, menu Échap, onglets, FAQ, validation française et téléchargement réel du brief testés. Pas de lecteur d’écran, audit WCAG exhaustif ou émulation système de reduced-motion.
- **Conforme aux contrôles réalisés — responsive** : 1440×900, 1280×800, 768×1024, 390×844, plus FAQ à320px ; pas de débordement horizontal détecté. Transitions et nettoyage du diagramme au passage tablette vérifiés.
- **Partiellement vérifié — performance** : dernière mesure Lighthouse95/100/100/66, LCP2,6s, CLS0, TBT150ms. GSAP différé au premier scroll. LCP reste supérieur à2,5s ; INP terrain non mesuré. Variabilité locale, aucune garantie de production.
- **Correction nécessaire — dépendances** : audit production toujours0 ; audit complet toujours5 alertes élevées de développement. Rapports phase-02 conservés. Pas de correction compatible appliquée sans version corrigée vérifiée.
- **Correction nécessaire — juridique/publication** : vraies informations d’éditeur, hébergement et contact encore nécessaires. Noindex volontaire. Le formulaire reste local, sans soumission serveur ; aucune validation serveur/CSRF n’est donc applicable à ce flux.
- **Non vérifié — infrastructure** : HTTPS/HSTS déployés, logs/CDN, CI distante, permissions et supervision du futur hébergement.

Preuves actualisées dans visual-audit/phase-02/ : axe-desktop.json, axe-mobile.json, axe-contact.json, lighthouse-mobile-final.json, audits de dépendances et http-tests.txt. Rapport visuel complet : visual-audit/final-report.md. Les scores de la table précédente restent l’historique de la première passe ; ceux de cette actualisation sont les derniers résultats.

### Correctif éclipse/workflow — 13 octobre
Aucune dépendance ou requête externe ajoutée. Dégradé mis en cache par taille, animation bornée et nettoyage des observateurs/RAF. Lint/types/build et neuf tests HTTP repassés. Manifeste de marque corrigé sans remplacer les icônes. Les scores Lighthouse/axe précédents ne constituent pas une mesure de cette nouvelle version ; reduced-motion vérifié dans le code seulement.
