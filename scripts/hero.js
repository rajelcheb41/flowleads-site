/* ============================================================
   HERO — éventail de créatives, trait manuscrit, parallaxe
   ============================================================ */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fan    = document.getElementById('fan');
  const panel  = document.getElementById('hero');
  if (!fan || !panel) return;

  /* ---------- 1. éventail ----------
     Les cartes 0 et 5 sortent sous 640px : 5 vignettes lisibles
     valent mieux que 7 illisibles. La liste est volontairement
     explicite (et pas "les 5 premières") pour garder la clim. */
  const HIDE_ON_MOBILE = [0, 5];
  const all = [...fan.children];
  const mq  = matchMedia('(max-width: 640px)');

  function layoutFan() {
    const mobile = mq.matches;
    all.forEach((c, i) => {
      c.style.display = (mobile && HIDE_ON_MOBILE.includes(i)) ? 'none' : '';
    });

    const cards = all.filter(c => c.style.display !== 'none');
    const n     = cards.length;
    const boost = mobile ? 20 : 26;   // 2e et dernière carte surélevées

    cards.forEach((card, i) => {
      const offset = i - (n - 1) / 2;
      const rot    = offset * 5;                          // ouverture de l'éventail
      const arc    = Math.pow(Math.abs(offset), 2) * 3.2; // les bords retombent
      const lift   = arc - (i === 1 || i === n - 1 ? boost : 0);

      card.style.setProperty('--rest', `translateY(${lift}px) rotate(${rot}deg)`);
      card.style.setProperty('--d', `${0.14 + i * 0.06}s`);
      // la première carte VISIBLE annule la marge négative, sinon l'éventail se décale
      card.style.marginLeft = i === 0 ? '0' : '';
      card.style.zIndex = i + 1;
    });
  }
  layoutFan();
  mq.addEventListener('change', layoutFan);

  /* ---------- 2. trait manuscrit ----------
     On mesure la longueur réelle du tracé, puis on la "déroule". */
  const stroke = document.querySelector('.scribble path');
  if (stroke) {
    const len = stroke.getTotalLength();
    stroke.style.strokeDasharray  = len;
    stroke.style.strokeDashoffset = reduce ? 0 : len;

    if (!reduce) {
      setTimeout(() => {
        stroke.style.transition = 'stroke-dashoffset .95s cubic-bezier(.34,.02,.28,1)';
        stroke.style.strokeDashoffset = '0';
      }, 620);
    }
  }

  /* ---------- 3. déclenchement des animations d'entrée ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  }));

  /* ---------- 4. parallaxe de l'éventail ---------- */
  if (reduce) return;
  const wrap = document.querySelector('.fan-wrap');

  panel.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width  / 2)) / r.width;
    const y = (e.clientY - (r.top  + r.height / 2)) / r.height;
    fan.style.transform = `translateX(-50%) rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`;
  });

  panel.addEventListener('mouseleave', () => {
    fan.style.transform = 'translateX(-50%)';
  });
})();
