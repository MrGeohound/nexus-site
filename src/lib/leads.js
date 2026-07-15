// =============================================================================
// Serviço de leads / onboarding — adaptador com fallback
// -----------------------------------------------------------------------------
// - Se houver endpoint configurado (VITE_LEADS_ENDPOINT), envia via POST.
// - Sem entrega confirmada, guarda uma cópia local para recuperação, mas
//   retorna ok=false. A interface nunca deve mostrar um falso sucesso.
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

  if (LEADS.endpoint) {
    try {
      await post(LEADS.endpoint, payload);
      // Só conta Lead quando o backend confirma a entrega.
      track(EVENTS.LEAD, {
        origem: fields.origem || 'form',
        content_name: 'lead_nexus',
      });
      return { ok: true, mode: 'endpoint' };
    } catch {
      saveLocal('leads', payload);
      return { ok: false, mode: 'fallback' };
    }
  }
  saveLocal('leads', payload);
  return { ok: false, mode: 'local' };
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

  const endpoint = LEADS.onboardingEndpoint || LEADS.endpoint;
  if (endpoint) {
    try {
      await post(endpoint, payload);
      track(EVENTS.ONBOARDING_COMPLETE, { content_name: 'onboarding_nexus' });
      return { ok: true, mode: 'endpoint' };
    } catch {
      saveLocal('onboarding', payload);
      return { ok: false, mode: 'fallback' };
    }
  }
  saveLocal('onboarding', payload);
  return { ok: false, mode: 'local' };
}

export default { submitLead, submitOnboarding };
