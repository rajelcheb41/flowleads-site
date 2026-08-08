/* ============================================================
   COMPTEURS — utilitaire partagé (sections 5 et 6)
   Expose window.flCountUp(racine) : anime tous les [data-count]
   contenus dans la racine passée en argument.

   Attributs lus sur l'élément :
     data-count   valeur cible          946   |  42.1  |  1.72
     data-dec     décimales (0 par déf.)  0   |   1    |   2
     data-prefix  texte avant            ""   |  ""    |  ""
     data-suffix  texte après            ""   |  "K"   |  " $"
   ============================================================ */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const format = (value, dec) => value.toLocaleString('fr-FR', {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  });

  window.flCountUp = function (root) {
    root.querySelectorAll('[data-count]').forEach(el => {
      if (el.dataset.done) return;            // ne relance jamais deux fois
      el.dataset.done = '1';

      const target = parseFloat(el.dataset.count);
      const dec    = parseInt(el.dataset.dec || 0, 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const write  = v => el.textContent = prefix + format(v, dec) + suffix;

      if (reduce) { write(target); return; }

      const duration = 1400;
      const start = performance.now();

      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        // easeOutExpo : part vite, se pose en douceur
        write(target * (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
})();
