Tu es en exécution automatisée (tâche planifiée Windows quotidienne, personne ne surveille en direct). Objectif : publier UN article du backlog éditorial de flowleads.agency, le déployer en prod directement, puis vérifier que rien n'est cassé.

Dossier de travail : `C:\Users\rayan\flowleads-lp-draft` (source réelle du site en ligne, vérifiée le 2026-08-10 — ne PAS utiliser `flowleads-lp-final-new`, obsolète).

## Étapes

1. Ouvre `C:\Users\rayan\flowleads-lp-draft\content-backlog.md`. Prends la première ligne non cochée (`- [ ]`) dans l'ordre du fichier. Si toutes les lignes sont cochées, ne fais rien et écris juste une ligne dans le log expliquant que le backlog est vide, puis arrête-toi.

2. **Garde-fou éditorial obligatoire** (confirmé par l'utilisateur le 2026-08-10, ne jamais l'ignorer) : les secteurs suivants n'ont AUCUNE preuve portfolio réelle chez Flowleads — kinésithérapeute, dentiste, coiffeur, agence immobilière, garage automobile, institut de beauté, avocat, expert-comptable, électricien, paysagiste, vétérinaire, photographe, agence de voyage locale, cuisiniste (et leurs pages compagnons "comment trouver des clients pour {métier}"). Pour ces secteurs : contenu 100% conseil générique, **jamais** de capture d'écran de compte publicitaire, jamais de chiffre ou résultat attribué à Flowleads pour ce métier précis, jamais d'histoire de client inventée. Les secteurs déjà prouvés (déménagement, salle de sport, opticien, restaurant, barbier, auto-école, plomberie/chauffagiste, rénovation/BTP) et les 8 articles génériques "marketing TPE/PME" n'ont pas cette restriction.

3. Écris l'article dans `C:\Users\rayan\flowleads-lp-draft\blog\{slug}.html`, en copiant exactement la structure HTML d'un article déjà publié du même type (head : `<title>` ≤ 60 caractères, `meta description` ≤ 155 caractères, canonical, Open Graph + Twitter Card identiques entre eux). Utilise le mot-clé cible donné dans la ligne du backlog. Contenu : 900-1500 mots, ton honnête (pas de superlatifs non prouvés), cohérent avec le reste du blog. **Piège déjà rencontré (2026-08-10) : le schema JSON-LD `Article` (champs `headline` et `description`) doit reprendre MOT POUR MOT le `<title>` et la `meta description` déjà écrits à l'étape ci-dessus — ne jamais copier un ancien gabarit d'article qui utiliserait une version plus longue/différente de ces deux champs.**

4. Ajoute la nouvelle URL dans `sitemap.xml` (même format que les entrées existantes) et un lien vers le nouvel article dans la grille de `blog/index.html`.

5. Coche la ligne correspondante dans `content-backlog.md` (`- [ ]` → `- [x]`).

6. Déploie en prod : `cd C:\Users\rayan\flowleads-lp-draft && vercel --prod --yes`.

7. Vérifie via `curl` que la nouvelle page répond 200 sur `https://flowleads.agency/blog/{slug}.html`, que le sitemap contient bien la nouvelle URL, et que la homepage répond toujours 200. Si une vérification échoue, ne fais rien de plus (ne retente pas de déploiement, n'improvise pas de fix) — écris clairement l'échec dans le log.

8. Écris un résumé (2-3 lignes : slug publié, statut du déploiement, résultat des vérifications) dans `C:\Users\rayan\flowleads-lp-draft\automation\logs\daily-publish.log` (ajoute une ligne horodatée, ne réécris pas le fichier).

Ne fais rien d'autre que ce qui est décrit ci-dessus. Pas de refonte, pas de modification d'autres pages, pas de nettoyage "pendant que tu y es".
