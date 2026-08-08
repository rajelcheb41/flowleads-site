# Flowleads — Landing page

Site vitrine de Flowleads (agence de publicité Meta & Google Ads, 500 €/mois, sans engagement).
HTML / CSS / JS statique, sans build, sans dépendance.

Ouvre `index.html` dans un navigateur, ça tourne.

---

## Mission

Ces 3 sections sont **déjà validées visuellement**. Elles ne sont pas un brouillon.

**Tu peux** : restructurer les fichiers, porter vers une autre stack, extraire des composants,
supprimer du CSS mort, ajouter les sections manquantes, améliorer l'accessibilité et le SEO.

**Tu ne dois pas modifier**, sauf demande explicite :
- les valeurs de couleur
- les tailles et graisses de police
- les durées et courbes d'animation
- les breakpoints
- le texte des titres et des CTA

Si tu penses qu'une de ces valeurs devrait changer, **propose-le, ne l'applique pas**.

---

## Structure

```
index.html                    3 sections, dans l'ordre du scroll
styles/
  tokens.css                  ← source unique des couleurs, polices, ombres, courbes
  base.css                    reset, fond de page, .reveal, .rise, .panel-shell, .grain
  hero.css                    section 1 + le bouton .btn (utilisé partout)
  regies.css                  section 2
  creatives.css               section 3
  process.css                 section 4
  proof.css                   section 5
  cases.css                   section 6
  compare.css                 section 7
  faq.css                     section 8
  reviews.css                 section avis
  meta.css                    section Meta Ads
  footer.css                  section 9
  layout.css                  ⚠ CHARGÉ EN DERNIER — mise en page d'un seul tenant
  portfolio.css               page portfolio (Landing Pages + IA)
  legal.css                   typo des popups légales
  modal.css                   popups légales
  legal.css                   typo légale (pages ET modales)
  modal.css                   popups légales
index.html                    landing (contient les 3 modales légales en <template>)
portfolio.html                page portfolio : Google, Meta, Créatives, IA, Landing Pages
mentions-legales.html         version page autonome (optionnelle, non liée)
confidentialite.html          version page autonome (optionnelle)
cgv.html                      version page autonome (optionnelle)
scripts/
  reveal.js                   IntersectionObserver partagé pour tous les .reveal
  hero.js                     éventail, trait manuscrit, parallaxe
  creatives.js                duplication des rails du carrousel
  counters.js                 utilitaire partagé : window.flCountUp(racine)
  proof.js                    éventail des preuves (section 5)
  cases.js                    déclenche les compteurs des cartes (section 6)
  reviews.js                  duplication de la piste d'avis
  faq.js                      accordéon
  legal-modal.js              ouverture des popups légales
  nav.js                      menu hamburger mobile
assets/img/
  logo-flowleads.webp
  hero-bg-desktop.webp        fond de la hero ≥ 641px
  hero-bg-mobile.webp         fond de la hero ≤ 640px (cadrage portrait)
  regie-meta.webp
  regie-google.webp
  mockup-instagram.webp       détouré, fond transparent
  creatives/*.webp            14 créatives, servent la hero ET le carrousel
  google-ads-icon.webp        icône détourée, 4× en fond de la section preuves
  meta-icon.webp              icône Meta détourée, 4× en fond de la section Meta
  preuves/*.webp              captures de comptes clients (Google + Meta)
```

Tout passe par `tokens.css`. Si tu changes le vert de marque, tu le changes **à un seul endroit**.

---

## Les 3 sections

**1. Hero** — nav, headline avec italique serif + trait manuscrit animé, éventail de 7 créatives, double CTA.

**2. Régies** — deux cartes Meta Ads / Google Ads séparées par un filet, apparition au scroll, survol riche.

**3. Créatives** — deux rails infinis en sens opposés, mockup iPhone flottant, fond blanc cassé à trame de points.

**4. Déroulé** — 4 étapes en cartes vertes, de la plus sombre (étape 1) à la plus lumineuse (étape 4).
Chaque carte contient une mini-interface en HTML/CSS pur, volontairement rognée par le bas.

**5. Preuves** — fond blanc, icônes Google flottantes, éventail de 7 captures de comptes
clients avec récap chiffré en bas de chaque carte. Les chiffres se comptent à l'arrivée.

**6. Campagnes en détail (Google)** — fond blanc, une carte par compte : capture en grand,
3 chiffres clés, argumentaire. Montants en euros (pastille €), sauf le compte UK en livres.

**Meta Ads en chiffres** — bande bleu Meta sombre, icônes Meta flottantes, grand dashboard
incliné + 3 KPI animés. Placée juste après la section Google (Google puis Meta).

**7. Comparatif** — deux colonnes, agence classique (grise, croix) contre Flowleads
(verte, coches qui se tracent). 8 lignes de comparaison.

**Avis** — bande vert foncé, 6 témoignages. Défilement horizontal sur desktop,
pile verticale sous 820px. Placée entre le comparatif et la FAQ.

**8. FAQ** — accordéon 10 questions, une seule ouverte à la fois.

**9. CTA final + pied de page** — bloc vert avec champ e-mail, puis logo, colonnes de liens,
réseaux et barre légale.

---

## Décisions à ne pas défaire

Ces points ont l'air bizarres mais chacun corrige un vrai problème.

**`.regies__grid .regie-card:hover` — 3 classes, pas 2.**
`.reveal.in` impose `transform:none` et est déclaré après. À spécificité égale il gagne,
et le soulèvement au survol ne se déclenche jamais. Ne réduis pas cette spécificité.

**Les rails sont dupliqués en JS, pas en HTML.**
Le CSS translate la piste de `-50%` : il lui faut donc exactement deux jeux identiques.
Écrire les 14 vignettes en dur doublerait le markup pour rien.

**Chaque script est dans une IIFE.**
Sans ça, deux sections qui déclarent `const io` en portée globale se plantent mutuellement
(SyntaxError, et tout le bloc échoue silencieusement). Garde ce réflexe pour les sections suivantes.

**La hero masque les cartes 0 et 5 sous 640px.**
5 vignettes lisibles valent mieux que 7 illisibles. La liste `HIDE_ON_MOBILE` est explicite
et pas "les 5 premières" : la créative clim doit rester visible.
Le JS repositionne aussi `margin-left` sur la première carte **visible** — sinon le
`:first-child` du CSS s'applique à une carte masquée et l'éventail se décale.

**Deux fonds différents pour la hero.**
En `cover` sur un panneau étroit, le fond desktop rogne les logos Meta et Google Ads.
D'où un fichier au cadrage portrait pour le mobile.

**Le mockup disparaît sous 900px.**
Les vignettes tombent à 142px de haut, un téléphone par-dessus en cacherait la moitié.

**Les mini-interfaces de la section 4 ne sont pas des images.**
Tout est en HTML/CSS : zéro requête, net à tous les zooms, et le contenu (créneaux,
budgets, leads) reste modifiable en texte. Ne les remplace pas par des captures.

**Les micro-animations de la section 4 sont pilotées par `.in`.**
`reveal.js` pose `.in` sur chaque `.step`, et tout le reste s'enchaîne en CSS :
barre de progression, filet de l'encadré, créneaux, jauges de budget, coches, leads.
Les délais sont en dur dans `process.css` via `--d` et `:nth-of-type`.
Si tu extrais ça en composants, garde `.in` sur la carte : les enfants en dépendent.

**La section 5 change de mode à 900px, et le JS doit suivre.**
Au-dessus : éventail, géométrie posée en inline par `proof.js`.
En dessous : carrousel qui se fait glisser au doigt, avec `scroll-snap`.
Le CSS neutralise les transforms avec `!important` **et** `proof.js` les retire
via `removeProperty` au changement de breakpoint. Les deux sont nécessaires :
sans le JS, les cartes gardent leur rotation inline en revenant sur desktop.

**Les compteurs sont formatés en fr-FR.**
`toLocaleString('fr-FR')` produit « 1 181 » avec une espace fine insécable et
« 42,1 » avec une virgule. Ne remplace pas par une concaténation manuelle.

**Les captures sont des données clients réelles.**
Chiffres, secteurs et plateformes correspondent aux comptes. Ne les modifie pas.
Sur `meta-campagnes.webp`, noms de campagnes (barres grises) et date (case blanche)
sont volontairement masqués — ne pas révéler.

**Devises : € pour les comptes FR, £ pour le compte UK.**
Les captures d'origine étaient en dollars ; les montants ont été passés en euros car
les clients sont français. Seul le compte « agence partenaire UK » et le dashboard Meta
(compte britannique) restent en livres. La pastille lit `attr(data-cur)`, donc changer
`data-cur="€"` en `data-cur="£"` suffit à basculer le symbole.

**L'accordéon FAQ anime `grid-template-rows: 0fr → 1fr`.**
C'est ce qui permet d'animer une hauteur inconnue sans mesurer en JS.
L'enfant direct de `.faq-a` doit garder `overflow:hidden`, sinon rien ne se replie.

**`counters.js` doit être chargé avant `proof.js` et `cases.js`.**
Il expose `window.flCountUp`. L'ordre des balises script en fin de page compte.

**Les mentions / confidentialité / CGV s'ouvrent en POPUP, pas en page.**
Le contenu vit dans des `<template id="legal-XXX">` en bas de `index.html`.
`legal-modal.js` le clone dans `#legalModal` à l'ouverture. Les liens portent
`data-modal="mentions|confidentialite|cgv"`, pas un `href` de fichier.
⚠ La modale DOIT être dans le DOM avant le script : le bloc `<template>`+`#legalModal`
est placé juste avant les `<script>`. Ne le remonte pas dans le `<head>`.
Les 3 fichiers `.html` autonomes existent encore (utiles pour un sitemap / SEO) mais
ne sont plus liés depuis le footer.

**Le téléphone en bas de la section créatives est en bleed ET chevauche le carrousel.**
Fond transparent (`phone-poolcenter.webp`), `margin-top:-120px` le fait remonter par-dessus
les rails (il dépasse de moitié), `overflow:hidden` sur `.creas` coupe son bas, la section
« déroulé » chevauche. Animation gauche-droite. Ne retire ni l'overflow ni la marge négative.
Le mockup flottant qui était sur les rails a été SUPPRIMÉ (un seul téléphone désormais).

**Les aperçus de sites du portfolio ne sont PAS cliquables.**
`pointer-events:none` sur les images, `draggable="false"`. Ce sont des exemples de réalisations,
pas des liens. Au survol, l'image défile doucement (translateY) pour montrer le site entier.

**La section IA est sur fond blanc cassé + points (comme les créatives), pas en vert.**

**Section IA et Landing Pages : `width:100%` obligatoire (voir layout.css).**
Même piège que la section avis : un enfant en `width:max-content` (le carrousel IA)
fait déborder la section si elle n'est pas contrainte.

**Le mockup mobile de la section Meta a un masque radial.**
L'image du téléphone a un fond coloré. Un `mask-image` en dégradé radial fond ses bords
dans le fond de section, et `overflow:hidden` sur `.meta__phone` coupe le bas : aucune
bordure d'image visible. Ne retire ni le masque ni l'overflow.

**Les cartes étapes sont rognées en bas, c'est voulu.**
`overflow:hidden` sur `.step` coupe la mini-interface : elle donne l'impression de
continuer hors du cadre. Ne mets pas de `padding-bottom` pour "réparer" ça.

---

## Architecture en 2 pages

- **index.html** : la landing (hero → régies → créatives → déroulé → preuves → comparatif → avis → FAQ → footer).
  Les dashboards Google/Meta ont été RETIRÉS de la home : elle ne garde que le pitch des deux régies
  avec un CTA souligné « Parlons chiffres » qui renvoie vers le portfolio.
- **portfolio.html** : Google Ads (dashboards détaillés) · Meta Ads · Créatives (carrousels) ·
  IA (contenus viraux) · Landing Pages (aperçus non cliquables). Les ancres `#pf-google` et `#pf-meta`
  sont les cibles des CTA « Parlons chiffres » de la home.

Le menu : liens classiques sur desktop, **hamburger plein écran sous 640px** (`nav.js`).
« Portfolio » pointe vers `portfolio.html`, « Tarifs » vers `#comparatif`.

## La page est d'un seul tenant

`layout.css` est chargé **en dernier** et écrase la coquille « panneau flottant »
des feuilles de section : plus de coins arrondis, plus d'ombres, plus de gouttières.
Les sections s'enchaînent bord à bord et c'est leur **couleur de fond** qui les sépare.

Le contenu est recentré à `--page-max` par
`padding-inline: max(24px, calc((100% - var(--page-max)) / 2))`,
sans conteneur supplémentaire dans le HTML.

Deux exceptions volontaires : `.creas` et `.proof` gardent un padding latéral nul,
pour que les rails de créatives et l'éventail des preuves filent jusqu'aux bords.

**`width:100%` dans ce fichier n'est pas décoratif.** Une section dont un enfant est
en `width:max-content` (les rails) se dimensionne sinon sur son contenu et fait
plusieurs milliers de pixels de large.

## ⚠ À remplacer avant mise en ligne

Ces valeurs sont des **placeholders**, elles ne doivent pas partir en production telles quelles :

- ✅ pages légales créées (mentions, confidentialité, CGV) et liées dans le footer
- vérifier l'exactitude des infos légales : EIN TOZZALI LLC, adresse d'hébergement Hostinger
- footer : lien LinkedIn encore vide (`href="#"`) — Instagram et WhatsApp sont OK
- ✅ tous les CTA pointent vers cal.eu/flowlead/15minutes
- section 6, carte « Restaurant / Barbier » : chiffres relus depuis la capture,
  **à faire confirmer** (les six autres cartes reprennent des textes déjà validés)
- section 7 : chaque ligne de la colonne Flowleads est une **promesse contractuelle**
  (7 jours, reporting hebdomadaire, nombre de comptes limité, aucun frais de setup).
  Ne garder que ce qui est réellement tenu.
- section 8 : les réponses reflètent l'offre décrite en conversation, à relire une par une.
- **section avis : les 6 témoignages sont des textes de travail.** Publier de faux avis
  est une pratique commerciale trompeuse (art. L121-2 du code de la consommation).
  À remplacer par les verbatims réels, avec l'accord écrit des clients.
  Les avatars sont des monogrammes : pas de photo inventée.

## À faire

- [x] Auto-héberger les polices en `.woff2` (`styles/fonts.css`, subset latin uniquement — supprime les 2 requêtes externes et le FOUT)
- [x] Favicon, Open Graph, Twitter Card et données structurées (`Organization` partout, `Article` sur les 18 articles, `Blog` sur `blog/index.html`, `FAQPage` sur la home)
- [ ] Brancher les CTA sur le vrai lien de réservation
- [ ] Brancher le formulaire du bloc CTA
- [ ] `srcset` sur les créatives (elles sont servies à 500px de haut pour un affichage à 250px)
- [ ] Mentions légales / RGPD
- [ ] Déployer ces correctifs sur `flowleads.agency` (le domaine final tourne encore une ancienne version, sans robots.txt/sitemap/blog/schema)

## Bon à savoir

- Ordre des sections : hero → régies → créatives → déroulé → preuves → campagnes → comparatif → FAQ → footer.
- Le fond de page est en `background-attachment:fixed` : les panneaux flottent dessus au scroll.
- `prefers-reduced-motion` est respecté partout, ne le retire pas.
- Aucune image n'a de `width`/`height` en HTML sauf le logo → il y a du CLS à corriger.
- Les créatives sont des visuels clients réels, pas des placeholders.
