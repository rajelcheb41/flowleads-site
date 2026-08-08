/* ============================================================
   FAQ — accordéon accessible
   Une seule réponse ouverte à la fois.
   ============================================================ */
(() => {
  const items = [...document.querySelectorAll('.faq-item')];
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');

    btn.addEventListener('click', () => {
      const willOpen = !item.classList.contains('open');

      items.forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-a').setAttribute('aria-hidden', 'true');
      });

      if (willOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        ans.setAttribute('aria-hidden', 'false');
      }
    });
  });
})();
