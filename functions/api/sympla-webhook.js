// =============================================================================
// POST /api/sympla-webhook  (Cloudflare Pages Function)
// -----------------------------------------------------------------------------
// Recebe a notificação de PEDIDO APROVADO da Sympla — diretamente (se o plano
// oferecer webhook) ou via automação (Pluga / Zapier / Make) — e dispara o
// Purchase server-side na Conversions API do Meta.
//
// Segurança: exige o header "x-nexus-secret". O parâmetro ?secret= continua
// aceito apenas para compatibilidade com integrações existentes.
// Deduplicação: usa KV (binding NEXUS_KV) para não contar o mesmo pedido 2x.
// NUNCA dispara Purchase sem status aprovado.
//
// Secrets/vars necessárias (Cloudflare > Settings > Environment variables):
//   META_PIXEL_ID, META_CAPI_TOKEN, WEBHOOK_SECRET
//   (opcional) META_TEST_EVENT_CODE
// Binding KV: NEXUS_KV
// =============================================================================

import { sendPurchase, parseValor } from '../_shared/capi.js';

const APPROVED = new Set(['approved', 'aprovado', 'A', 'paid', 'confirmed', 'complete', 'completed']);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Extrai um pedido normalizado de payloads variados (Sympla / Pluga / Zapier).
function normalizeOrder(body) {
  const b = body || {};
  const o = b.order || b.data || b; // tolera aninhamento
  const buyer = o.buyer || o.comprador || o.customer || {};
  const id = o.id || o.order_id || o.orderId || o.transaction_id || o.identifier;
  const status = (o.order_status || o.status || o.situacao || '').toString();
  const email = o.email || buyer.email || o.buyer_email;
  const name = o.buyer_name || buyer.name || `${buyer.first_name || ''} ${buyer.last_name || ''}`.trim();
  const [firstName, ...rest] = (name || '').split(' ');
  const value = o.order_total_sale_price ?? o.total ?? o.amount ?? o.valor ?? o.value;

  return {
    orderId: id ? String(id) : null,
    status,
    value: parseValor(value),
    currency: o.currency || 'BRL',
    email,
    phone: o.phone || buyer.phone || o.telefone,
    firstName: firstName || undefined,
    lastName: rest.join(' ') || undefined,
    quantity: o.quantity || (Array.isArray(o.tickets) ? o.tickets.length : 1),
    eventTime:
      o.approved_at || o.payment_date || o.order_date || o.created_at || o.updated_at,
    eventSourceUrl: o.event_source_url || 'https://www.siganexus.com.br/',
    utm: o.utm || {
      source: o.utm_source, medium: o.utm_medium, campaign: o.utm_campaign,
      content: o.utm_content, term: o.utm_term,
    },
  };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 1) valida segredo
  const secret = url.searchParams.get('secret') || request.headers.get('x-nexus-secret');
  if (!env.WEBHOOK_SECRET || secret !== env.WEBHOOK_SECRET) {
    return json({ ok: false, error: 'unauthorized' }, 401);
  }

  // 2) parseia
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const order = normalizeOrder(body);
  if (!order.orderId) return json({ ok: false, error: 'missing_order_id' }, 422);

  // 3) só aprova pedido aprovado
  if (!APPROVED.has(order.status) && !APPROVED.has(order.status.toLowerCase())) {
    return json({ ok: true, ignored: true, reason: `status=${order.status}` });
  }

  // 4) deduplicação via KV
  if (env.NEXUS_KV) {
    const seen = await env.NEXUS_KV.get(`purchase:${order.orderId}`);
    if (seen) return json({ ok: true, duplicate: true, orderId: order.orderId });
  }

  // 5) dispara Purchase (CAPI)
  const result = await sendPurchase(env, order);

  // 6) marca como processado (TTL 60 dias)
  if (env.NEXUS_KV && result.ok) {
    await env.NEXUS_KV.put(`purchase:${order.orderId}`, new Date().toISOString(), {
      expirationTtl: 60 * 24 * 3600,
    });
  }

  return json({ ok: result.ok, orderId: order.orderId, capi: result });
}

// GET simples para healthcheck.
export async function onRequestGet() {
  return json({ ok: true, service: 'sympla-webhook', status: 'up' });
}
