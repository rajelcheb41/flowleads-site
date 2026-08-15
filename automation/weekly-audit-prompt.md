Tu es en exécution automatisée (tâche planifiée Windows hebdomadaire, personne ne surveille en direct). Objectif : ré-auditer le SEO technique/on-page de flowleads.agency, corriger automatiquement ce qui est sûr, signaler le reste sans y toucher.

Dossier de travail : `C:\Users\rayan\flowleads-lp-draft` (source réelle du site en ligne).

## Étapes

1. Récupère `https://flowleads.agency/sitemap.xml`, crawle chaque URL (curl suffit, pas besoin de navigateur).

2. Vérifie sur chaque page : longueur du `<title>` (≤ 60 caractères réels, en comptant `&amp;` comme `&`), longueur de la meta description (≤ 160 caractères), présence d'un canonical auto-référençant, cohérence title/og:title/twitter:title et description/og:description/twitter:description (attention : les tags `twitter:*` encodent parfois les apostrophes en `&#x27;` alors que `title`/`og:*` utilisent l'apostrophe brute — un remplacement naïf peut laisser le twitter tag désynchronisé, toujours vérifier après coup), présence d'alt text sur les images de contenu (pas les icônes décoratives), liens internes cassés (404), `Cache-Control` sur les assets statiques (`/assets/`, `/styles/`, `/scripts/` doivent avoir un `max-age` > 0, pas `max-age=0`).

3. Classe chaque finding :
   - **Sans risque, à corriger automatiquement** : longueur de title/meta description, alt text manquant, lien interne cassé vers une page qui existe ailleurs sur le site, `Cache-Control` manquant dans `vercel.json`, entrée sitemap manquante ou incorrecte.
   - **Risqué, ne JAMAIS corriger automatiquement** : tout ce qui change la mise en page visible, le design, le ton éditorial d'un texte existant, la structure d'une page, ou qui est ambigu.

4. Applique uniquement les corrections "sans risque". Déploie : `cd C:\Users\rayan\flowleads-lp-draft && vercel --prod --yes`. Vérifie ensuite via curl que le site répond toujours 200 sur la homepage et 2-3 pages au hasard.

5. Écris un rapport dans `C:\Users\rayan\flowleads-lp-draft\automation\logs\weekly-audit-{date-YYYY-MM-DD}.md` : score de santé approximatif, ce qui a été corrigé automatiquement, la liste des findings risqués laissés de côté (avec assez de détail pour qu'un humain puisse trancher plus tard). Ajoute aussi une ligne résumé dans `C:\Users\rayan\flowleads-lp-draft\automation\logs\weekly-audit.log` (append, pas de réécriture).

6. Si le déploiement ou une vérification post-déploiement échoue, n'insiste pas et ne tente rien d'autre — log l'échec clairement.

Ne fais rien d'autre que ce qui est décrit ci-dessus.
