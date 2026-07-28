// =============================================================================
// /api/galeria-leads  (Cloudflare Pages Function) — PROTEGIDO
// -----------------------------------------------------------------------------
// Lista os contatos capturados pelo gate da Galeria de vídeos
// (origem = "galeria-videos"): quem desbloqueou os downloads.
// Contém dados pessoais (WhatsApp/e-mail): exige token de administrador.
// Consumido pelo painel /painel-galeria.html.
//
// Segurança:
//   - Requer o segredo ADMIN_EXPORT_TOKEN (defina em Pages > Variáveis).
//   - Sem o segredo configurado, o endpoint fica DESLIGADO (503).
//   - Passe o token por header "x-admin-token" ou query "?token=...".
//
// Uso:
//   JSON:  /api/galeria-leads?token=SEU_TOKEN
//   CSV:   /api/galeria-leads?token=SEU_TOKEN&format=csv
//   Origem alternativa: &origem=form  (padrão = galeria-videos; "todos" = tudo)
// =============================================================================

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, x-admin-token',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...CORS },
  });
}

function csvCell(v) {
  const s = v == null ? '' : String(v);
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // 1) Endpoint desligado se não houver segredo configurado.
  const expected = env.ADMIN_EXPORT_TOKEN;
  if (!expected) return json({ ok: false, error: 'export_desligado_defina_ADMIN_EXPORT_TOKEN' }, 503);

  // 2) Autenticação.
  const provided = request.headers.get('x-admin-token') || url.searchParams.get('token') || '';
  if (provided !== expected) return json({ ok: false, error: 'nao_autorizado' }, 401);

  if (!env.NEXUS_KV) return json({ ok: false, error: 'kv_indisponivel' }, 500);

  const origemFiltro = (url.searchParams.get('origem') || 'galeria-videos').toLowerCase();
  const format = (url.searchParams.get('format') || 'json').toLowerCase();

  // 3) Varre todas as chaves "lead:" (paginado).
  const registros = [];
  let cursor;
  do {
    const page = await env.NEXUS_KV.list({ prefix: 'lead:', limit: 1000, cursor });
    for (const k of page.keys) {
      const v = await env.NEXUS_KV.get(k.name);
      if (!v) continue;
      try {
        const r = JSON.parse(v);
        const org = (r.origem || '').toLowerCase();
        if (origemFiltro === 'todos' || org === origemFiltro) registros.push(r);
      } catch { /* ignora */ }
    }
    cursor = page.list_complete ? null : page.cursor;
  } while (cursor);

  // 4) Dedupe por contato (e-mail/WhatsApp), mantendo o mais recente.
  const porContato = new Map();
  for (const r of registros) {
    const chave = (r.email || r.whatsapp || r.id || '').trim().toLowerCase();
    const anterior = porContato.get(chave);
    if (!anterior || new Date(r.received_at || r.ts || 0) > new Date(anterior.received_at || anterior.ts || 0)) {
      porContato.set(chave, r);
    }
  }
  const itens = [...porContato.values()].sort(
    (a, b) => new Date(b.received_at || b.ts || 0) - new Date(a.received_at || a.ts || 0),
  );

  const linhas = itens.map((r) => ({
    nome: (r.nome || '').trim(),
    whatsapp: (r.whatsapp || '').trim(),
    email: (r.email || '').trim(),
    origem: (r.origem || '').trim(),
    data: r.received_at || r.ts || '',
  }));

  // 5) Saída.
  if (format === 'csv') {
    const head = ['Nome', 'WhatsApp', 'E-mail', 'Origem', 'Data'];
    const body = linhas.map((l) => [l.nome, l.whatsapp, l.email, l.origem, l.data].map(csvCell).join(','));
    const csv = '﻿' + [head.join(','), ...body].join('\r\n');
    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="galeria-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  }

  return json({ ok: true, origem: origemFiltro, total: linhas.length, contatos: linhas });
}
