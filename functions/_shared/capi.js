// =============================================================================
// Meta Conversions API (CAPI) — envio server-side do evento Purchase
// -----------------------------------------------------------------------------
// Usado tanto pelo webhook (push) quanto pelo poller (pull).
// Requer: META_PIXEL_ID e META_CAPI_TOKEN (secrets no ambiente).
// Compatível com Cloudflare Workers/Pages Functions (Web Crypto).
// =============================================================================

// Versão vigente da Graph API na revisão de julho/2026.
const GRAPH_VERSION = 'v25.0';
const MAX_EVENT_AGE_SECONDS = 7 * 24 * 60 * 60;

// SHA-256 em hex de um valor normalizado (Meta exige PII com hash).
async function sha256(value) {
  if (!value) return undefined;
  const norm = String(value).trim().toLowerCase();
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(norm));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Telefone: só dígitos, com DDI (não remove o país).
async function sha256Phone(phone) {
  if (!phone) return undefined;
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return undefined;
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(digits));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Envia um evento Purchase para a CAPI do Meta.
 * @param {object} env  { META_PIXEL_ID, META_CAPI_TOKEN, META_TEST_EVENT_CODE? }
 * @param {object} order Dados normalizados do pedido.
 *   { orderId, value, currency='BRL', email, phone, firstName, lastName,
 *     quantity, eventTime, eventSourceUrl, clientIp, userAgent, fbp, fbc,
 *     utm:{source,medium,campaign,content,term} }
 */
export async function sendPurchase(env, order) {
  if (!env.META_PIXEL_ID || !env.META_CAPI_TOKEN) {
    return { ok: false, skipped: true, reason: 'missing_meta_credentials' };
  }

  const now = Math.floor(Date.now() / 1000);
  let actualEventTime = now;
  if (order.eventTime) {
    const raw = Number(order.eventTime);
    const parsed = Number.isFinite(raw)
      ? raw > 1_000_000_000_000
        ? Math.floor(raw / 1000)
        : Math.floor(raw)
      : Math.floor(Date.parse(order.eventTime) / 1000);
    if (Number.isFinite(parsed) && parsed > 0 && parsed <= now + 60) {
      actualEventTime = parsed;
    }
  }
  if (now - actualEventTime > MAX_EVENT_AGE_SECONDS) {
    return { ok: false, skipped: true, reason: 'event_time_older_than_7_days' };
  }

  const userData = {
    em: [await sha256(order.email)].filter(Boolean),
    ph: [await sha256Phone(order.phone)].filter(Boolean),
    fn: order.firstName ? [await sha256(order.firstName)] : undefined,
    ln: order.lastName ? [await sha256(order.lastName)] : undefined,
    client_ip_address: order.clientIp || undefined,
    client_user_agent: order.userAgent || undefined,
    fbp: order.fbp || undefined,
    fbc: order.fbc || undefined,
  };
  Object.keys(userData).forEach((k) => {
    if (userData[k] == null || (Array.isArray(userData[k]) && userData[k].length === 0)) delete userData[k];
  });

  const customData = {
    currency: order.currency || 'BRL',
    value: Number(order.value) || 0,
    num_items: order.quantity || 1,
    order_id: order.orderId,
  };
  if (order.utm) {
    if (order.utm.source) customData.utm_source = order.utm.source;
    if (order.utm.medium) customData.utm_medium = order.utm.medium;
    if (order.utm.campaign) customData.utm_campaign = order.utm.campaign;
    if (order.utm.content) customData.utm_content = order.utm.content;
    if (order.utm.term) customData.utm_term = order.utm.term;
  }

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: actualEventTime,
        action_source: 'website',
        event_source_url: order.eventSourceUrl || 'https://www.siganexus.com.br/',
        // event_id = orderId garante DEDUPLICAÇÃO (mesmo id nunca conta 2x).
        event_id: `purchase_${order.orderId}`,
        user_data: userData,
        custom_data: customData,
      },
    ],
  };
  if (env.META_TEST_EVENT_CODE) payload.test_event_code = env.META_TEST_EVENT_CODE;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${env.META_PIXEL_ID}/events?access_token=${env.META_CAPI_TOKEN}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}

// Normaliza o valor "R$ 1.234,56" ou "1234.56" para número.
export function parseValor(v) {
  if (typeof v === 'number') return v;
  if (!v) return 0;
  const s = String(v).replace(/[^\d,.-]/g, '');
  // se tiver vírgula como decimal (padrão BR)
  if (/,\d{2}$/.test(s)) return parseFloat(s.replace(/\./g, '').replace(',', '.')) || 0;
  return parseFloat(s) || 0;
}
