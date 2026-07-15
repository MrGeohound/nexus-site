// =============================================================================
// Checkout — camada entre a landing e a Sympla
// -----------------------------------------------------------------------------
// - Registra a oferta escolhida.
// - Dispara select_ticket + initiate_checkout.
// - Preserva/propaga UTMs para o link da Sympla.
// - Redireciona para o checkout correto (nova aba).
// NÃO dispara "purchase": clique não é compra (ver docs/INTEGRACOES-PENDENTES).
// =============================================================================

import { getOffer } from '../config/offers.js';
import { appendUtm, getAttribution } from './utm.js';
import { trackSelectTicket, trackInitiateCheckout } from './analytics.js';

const LAST_INTENT_KEY = 'nexus_last_checkout_intent';

/**
 * Inicia o checkout de uma oferta.
 * @param {string} offerId  'individual' | 'duplo'
 * @param {object} opts     { newTab = true }
 * @returns {string} URL final da Sympla (com UTMs)
 */
export function startCheckout(offerId, opts = {}) {
  const { newTab = true } = opts;
  const offer = getOffer(offerId);
  if (!offer) return null;

  // 1) eventos
  trackSelectTicket(offer);
  trackInitiateCheckout(offer);

  // 2) registra intenção localmente (para conciliação / recuperação)
  try {
    window.localStorage.setItem(
      LAST_INTENT_KEY,
      JSON.stringify({
        offer: offer.id,
        unit_value: offer.preco,
        quantity: offer.pessoas || 1,
        value: Number(offer.preco || 0) * Number(offer.pessoas || 1),
        ...getAttribution(),
        ts: new Date().toISOString(),
      }),
    );
  } catch {
    /* ignora */
  }

  // 3) URL final com UTMs preservados
  const url = appendUtm(offer.checkoutUrl);

  // 4) redireciona
  if (typeof window !== 'undefined') {
    if (newTab) window.open(url, '_blank', 'noopener,noreferrer');
    else window.location.href = url;
  }
  return url;
}

// Recupera a última intenção de checkout (para /obrigado, recuperação etc.).
export function getLastIntent() {
  try {
    const raw = window.localStorage.getItem(LAST_INTENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default { startCheckout, getLastIntent };
