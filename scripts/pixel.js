/* ============================================================
   META PIXEL + GA4 + CAPI — events "Lead" (réservation) et
   "Contact" (WhatsApp). Le pixel n'est chargé qu'après consentement
   (scripts/consent.js) : on ne déclenche rien tant que window.fbq
   n'existe pas, donc rien avant acceptation du bandeau RGPD.

   Chaque clic génère un event_id partagé entre l'appel navigateur
   (fbq) et l'appel serveur (api/capi-event.js -> Meta Conversions
   API) pour que Meta déduplique les deux et ne compte qu'une fois.
   ============================================================ */
(() => {
  const GA4_EVENT_NAME = { Lead: 'generate_lead', Contact: 'contact' };

  function makeEventId() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'ev_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  }

  function readCookie(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : undefined;
  }

  function sendServerEvent(eventName, eventId) {
    const payload = JSON.stringify({
      eventName,
      eventId,
      eventSourceUrl: location.href,
      fbp: readCookie('_fbp'),
      fbc: readCookie('_fbc'),
    });
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/capi-event', new Blob([payload], { type: 'application/json' }));
    } else {
      fetch('/api/capi-event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
    }
  }

  function track(eventName) {
    if (typeof window.fbq !== 'function') return; // pas de consentement -> rien
    const eventId = makeEventId();
    window.fbq('track', eventName, {}, { eventID: eventId });
    if (typeof window.gtag === 'function') {
      window.gtag('event', GA4_EVENT_NAME[eventName] || eventName);
    }
    sendServerEvent(eventName, eventId);
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
