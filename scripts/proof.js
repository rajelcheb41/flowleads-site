/* ============================================================
   PREUVES — géométrie de l'éventail + compteurs chiffrés
   ============================================================ */
(() => {
  const stage = document.querySelector('.proof__stage');
  const fan   = document.getElementById('proofFan');
  if (!stage || !fan) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mq     = matchMedia('(max-width: 900px)');
  const cards  = [...fan.children];

  /* ---------- 1. éventail ----------
     Sous 900px le CSS bascule en carrousel : on retire les transforms
     inline, sinon elles resteraient collées aux cartes. */
  function layout() {
    if (mq.matches) {
      cards.forEach(c => { c.style.removeProperty('--rest'); c.style.zIndex = ''; });
      return;
    }
    const n = cards.length;
    cards.forEach((card, i) => {
      const offset = i - (n - 1) / 2;
      const rot    = offset * 4.2;
      const arc    = Math.pow(Math.abs(offset), 2) * 2.6;   // les bords retombent
      card.style.setProperty('--rest', `translateY(${arc}px) rotate(${rot}deg)`);
      card.style.setProperty('--d', `${0.1 + i * 0.075}s`);
      card.style.zIndex = i + 1;
    });
  }
  layout();
  mq.addEventListener('change', layout);

  /* ---------- 3. déclenchement ----------
     .in sur le conteneur pilote le dépliage ; les compteurs partent
     un peu après pour ne pas concurrencer le mouvement des cartes. */
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      stage.classList.add('in');
      setTimeout(() => window.flCountUp(fan), mq.matches ? 150 : 550);
      obs.disconnect();
    });
  }, { threshold: .2 });

  obs.observe(stage);
})();
