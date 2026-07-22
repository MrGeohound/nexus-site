// Envio da pesquisa de satisfação -> /api/survey (Cloudflare Function + KV).
// Sem backend (ex.: em dev), guarda localmente. Nunca quebra a UI.
import { getAttribution } from './utm.js';
import { track } from './analytics.js';

export async function submitSurvey(fields = {}) {
  const payload = { ...fields, ...getAttribution(), ts: new Date().toISOString() };

  track('survey_complete', {
    nps: fields.nota,
    consentimento: !!fields.consentDepoimento,
    conexao: fields.conexao || '',
  });

  try {
    const res = await fetch('/api/survey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('http ' + res.status);
    return { ok: true, mode: 'endpoint' };
  } catch {
    try {
      const k = 'nexus_surveys';
      const arr = JSON.parse(window.localStorage.getItem(k) || '[]');
      arr.push(payload);
      window.localStorage.setItem(k, JSON.stringify(arr));
    } catch {
      /* ignora */
    }
    return { ok: true, mode: 'local' };
  }
}

export default { submitSurvey };
