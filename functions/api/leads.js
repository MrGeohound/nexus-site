// =============================================================================
// POST /api/leads (Cloudflare Pages Function)
// -----------------------------------------------------------------------------
// Recebe leads e perfis de onboarding do site. Persiste no KV NEXUS_KV e,
// opcionalmente, encaminha para um webhook de CRM/automação.
//
// Bindings opcionais:
//   NEXUS_KV            -> armazenamento e rate limit
//   LEADS_WEBHOOK_URL   -> Make/Zapier/CRM (Secret)
//   LEADS_WEBHOOK_SECRET -> enviado no header x-nexus-secret (Secret)
//
// Pelo menos NEXUS_KV ou LEADS_WEBHOOK_URL deve existir. Sem destino confiável,
// o endpoint retorna 503 e a interface não mostra um falso sucesso.
// =============================================================================

const MAX_BODY_BYTES = 16_000;
const MAX_PER_MINUTE = 5;
const RETENTION_SECONDS = 90 * 24 * 60 * 60;
const ALLOWED_TYPES = new Set(['lead', 'onboarding']);

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

function clean(value, max = 300) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function normalize(body) {
  const type = ALLOWED_TYPES.has(body?.tipo) ? body.tipo : 'lead';
  const record = {
    id: crypto.randomUUID(),
    tipo: type,
    nome: clean(body?.nome, 120),
    whatsapp: clean(body?.whatsapp, 40),
    email: clean(body?.email, 160),
    empresa: clean(body?.empresa, 160),
    cargo: clean(body?.cargo, 160),
    oferece: clean(body?.oferece, 700),
    procura: clean(body?.procura, 700),
    conhecer: clean(body?.conhecer, 700),
    instagram: clean(body?.instagram, 160),
    linkedin: clean(body?.linkedin, 240),
    acessibilidade: clean(body?.acessibilidade, 300),
    restricoes: clean(body?.restricoes, 300),
    consent: body?.consent === true,
    origem: clean(body?.origem, 120),
    utm_source: clean(body?.utm_source, 160),
    utm_medium: clean(body?.utm_medium, 160),
    utm_campaign: clean(body?.utm_campaign, 240),
    utm_content: clean(body?.utm_content, 240),
    utm_term: clean(body?.utm_term, 240),
    ref: clean(body?.ref, 160),
    session_id: clean(body?.session_id, 120),
    received_at: new Date().toISOString(),
  };
  return record;
}

async function enforceRateLimit(request, env) {
  if (!env.NEXUS_KV) return true;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const minute = Math.floor(Date.now() / 60_000);
  const key = `lead-rate:${ip}:${minute}`;
  const current = Number((await env.NEXUS_KV.get(key)) || 0);
  if (current >= MAX_PER_MINUTE) return false;
  await env.NEXUS_KV.put(key, String(current + 1), { expirationTtl: 120 });
  return true;
}

async function forwardToWebhook(record, env) {
  if (!env.LEADS_WEBHOOK_URL) return false;
  const headers = { 'Content-Type': 'application/json' };
  if (env.LEADS_WEBHOOK_SECRET) {
    headers['x-nexus-secret'] = env.LEADS_WEBHOOK_SECRET;
  }
  const response = await fetch(env.LEADS_WEBHOOK_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(record),
  });
  if (!response.ok) throw new Error(`lead_webhook_http_${response.status}`);
  return true;
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const declaredSize = Number(request.headers.get('Content-Length') || 0);
  if (declaredSize > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'payload_too_large' }, 413);
  }

  if (!env.NEXUS_KV && !env.LEADS_WEBHOOK_URL) {
    return json({ ok: false, error: 'lead_destination_not_configured' }, 503);
  }

  if (!(await enforceRateLimit(request, env))) {
    return json({ ok: false, error: 'rate_limited' }, 429);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return json({ ok: false, error: 'payload_too_large' }, 413);
    }
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  const record = normalize(body);
  const hasContact = record.email || record.whatsapp;
  if (!record.nome || !hasContact || !record.consent) {
    return json({ ok: false, error: 'missing_required_fields' }, 422);
  }

  let stored = false;
  let forwarded = false;
  if (env.NEXUS_KV) {
    const key = `${record.tipo}:${Date.now()}:${record.id}`;
    await env.NEXUS_KV.put(key, JSON.stringify(record), {
      expirationTtl: RETENTION_SECONDS,
    });
    stored = true;
  }

  try {
    forwarded = await forwardToWebhook(record, env);
  } catch (error) {
    if (!stored) {
      return json({ ok: false, error: error.message }, 502);
    }
  }

  return json({ ok: true, id: record.id, stored, forwarded });
}

export async function onRequestGet() {
  return json({ ok: true, service: 'leads', status: 'up' });
}
