// =============================================================================
// POST /api/track-download  (Cloudflare Pages Function)
// -----------------------------------------------------------------------------
// Registra 1 download de um clipe da galeria. Chamado via navigator.sendBeacon
// no momento do download (não bloqueia a experiência). Guarda a contagem
// agregada em NEXUS_KV na chave "galeria:dlcounts" = { "<id>": <n>, ... }.
//
// Observação: a contagem é aproximada (KV não é transacional). Para o volume
// de um evento é mais que suficiente como indicador.
// =============================================================================

const COUNTS_KEY = 'galeria:dlcounts';

function noContent() {
  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!env.NEXUS_KV) return noContent(); // sem KV, não quebra o download

  let id = '';
  try {
    const body = await request.json();
    id = String(body?.id || '').trim();
  } catch { /* corpo inválido */ }

  // Aceita apenas o identificador numérico do clipe (ex.: "00605595").
  if (!/^\d{4,}$/.test(id)) return noContent();

  try {
    const raw = await env.NEXUS_KV.get(COUNTS_KEY);
    const counts = raw ? JSON.parse(raw) : {};
    counts[id] = (Number(counts[id]) || 0) + 1;
    await env.NEXUS_KV.put(COUNTS_KEY, JSON.stringify(counts));
  } catch { /* ignora falhas de contagem */ }

  return noContent();
}

export function onRequestGet() {
  return noContent();
}
