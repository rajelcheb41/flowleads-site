/* ============================================================
   CAMPAGNES EN DÉTAIL — déclenche les compteurs carte par carte
   ============================================================ */
(() => {
  // les cartes détaillées ET le bandeau de KPI Meta partagent ce déclencheur
  const targets = document.querySelectorAll('.case, .meta__kpis');
  if (!targets.length || !window.flCountUp) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      // léger décalage : la carte finit de monter avant que les chiffres partent
      setTimeout(() => window.flCountUp(e.target), 320);
      obs.unobserve(e.target);
    });
  }, { threshold: .3 });

  targets.forEach(t => obs.observe(t));
})();
