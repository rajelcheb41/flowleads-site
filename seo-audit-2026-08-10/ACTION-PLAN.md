# Plan d'action SEO — flowleads.agency

## Phase 1 — Corrections critiques (faites dans cette session, 2026-08-10)
- [x] Ajouter des règles `Cache-Control` pour `/assets/*`, `/styles/*`, `/scripts/*` dans `vercel.json`.
- [x] Créer `llms.txt` à la racine.
- [x] Raccourcir les titles > 60 caractères et meta descriptions > 160 caractères (homepage + articles concernés).
- [x] Ajouter un alt descriptif à `phone-poolcenter.webp`.
- [x] Déployer en preview, vérifier visuellement, déployer en prod avec `vercel alias set`.

## Phase 2 — Gouvernance contenu (avant toute nouvelle publication)
- [ ] **Décision requise côté utilisateur** : parmi les 15 secteurs du backlog sans preuve portfolio confirmée (kiné, dentiste, coiffeur, immobilier, garage, institut beauté, avocat, expert-comptable, électricien, paysagiste, vétérinaire, photographe, agence voyage, cuisiniste), lesquels ont un vrai résultat client à montrer ? Sans preuve, ces pages doivent rester génériques (pas de screenshot de compte pub, pas de chiffre attribué) ou être reportées.
- [ ] En attendant cette clarification, seuls les articles génériques (8 articles "marketing TPE/PME" du backlog, sans preuve sectorielle requise) et les secteurs déjà prouvés (plombier-chauffagiste, éventuellement rénovation/BTP) sont candidats à la publication automatique.

## Phase 3 — Mesure (permet de savoir si le SEO progresse réellement)
- [ ] Partager la Search Console de `flowleads.agency` avec `claude-seo@gen-lang-client-0298118458.iam.gserviceaccount.com` (accès lecture suffit) — débloque le suivi réel des positions/clics/impressions.
- [ ] Décider si un GA4 doit être ajouté (actuellement seul le Pixel Meta est en place) — sans ça, impossible de distinguer le trafic organique du reste.
- [ ] Obtenir une clé `GOOGLE_API_KEY` (PageSpeed Insights + CrUX, gratuite) pour avoir de vraies données de performance au lieu d'estimations.

## Phase 4 — Optimisations moyennes (semaines 2-4)
- [ ] Regrouper/minifier les 17 CSS + 12 JS en un nombre réduit de fichiers.
- [ ] Étoffer les articles les plus courts (barbier, comment-remplir-planning-auto-ecole, comment-attirer-clients-opticien, comment-trouver-adherents-salle-de-sport, restaurant) à 900+ mots.
- [ ] Ajouter un schema `Service`/`Offer` (offre 500€/mois) et `BreadcrumbList` sur les articles de blog.

## Phase 5 — Amélioration continue (ongoing)
- [ ] Publier le backlog éditorial restant au rythme validé (une fois la gouvernance Phase 2 tranchée), en cochant `content-backlog.md` à chaque publication et en mettant à jour sitemap + blog/index.html + schema Blog à chaque fois (déjà la règle documentée dans le fichier).
- [ ] Ré-auditer le site à cadence régulière (proposé : hebdomadaire) pour suivre le score de santé et détecter les régressions (ex. piège d'alias Vercel déjà rencontré 3 fois sur ce projet).
