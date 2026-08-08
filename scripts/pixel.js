/* ============================================================
   META PIXEL — events "Lead" (réservation) et "Contact" (WhatsApp)
   Le pixel n'est chargé qu'après consentement (scripts/consent.js) :
   on écoute fl:pixel-ready pour rester valable même si l'utilisateur
   clique avant d'avoir accepté le bandeau.
   ============================================================ */
(() => {
  function track(eventName) {
    if (typeof window.fbq === 'function') window.fbq('track', eventName);
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href*="cal.eu/flowlead"]')) {
      track('Lead');
      return;
    }
    if (e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]')) {
      track('Contact');
    }
  });
})();
