/* ============================================================
   AVIS — boucle horizontale sur desktop, pile sur mobile
   ============================================================ */
(() => {
  const track = document.querySelector('.rv-track');
  if (!track) return;

  const original = track.innerHTML;
  const mq = matchMedia('(max-width: 820px)');

  /* En horizontal la piste doit contenir deux fois le même jeu
     (le CSS translate de -50%). En vertical, un seul, sinon la
     page afficherait chaque avis en double. */
  function sync() {
    track.innerHTML = mq.matches ? original : original + original;
    if (!mq.matches) {
      [...track.children].slice(track.children.length / 2)
        .forEach(el => el.setAttribute('aria-hidden', 'true'));
    }
  }

  sync();
  mq.addEventListener('change', sync);
})();
