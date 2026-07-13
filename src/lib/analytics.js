// =============================================================================
// Camada central de analytics
// -----------------------------------------------------------------------------
// - Um único ponto para disparar eventos padronizados.
// - Funciona mesmo SEM provedores configurados (no-op + debug no console).
// - Encaminha para: dataLayer (GTM), gtag (GA4) e fbq (Meta Pixel) se existirem.
// - Nunca dispara "purchase" sem confirmação confiável (ver docs).
// =============================================================================

import { ANALYTICS } from '../config/site.js';
import { getAttribution } from './utm.js';

// Eventos padronizados do funil.
export const EVENTS = {
  PAGE_VIEW: 'page_view',
  VIEW_EVENT: 'view_event',
  SCROLL_25: 'scroll_25',
  SCROLL_50: 'scroll_50',
  SCROLL_75: 'scroll_75',
  SCROLL_90: 'scroll_90',
  CLICK_PRIMARY_CTA: 'click_primary_cta',
  CLICK_SECONDARY_CTA: 'click_secondary_cta',
  VIEW_PRICING: 'view_pricing',
  SELECT_TICKET: 'select_ticket',
  INITIATE_CHECKOUT: 'initiate_checkout',
  LEAD: 'lead',
  WHATSAPP_CLICK: 'whatsapp_click',
  FAQ_OPEN: 'faq_open',
  SHARE_EVENT: 'share_event',
  ONBOARDING_START: 'onboarding_start',
  ONBOARDING_COMPLETE: 'onboarding_complete',
  ADD_TO_CALENDAR: 'add_to_calendar',
  PURCHASE: 'purchase', // somente com confirmação confiável
};

// Mapeia eventos internos -> eventos padrão do Meta Pixel.
const META_MAP = {
  view_event: 'ViewContent',
  view_pricing: 'ViewContent',
  select_ticket: 'AddToCart',
  initiate_checkout: 'InitiateCheckout',
  lead: 'Lead',
  purchase: 'Purchase',
};

function base() {
  if (typeof window === 'undefined') return {};
  const attr = getAttribution();
  return {
    source: attr.utm_source || '',
    medium: attr.utm_medium || '',
    campaign: attr.utm_campaign || '',
    content: attr.utm_content || '',
    term: attr.utm_term || '',
    referrer: attr.referrer || '',
    landing_page: attr.landing_page || '',
    session_id: attr.session_id || '',
    device:
      window.innerWidth < 768
        ? 'mobile'
        : window.innerWidth < 1024
          ? 'tablet'
          : 'desktop',
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    timestamp: new Date().toISOString(),
    page_path: window.location.pathname,
  };
}

// Simples UUID para deduplicação (event_id) com CAPI, se implementado depois.
function eventId() {
  return (
    'evt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

/**
 * Dispara um evento padronizado para todos os provedores disponíveis.
 * @param {string} name  Nome do evento (use EVENTS.*)
 * @param {object} params Parâmetros adicionais
 */
export function track(name, params = {}) {
  if (typeof window === 'undefined') return;
  const payload = { ...base(), ...params, event_id: params.event_id || eventId() };

  // 1) dataLayer (GTM)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });

  // 2) GA4 (gtag)
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, payload);
  }

  // 3) Meta Pixel (fbq)
  if (typeof window.fbq === 'function') {
    const metaName = META_MAP[name];
    const metaParams = {};
    if (payload.ticket_value != null) metaParams.value = payload.ticket_value;
    if (payload.value != null) metaParams.value = payload.value;
    if (metaParams.value != null) metaParams.currency = payload.currency || 'BRL';
    if (payload.content_name) metaParams.content_name = payload.content_name;

    if (metaName) {
      window.fbq('track', metaName, metaParams, { eventID: payload.event_id });
    } else {
      window.fbq('trackCustom', name, metaParams, { eventID: payload.event_id });
    }
  }

  // 4) Debug
  if (ANALYTICS.debug) {
    // eslint-disable-next-line no-console
    console.log('%c[analytics]', 'color:#C8A96A', name, payload);
  }
}

// Atalhos usados no funil.
export const trackPageView = (extra) =>
  track(EVENTS.PAGE_VIEW, { ...extra });

export const trackViewEvent = () => track(EVENTS.VIEW_EVENT);

export const trackSelectTicket = (offer) =>
  track(EVENTS.SELECT_TICKET, {
    ticket_type: offer?.id,
    content_name: offer?.nome,
    ticket_value: offer?.preco,
    currency: 'BRL',
  });

export const trackInitiateCheckout = (offer) =>
  track(EVENTS.INITIATE_CHECKOUT, {
    ticket_type: offer?.id,
    content_name: offer?.nome,
    ticket_value: offer?.preco,
    currency: 'BRL',
  });

export const trackLead = (extra) => track(EVENTS.LEAD, extra);
export const trackWhatsappClick = (origem) =>
  track(EVENTS.WHATSAPP_CLICK, { origem });
export const trackShare = (canal) => track(EVENTS.SHARE_EVENT, { canal });

export default { track, EVENTS, trackPageView, trackSelectTicket, trackInitiateCheckout };
