/* ============================================================
   REVEAL — apparition au scroll
   Observe tout élément .reveal et lui ajoute .in une seule fois.
   Le décalage se règle en HTML : style="--rv:.16s"
   ============================================================ */
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Sans IntersectionObserver, on affiche tout d'emblée plutôt que de tout cacher.
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('in'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  }, { threshold: .14, rootMargin: '0px 0px -7% 0px' });

  els.forEach(el => obs.observe(el));
})();
