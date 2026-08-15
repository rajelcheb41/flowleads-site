# Audit SEO — flowleads.agency
**Date :** 10 août 2026
**Méthode :** crawl complet des 20 URLs du sitemap (curl + parsing HTML réel), vérification directe des fichiers sources déployés (`flowleads-lp-draft`), inspection Vercel (domaine, cache, alias), tentative de données de performance réelle (PageSpeed/CrUX indisponibles — pas de clé API, npx/Lighthouse indisponible dans cet environnement).

## Score de santé SEO : 75/100

| Catégorie | Poids | Score |
|---|---|---|
| Technique | 22% | 78/100 |
| Contenu | 23% | 75/100 |
| On-page | 20% | 70/100 |
| Schema | 10% | 80/100 |
| Performance | 10% | 72/100 (estimé, pas de données de champ) |
| AI Search Readiness | 10% | 68/100 |
| Images | 5% | 92/100 |

**Contexte important :** un audit précédent (2026-08-05) avait donné 40/100 sur une version antérieure du site qui avait ensuite été retirée en urgence (panique liée à un déploiement accidentel pendant qu'un client payait en direct). Le site a changé de version depuis (nouveau zip, nouveau projet Vercel `flowleads-lp-draft`) — ce score de 75/100 reflète l'état réellement en ligne aujourd'hui, pas l'ancien audit.

## Top 5 points forts
1. Aucune fausse preuve/faux témoignage détecté — tous les secteurs mis en avant dans le blog (déménagement, salle de sport, opticien, restaurant, barbier, auto-école) correspondent à de vraies captures d'écran de comptes pub dans `/portfolio.html`. Politique anti-fabrication bien respectée.
2. Schema.org valide : `Organization`+`ContactPoint`, `FAQPage` (page d'accueil), `Article`+`WebPage`+`ImageObject` (articles de blog).
3. Images : 100% des images de contenu (preuves, créatives) ont un alt text descriptif ; les icônes décoratives ont volontairement `alt=""` (bonne pratique, pas un oubli).
4. Maillage interne du blog complet : les 17 articles sont tous liés depuis `/blog/index.html`, pas de page orpheline.
5. Le sous-domaine de preview Vercel (`flowleads-lp-draft.vercel.app`) est correctement exclu de l'indexation (`X-Robots-Tag: noindex, nofollow` scopé par host dans `vercel.json`) — évite le duplicate content, bonne pratique déjà en place.

## Top 5 points à corriger
1. **Cache HTTP absent sur les assets statiques** (Critical/High) — tous les CSS/JS/images sont servis avec `Cache-Control: public, max-age=0, must-revalidate`. Chaque visite revalide la totalité des ~29 fichiers statiques (aucun n'est mis en cache par le navigateur). Impact direct sur la vitesse perçue au 2e chargement et sur les Core Web Vitals.
2. **Titles et meta descriptions trop longs** (High, sitewide) — 14 pages sur 20 ont un `<title>` > 60 caractères, 17 sur 20 ont une meta description > 160 caractères. Résultat : troncature avec "..." dans les résultats Google sur la majorité du site, CTR sous-optimal.
3. **Gouvernance du backlog éditorial à sécuriser avant publication de masse** (Critical, process) — `content-backlog.md` liste 33 articles en attente pour publication quotidienne automatisée, dont une quinzaine sur des secteurs (kiné, dentiste, coiffeur, immobilier, garage, institut de beauté, avocat, expert-comptable, électricien, paysagiste, vétérinaire, photographe, agence de voyage, cuisiniste) qui **n'ont aucune preuve portfolio confirmée** à ce jour (contrairement à déménagement/sport/opticien/restaurant/barbier/auto-école/plomberie/rénovation qui ont un vrai screenshot). Publier des pages sectorielles pour ces métiers sans preuve réelle reproduirait exactement l'incident du 2026-08-05 (contenu retiré en urgence pour fausses preuves).
4. **17 fichiers CSS + 12 fichiers JS non regroupés**, tous chargés séparément sans bundling/minification visible — alourdit le nombre de requêtes bloquantes en `<head>`.
5. **Pas de mesure d'audience organique** — aucun GA4/GTM sur le site (seul le Pixel Meta est présent, chargé après consentement RGPD). Impossible de savoir si les efforts SEO/blog génèrent réellement du trafic sans ça. Search Console est vérifié (meta tag présent) mais le compte de service `claude-seo@gen-lang-client-0298118458.iam.gserviceaccount.com` n'a pas accès à la propriété — pas de données de position/clics disponibles pour piloter l'amélioration continue.

## Détail par catégorie

### Technique SEO (78/100)
- `robots.txt` : `Allow: /` global + lien sitemap — correct, aucun blocage involontaire.
- `sitemap.xml` : 20 URLs, toutes en HTTP 200, cohérent avec le contenu réel du site.
- Canonical self-référençant présent et correct sur les 20 pages testées.
- HTTPS + HSTS (`Strict-Transport-Security: max-age=63072000`) actif.
- **Domaine multi-projet à surveiller** : `flowleads.agency` apparaît historiquement rattaché à deux projets Vercel (`flowleads-lp-draft` = actif aujourd'hui, `flowleads` = legacy Next.js). Le dossier de travail précédemment documenté (`flowleads-lp-final-new`) n'est **plus** la source du site en ligne — `flowleads-lp-draft` l'est (vérifié : diff byte-à-byte identique entre le fichier local et le HTML livré en prod). Toute future édition doit se faire dans `flowleads-lp-draft`.
- Cache HTTP absent sur assets statiques (voir points à corriger).
- Aucune donnée de champ Google (CrUX/PageSpeed) disponible : pas de clé `GOOGLE_API_KEY` configurée pour l'outillage SEO.

### Contenu (75/100)
- Aucun titre dupliqué entre les 20 pages.
- Longueur du contenu réel (hors templates de modales légales, qui sont inertes/non indexés) : 632 à 1740 mots par page. Quelques pages un peu courtes (barbier 632, comment-remplir-planning-auto-ecole 654, comment-attirer-clients-opticien 664, comment-trouver-adherents-salle-de-sport 679, restaurant 714) — pas critique mais gagnerait en profondeur face à la concurrence.
- Cohérence du prix (500 €/mois) vérifiée sur homepage, portfolio et articles de comparaison — aucune incohérence trouvée (le prix a changé depuis un ancien audit qui mentionnait 300€, mais il est bien harmonisé partout aujourd'hui).
- Risque de gouvernance sur le backlog éditorial (voir points à corriger #3).

### On-page SEO (70/100)
- Voir points à corriger #2 (longueurs de title/meta).
- H1 unique et correct sur chaque page (le compte brut de 4 H1/page vu au premier scan était un faux positif : 3 des 4 H1 appartiennent à des `<template>` de modales légales, qui sont inertes et non rendus/indexés — vérifié en excluant ces blocs).
- Structure de heading propre par ailleurs (H1 → H2 pour les sections d'articles).

### Schema/Données structurées (80/100)
- `Organization` + `ContactPoint` + `FAQPage` sur la homepage — valides.
- `Article` + `WebPage` + `ImageObject` sur les articles de blog — valides.
- Opportunités manquées : pas de `Service`/`Offer` schema pour l'offre à 500€/mois (rich snippet prix possible), pas de `BreadcrumbList` sur les articles de blog, pas de `Blog` schema global sur `/blog/index.html`.

### Performance — mise à jour 2026-08-10 (données réelles PageSpeed Insights)
Clé `GOOGLE_API_KEY` configurée le jour même, mesure Lighthouse réelle obtenue (mobile) : **Performance 96/100, Accessibilité 96/100, Bonnes pratiques 100/100, SEO 100/100**. LCP 2.4s, CLS 0.024, TBT 0ms, poids total 579 Ko. Nettement au-dessus de l'estimation initiale (72/100) faite sans données réelles. Pas encore de `field_metrics` CrUX (site trop récent/peu de trafic pour l'historique utilisateurs réels) — à surveiller lors des prochains audits.

### AI Search Readiness / GEO (68/100)
- `robots.txt` en `Allow: /` global — n'exclut aucun user-agent IA (GPTBot, PerplexityBot, ClaudeBot, etc.), donc accessible par défaut.
- `FAQPage` schema = bon signal de citabilité pour les moteurs IA (réponses structurées Q/R).
- Manque : pas de `llms.txt` (404 constaté), pas de section dédiée aux réponses courtes/citables en tête d'article.

### Images (92/100)
- 100% des images "contenu" (preuves, créatives) ont un alt descriptif et pertinent.
- Icônes décoratives en `alt=""` — bonne pratique volontaire.
- Formats WebP, dimensions explicites, lazy loading correct.
- Seule amélioration mineure : le mockup `phone-poolcenter.webp` (visible sur homepage et portfolio) a un `alt=""` alors que c'est une image de contenu (aperçu produit), pas décorative.
