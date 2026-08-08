/* ============================================================
   META ADS — déclenche les compteurs KPI à l'arrivée
   ============================================================ */
(() => {
  const wrap = document.querySelector('.meta__kpis');
  if (!wrap || !window.flCountUp) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      setTimeout(() => window.flCountUp(wrap), 300);
      obs.disconnect();
    });
  }, { threshold: .4 });

  obs.observe(wrap);
})();
