// =============================================================================
// GET /api/galeria-stats  (Cloudflare Pages Function) — PROTEGIDO
// -----------------------------------------------------------------------------
// Devolve as contagens de download por clipe (chave "galeria:dlcounts") para o
// painel. Exige o mesmo token de administrador do /api/galeria-leads.
//
// Uso: /api/galeria-stats?token=SEU_TOKEN
// =============================================================================

const COUNTS_KEY = 'galeria:dlcounts';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const expected = env.ADMIN_EXPORT_TOKEN;
  if (!expected) return json({ ok: false, error: 'export_desligado_defina_ADMIN_EXPORT_TOKEN' }, 503);

  const provided = request.headers.get('x-admin-token') || url.searchParams.get('token') || '';
  if (provided !== expected) return json({ ok: false, error: 'nao_autorizado' }, 401);

  if (!env.NEXUS_KV) return json({ ok: false, error: 'kv_indisponivel' }, 500);

  let counts = {};
  try {
    const raw = await env.NEXUS_KV.get(COUNTS_KEY);
    if (raw) counts = JSON.parse(raw);
  } catch { /* ignora */ }

  const porVideo = Object.entries(counts)
    .map(([id, count]) => ({ id, count: Number(count) || 0 }))
    .sort((a, b) => b.count - a.count);

  const totalDownloads = porVideo.reduce((s, v) => s + v.count, 0);
  const videosBaixados = porVideo.filter((v) => v.count > 0).length;

  return json({ ok: true, totalDownloads, videosBaixados, porVideo });
}
