/* ============================================================
   NAV — menu hamburger mobile
   ============================================================ */
(() => {
  const burger = document.querySelector('.nav__burger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  function set(open) {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.classList.toggle('nav-open', open);
  }

  burger.addEventListener('click', () => set(!menu.classList.contains('open')));

  // fermer en cliquant un lien ou le fond
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.navmenu__link') || e.target.closest('[data-close-menu]') || e.target === menu) set(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) set(false);
  });
})();
