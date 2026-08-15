// api/capi-event.js
// Relais serveur vers la Meta Conversions API (CAPI), en complément du Meta
// Pixel navigateur (scripts/pixel.js). Reçoit le même event_id que l'appel
// fbq() côté client pour que Meta déduplique les deux (1 seul événement compté).
//
// Variables d'environnement requises (configurées sur Vercel, pas ici) :
//   META_CAPI_ACCESS_TOKEN   (token système Meta, permission ads_management)
//   META_PIXEL_ID            (2184424598786607, même pixel que le navigateur)
//
// Appelé uniquement APRES consentement RGPD (scripts/pixel.js ne poste ici
// que si window.fbq existe déjà, donc si le bandeau a été accepté) — aucun
// événement serveur sans consentement, symétrique au pixel navigateur.

const GRAPH_VERSION = 'v21.0';
const ALLOWED_EVENTS = new Set(['Lead', 'Contact']);

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) return fwd.split(',')[0].trim();
  return req.socket && req.socket.remoteAddress;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' });
    return;
  }

  const { META_CAPI_ACCESS_TOKEN, META_PIXEL_ID } = process.env;
  if (!META_CAPI_ACCESS_TOKEN || !META_PIXEL_ID) {
    res.status(200).json({ ok: false, error: 'capi_not_configured' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  const eventName = body.eventName;
  if (!ALLOWED_EVENTS.has(eventName)) {
    res.status(400).json({ ok: false, error: 'invalid_event_name' });
    return;
  }

  const clientIp = getClientIp(req);
  const userAgent = req.headers['user-agent'] || '';
  if (!clientIp || !userAgent) {
    res.status(200).json({ ok: false, error: 'insufficient_client_data' });
    return;
  }

  const userData = {
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };
  if (body.fbp) userData.fbp = String(body.fbp);
  if (body.fbc) userData.fbc = String(body.fbc);

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId ? String(body.eventId) : undefined,
        action_source: 'website',
        event_source_url: body.eventSourceUrl ? String(body.eventSourceUrl) : undefined,
        user_data: userData,
      },
    ],
  };

  try {
    const resp = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(META_CAPI_ACCESS_TOKEN)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );
    const json = await resp.json().catch(() => ({}));
    res.status(200).json({ ok: resp.ok, meta: json });
  } catch (err) {
    res.status(200).json({ ok: false, error: 'fetch_failed' });
  }
};
