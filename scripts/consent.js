/* ============================================================
   BANDEAU DE CONSENTEMENT — charge le Meta Pixel uniquement
   après accord explicite (RGPD). Choix mémorisé en localStorage.
   ============================================================ */
(() => {
  const KEY = 'fl_consent';
  const PIXEL_ID = '2184424598786607';

  function loadPixel() {
    if (window.fbq) return;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
    document.dispatchEvent(new CustomEvent('fl:pixel-ready'));
  }

  function showBanner() {
    if (document.getElementById('flConsent')) return;
    const bar = document.createElement('div');
    bar.id = 'flConsent';
    bar.className = 'fl-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Consentement aux cookies de mesure');
    bar.innerHTML =
      '<p>Nous utilisons un cookie de mesure (Meta Pixel) pour savoir si nos publicités fonctionnent. ' +
      'Vous pouvez refuser : le site fonctionne à l\'identique. ' +
      '<a href="#" data-modal="confidentialite">En savoir plus</a>.</p>' +
      '<div class="fl-consent__actions">' +
      '<button type="button" class="fl-consent__decline" data-consent="decline">Refuser</button>' +
      '<button type="button" class="fl-consent__accept" data-consent="accept">Accepter</button>' +
      '</div>';
    document.body.appendChild(bar);
    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-consent]');
      if (!btn) return;
      const choice = btn.dataset.consent;
      localStorage.setItem(KEY, choice);
      bar.remove();
      if (choice === 'accept') loadPixel();
    });
  }

  const saved = localStorage.getItem(KEY);
  if (saved === 'accept') {
    loadPixel();
  } else if (saved !== 'decline') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }

  // ré-ouvre le bandeau si l'utilisateur veut revenir sur son choix
  // depuis la politique de confidentialité (lien data-reopen-consent)
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-reopen-consent]')) {
      localStorage.removeItem(KEY);
      showBanner();
    }
  });
})();
