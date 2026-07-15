// =============================================================================
// Sympla Poller (Cloudflare Worker + Cron) — alternativa PULL
// -----------------------------------------------------------------------------
// Quando NÃO houver webhook/automação, este worker consulta a API da Sympla
// periodicamente, encontra pedidos APROVADOS novos e dispara Purchase (CAPI).
//
// Deduplicação: KV (NEXUS_KV) guarda os order_id já processados.
// Secrets/vars: SYMPLA_TOKEN, SYMPLA_EVENT_ID, META_PIXEL_ID, META_CAPI_TOKEN.
// Binding KV: NEXUS_KV. Agende via cron no wrangler.toml.
// =============================================================================

import { sendPurchase, parseValor } from '../../functions/_shared/capi.js';

const SYMPLA_API = 'https://api.sympla.com.br/public/v1.5.1';

async function fetchApprovedOrders(env) {
  // Doc: GET /events/{event_id}/orders — header s_token. Retorna data[] + pagination.
  const orders = [];
  let page = 1;
  for (let i = 0; i < 20; i++) {
    const url = `${SYMPLA_API}/events/${env.SYMPLA_EVENT_ID}/orders?page=${page}&page_size=100`;
    const res = await fetch(url, { headers: { s_token: env.SYMPLA_TOKEN } });
    if (!res.ok) break;
    const body = await res.json();
    const data = body.data || [];
    orders.push(...data);
    const pg = body.pagination || {};
    if (!pg.has_next && !(pg.total_page && page < pg.total_page)) break;
    page += 1;
  }
  return orders;
}

function isApproved(o) {
  const s = (o.order_status || o.status || '').toString().toUpperCase();
  return s === 'A' || s === 'APPROVED' || s === 'APROVADO';
}

async function processOrders(env) {
  const orders = await fetchApprovedOrders(env);
  let fired = 0, skipped = 0;
  for (const o of orders.filter(isApproved)) {
    const orderId = String(o.id || o.order_id || o.identifier);
    if (!orderId || orderId === 'undefined') continue;
    if (env.NEXUS_KV) {
      const seen = await env.NEXUS_KV.get(`purchase:${orderId}`);
      if (seen) { skipped++; continue; }
    }
    const buyer = o.buyer || {};
    const name = o.buyer_name || `${buyer.first_name || ''} ${buyer.last_name || ''}`.trim();
    const [firstName, ...rest] = (name || '').split(' ');
    const result = await sendPurchase(env, {
      orderId,
      value: parseValor(o.order_total_sale_price ?? o.total ?? o.amount),
      currency: 'BRL',
      email: o.email || buyer.email,
      phone: o.phone || buyer.phone,
      firstName: firstName || undefined,
      lastName: rest.join(' ') || undefined,
      quantity: o.quantity || 1,
      eventTime: o.approved_at || o.payment_date || o.order_date || o.created_at || o.updated_at,
      eventSourceUrl: 'https://www.siganexus.com.br/',
    });
    if (result.ok) {
      fired++;
      if (env.NEXUS_KV) await env.NEXUS_KV.put(`purchase:${orderId}`, new Date().toISOString(), { expirationTtl: 60 * 24 * 3600 });
    } else if (result.skipped && result.reason === 'event_time_older_than_7_days') {
      skipped++;
      if (env.NEXUS_KV) await env.NEXUS_KV.put(`purchase:${orderId}`, 'skipped_old_event', { expirationTtl: 60 * 24 * 3600 });
    }
  }
  return { total: orders.length, fired, skipped };
}

export default {
  // Execução agendada (cron)
  async scheduled(event, env, ctx) {
    ctx.waitUntil(processOrders(env));
  },
  // Execução manual via HTTP (para testar): GET /?key=SEGREDO
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.searchParams.get('key') !== env.WEBHOOK_SECRET) {
      return new Response('unauthorized', { status: 401 });
    }
    const r = await processOrders(env);
    return new Response(JSON.stringify(r), { headers: { 'Content-Type': 'application/json' } });
  },
};
