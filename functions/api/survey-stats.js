// =============================================================================
// /api/survey-stats  (Cloudflare Pages Function)
// -----------------------------------------------------------------------------
// GET público (CORS aberto) que devolve APENAS agregados da pesquisa de
// satisfação + depoimentos já autorizados para divulgação. Nunca expõe
// telefone/contato nem respostas sem consentimento. Serve o "painel vivo".
// Reaproveita o binding NEXUS_KV. Não requer segredo (dados não sensíveis).
// =============================================================================

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...CORS },
  });
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

// Marca linhas claramente de teste (não entram nas métricas).
function isTeste(r) {
  const n = (r.nome || '').trim().toLowerCase();
  const e = (r.empresa || '').trim().toLowerCase();
  const d = (r.depoimento || '').trim().toLowerCase();
  return n === 'teste' || e === 'teste' || d.includes('teste do caruso');
}

export async function onRequestGet(context) {
  const { env } = context;
  if (!env.NEXUS_KV) return json({ ok: false, error: 'kv_indisponivel' }, 500);

  const list = await env.NEXUS_KV.list({ prefix: 'survey:', limit: 1000 });
  const all = [];
  for (const k of list.keys) {
    const v = await env.NEXUS_KV.get(k.name);
    if (v) {
      try { all.push(JSON.parse(v)); } catch { /* ignora */ }
    }
  }

  const items = all.filter((r) => !isTeste(r));
  const total = items.length;

  const inc = (obj, key) => { const kk = key || '(sem resposta)'; obj[kk] = (obj[kk] || 0) + 1; };

  const notas = items.map((i) => Number(i.nota)).filter((n) => !Number.isNaN(n));
  const soma = notas.reduce((a, b) => a + b, 0);
  const media = notas.length ? Number((soma / notas.length).toFixed(2)) : null;

  const promotores = notas.filter((n) => n >= 9).length;
  const neutros = notas.filter((n) => n >= 7 && n <= 8).length;
  const detratores = notas.filter((n) => n <= 6).length;
  const nps = notas.length ? Math.round(((promotores - detratores) / notas.length) * 100) : null;

  const distribuicao = {};
  for (let n = 0; n <= 10; n++) distribuicao[n] = 0;
  notas.forEach((n) => { distribuicao[n] = (distribuicao[n] || 0) + 1; });

  const porCanal = {};
  const porConexao = {};
  const porProxima = {};
  items.forEach((i) => {
    inc(porCanal, (i.utm_source || '').trim() || 'direto');
    inc(porConexao, (i.conexao || '').trim());
    inc(porProxima, (i.proximaEdicao || '').trim());
  });

  // Só depoimentos com consentimento explícito de divulgação. Sem contato.
  const depoimentos = items
    .filter((i) => i.consentDepoimento && (i.depoimento || '').trim())
    .map((i) => ({
      nome: (i.nome || '').trim(),
      empresa: (i.empresa || '').trim(),
      depoimento: (i.depoimento || '').trim(),
      nota: Number(i.nota),
    }));

  // Sugestões de melhoria (anonimizadas — sem nome/empresa).
  const melhorias = items
    .filter((i) => (i.melhoria || '').trim())
    .map((i) => ({ melhoria: (i.melhoria || '').trim(), nota: Number(i.nota) }));

  const queremProxima = items.filter((i) => /sim/i.test(i.proximaEdicao || '')).length;

  return json({
    ok: true,
    atualizadoEm: new Date().toISOString(),
    total,
    media,
    nps,
    promotores,
    neutros,
    detratores,
    queremProxima,
    distribuicao,
    porCanal,
    porConexao,
    porProxima,
    depoimentos,
    melhorias,
  });
}
