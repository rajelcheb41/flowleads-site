/* ============================================================
   MODALES LÉGALES — ouverture depuis tout [data-modal]
   Le contenu vit dans <template id="legal-XXX">, cloné à l'ouverture.
   ============================================================ */
(() => {
  const modal = document.getElementById('legalModal');
  const body  = document.getElementById('legalModalBody');
  if (!modal || !body) return;

  let lastFocus = null;

  function open(key) {
    const tpl = document.getElementById('legal-' + key);
    if (!tpl) return;
    body.innerHTML = '';
    body.appendChild(tpl.content.cloneNode(true));
    modal.classList.add('open');
    document.body.classList.add('lmodal-open');
    modal.querySelector('.lmodal__panel').scrollTop = 0;
    modal.scrollTop = 0;
    lastFocus = document.activeElement;
    modal.querySelector('.lmodal__close').focus();
  }

  function close() {
    modal.classList.remove('open');
    document.body.classList.remove('lmodal-open');
    if (lastFocus) lastFocus.focus();
  }

  // ouverture : tout élément avec data-modal (footer, liens internes des textes)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal]');
    if (trigger) {
      e.preventDefault();
      open(trigger.getAttribute('data-modal'));
      return;
    }
    if (e.target.closest('[data-close]')) {
      e.preventDefault();
      close();
    }
  });

  // Échap ferme
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });
})();
