// =============================================================================
// Serviço de leads / onboarding — adaptador com fallback
// -----------------------------------------------------------------------------
// - Se houver endpoint configurado (VITE_LEADS_ENDPOINT), envia via POST.
// - Sem endpoint: registra o evento em analytics e guarda localmente.
// - Nunca lança erro que quebre a UI: sempre retorna { ok, mode }.
// =============================================================================

import { LEADS } from '../config/site.js';
import { getAttribution } from './utm.js';
import { track, EVENTS } from './analytics.js';

function saveLocal(bucket, data) {
  try {
    const key = `nexus_${bucket}`;
    const arr = JSON.parse(window.localStorage.getItem(key) || '[]');
    arr.push(data);
    window.localStorage.setItem(key, JSON.stringify(arr));
  } catch {
    /* ignora */
  }
}

async function post(endpoint, payload) {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json().catch(() => ({}));
}

/**
 * Envia um lead (captura leve: nome, whatsapp, email, empresa, consentimento).
 */
export async function submitLead(fields = {}) {
  const payload = {
    tipo: 'lead',
    ...fields,
    ...getAttribution(),
    ts: new Date().toISOString(),
  };

  // Rastreia a conversão de lead (padroniza o funil).
  track(EVENTS.LEAD, {
    origem: fields.origem || 'form',
    content_name: 'lead_nexus',
  });

  if (LEADS.endpoint) {
    try {
      await post(LEADS.endpoint, payload);
      return { ok: true, mode: 'endpoint' };
    } catch {
      saveLocal('leads', payload);
      return { ok: true, mode: 'fallback' };
    }
  }
  saveLocal('leads', payload);
  return { ok: true, mode: 'local' };
}

/**
 * Envia dados de onboarding do participante (pós-compra).
 */
export async function submitOnboarding(fields = {}) {
  const payload = {
    tipo: 'onboarding',
    ...fields,
    ...getAttribution(),
    ts: new Date().toISOString(),
  };

  track(EVENTS.ONBOARDING_COMPLETE, { content_name: 'onboarding_nexus' });

  const endpoint = LEADS.onboardingEndpoint || LEADS.endpoint;
  if (endpoint) {
    try {
      await post(endpoint, payload);
      return { ok: true, mode: 'endpoint' };
    } catch {
      saveLocal('onboarding', payload);
      return { ok: true, mode: 'fallback' };
    }
  }
  saveLocal('onboarding', payload);
  return { ok: true, mode: 'local' };
}

export default { submitLead, submitOnboarding };
