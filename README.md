# StratonLab

Site d’agence IA en français. Next.js App Router, React, TypeScript, Tailwind CSS, CSS personnalisé et GSAP. Les références existantes sont préservées.

Le dépôt contient le code, les ressources nécessaires au site et la documentation. Le dossier local `Référence/` (captures, vidéos et export HAR) ainsi que les skills externes de `skills/` restent hors du dépôt ; ils ne sont pas nécessaires pour lancer le site.

## Lancer

```powershell
npm.cmd ci
npm.cmd run dev
```

Ouvrir http://127.0.0.1:3000. Production locale : npm.cmd run build, puis npm.cmd run start. Écoute limitée à l’interface locale.

## Vérifier

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
# Serveur local actif :
npm.cmd test
npm.cmd audit --omit=dev
```

QA_CHECKS=true au démarrage active un contrôle axe local sur l’accueil et le contact. Laisser désactivé en production. Les rapports générés et captures restent en local dans docs/ et ne sont pas versionnés.

## Configurer avant publication

Copier .env.example en .env.local et renseigner uniquement des informations réelles. CONTACT_EMAIL active une préparation de message dans la messagerie du visiteur. Le téléchargement local de brief fonctionne sans adresse. Aucun endpoint d’envoi ni stockage de prospects.

SITE_URL est le domaine HTTPS réel. SITE_INDEXABLE=true active canonical, sitemap et indexation après validation éditoriale/juridique. ENABLE_HSTS=true uniquement après vérification HTTPS effective.

Compléter l’éditeur, l’hébergeur, le contact pour les droits et les traitements futurs. Confirmer les prestations. Le second document d’audit a été exécuté les 12 et 13 octobre 2026 ; voir docs/visual-audit/final-report.md.

## Rapports

Voir docs/technical-validation.md pour les résultats et docs/security-compliance-audit.md pour les limites et prérequis de publication. Les captures locales se trouvent dans docs/visual-audit/.


## Reprendre une session

Lire JOURNAL-DE-BORD.md à la racine. Ce fichier donne le dernier état vérifié, les limites et la prochaine action ; le mettre à jour après chaque jalon.
