/* ============================================================
   CRÉATIVES — boucle infinie des deux rails
   ============================================================ */
(() => {
  /* Le CSS translate la piste de -50%. Pour que la boucle soit
     invisible, la piste doit donc contenir exactement deux fois
     le même jeu de vignettes. On duplique ici plutôt qu'en HTML
     pour ne pas écrire deux fois le markup. */
  document.querySelectorAll('.rail__track, .ia__track').forEach(track => {
    track.innerHTML += track.innerHTML;
    // les clones sont décoratifs : on les retire de l'arbre d'accessibilité
    [...track.children].slice(track.children.length / 2)
      .forEach(el => el.setAttribute('aria-hidden', 'true'));
  });
})();
