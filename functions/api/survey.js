// =============================================================================
// /api/survey  (Cloudflare Pages Function)
// -----------------------------------------------------------------------------
// POST  -> recebe uma resposta da pesquisa de satisfação e guarda no KV (NEXUS_KV).
// GET   -> lista as respostas para curadoria/export (protegido por ?secret=WEBHOOK_SECRET).
//          ?format=csv devolve CSV; padrão é JSON.
// Reaproveita o binding NEXUS_KV e o WEBHOOK_SECRET já configurados.
// =============================================================================

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

  // Validação mínima: precisa de uma nota (NPS 0-10).
  const nota = Number(body.nota);
  if (Number.isNaN(nota) || nota < 0 || nota > 10) {
    return json({ ok: false, error: 'nota_invalida' }, 422);
  }

  const record = {
    nota,
    marcou: body.marcou || [],
    conexao: body.conexao || '',
    depoimento: (body.depoimento || '').toString().slice(0, 600),
    nome: (body.nome || '').toString().slice(0, 120),
    empresa: (body.empresa || '').toString().slice(0, 160),
    whatsapp: (body.whatsapp || '').toString().slice(0, 40),
    instagram: (body.instagram || '').toString().slice(0, 120),
    linkedin: (body.linkedin || '').toString().slice(0, 200),
    consentDepoimento: !!body.consentDepoimento,
    consentFoto: !!body.consentFoto,
    melhoria: (body.melhoria || '').toString().slice(0, 600),
    proximaEdicao: body.proximaEdicao || '',
    utm_source: body.utm_source || '',
    utm_medium: body.utm_medium || '',
    utm_campaign: body.utm_campaign || '',
    session_id: body.session_id || '',
    ts: new Date().toISOString(),
  };

  if (!env.NEXUS_KV) {
    return json({ ok: false, error: 'kv_indisponivel' }, 500);
  }
  const key = `survey:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  // TTL de 1 ano (tempo de sobra para curar antes da próxima edição).
  await env.NEXUS_KV.put(key, JSON.stringify(record), { expirationTtl: 365 * 24 * 3600 });

  return json({ ok: true });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret') || request.headers.get('x-nexus-secret');
  if (!env.WEBHOOK_SECRET || secret !== env.WEBHOOK_SECRET) {
    return json({ ok: false, error: 'unauthorized' }, 401);
  }
  if (!env.NEXUS_KV) return json({ ok: false, error: 'kv_indisponivel' }, 500);

  const list = await env.NEXUS_KV.list({ prefix: 'survey:', limit: 1000 });
  const items = [];
  for (const k of list.keys) {
    const v = await env.NEXUS_KV.get(k.name);
    if (v) items.push(JSON.parse(v));
  }
  items.sort((a, b) => (a.ts < b.ts ? 1 : -1));

  if (url.searchParams.get('format') === 'csv') {
    const cols = ['ts', 'nota', 'conexao', 'depoimento', 'nome', 'empresa', 'whatsapp', 'instagram', 'linkedin', 'consentDepoimento', 'consentFoto', 'melhoria', 'proximaEdicao', 'utm_source', 'utm_campaign'];
    const esc = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
    const rows = [cols.join(',')].concat(items.map((it) => cols.map((c) => esc(Array.isArray(it[c]) ? it[c].join('|') : it[c])).join(',')));
    return new Response(rows.join('\n'), {
      headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="nexus-avaliacoes.csv"' },
    });
  }

  const nps = items.length
    ? Math.round(((items.filter((i) => i.nota >= 9).length - items.filter((i) => i.nota <= 6).length) / items.length) * 100)
    : null;
  return json({ ok: true, total: items.length, nps, respostas: items });
}
