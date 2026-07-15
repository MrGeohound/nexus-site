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
  select_ticket: 'AddToCart',
  initiate_checkout: 'InitiateCheckout',
  lead: 'Lead',
  purchase: 'Purchase',
};

// Eventos de conversão que acontecem antes da decisão do banner ficam apenas
// em memória. Se o visitante aceitar os cookies, são enviados na mesma sessão;
// se recusar, são descartados. Nada é persistido no navegador.
const pendingMetaEvents = [];
const META_QUEUE_LIMIT = 20;

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

function metaParams(payload) {
  const params = {};
  const value = payload.ticket_value ?? payload.value;
  const quantity = Number(payload.quantity || payload.num_items || 1);
  const unitValue = Number(payload.unit_value ?? value ?? 0);

  if (value != null) {
    params.value = Number(value);
    params.currency = payload.currency || 'BRL';
  }
  if (payload.content_name) params.content_name = payload.content_name;
  if (payload.content_category) {
    params.content_category = payload.content_category;
  }
  if (payload.ticket_type) {
    params.content_ids = [payload.ticket_type];
    params.content_type = 'product';
    params.num_items = quantity;
    params.contents = [
      {
        id: payload.ticket_type,
        quantity,
        item_price: unitValue,
      },
    ];
  }
  return params;
}

function sendMetaEvent({ name, params, eventID, custom = false }) {
  if (typeof window.fbq !== 'function') return false;
  window.fbq(custom ? 'trackCustom' : 'track', name, params, { eventID });
  return true;
}

function shouldQueueMeta() {
  return window.__NEXUS_MARKETING_CONSENT__ !== false;
}

export function flushPendingMetaEvents() {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return 0;
  const queued = pendingMetaEvents.splice(0, pendingMetaEvents.length);
  queued.forEach(sendMetaEvent);
  return queued.length;
}

export function clearPendingMetaEvents() {
  pendingMetaEvents.splice(0, pendingMetaEvents.length);
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
  const metaName = META_MAP[name];
  const metaEvent = {
    name: metaName || name,
    params: metaParams(payload),
    eventID: payload.event_id,
    custom: !metaName,
  };

  if (typeof window.fbq === 'function') {
    sendMetaEvent(metaEvent);
  } else if (metaName && shouldQueueMeta()) {
    // Só eventos padrão do funil são recuperados após o aceite. Eventos de
    // navegação/engajamento continuam disponíveis no dataLayer/GA4.
    pendingMetaEvents.push(metaEvent);
    if (pendingMetaEvents.length > META_QUEUE_LIMIT) pendingMetaEvents.shift();
  }

  // 4) Debug
  if (ANALYTICS.debug) {
    console.log('%c[analytics]', 'color:#C8A96A', name, payload);
  }
}

// Atalhos usados no funil.
export const trackPageView = (extra) =>
  track(EVENTS.PAGE_VIEW, { ...extra });

export const trackViewEvent = () =>
  track(EVENTS.VIEW_EVENT, {
    content_name: 'NEXUS — Conexão de Verdade',
    content_category: 'Evento empresarial',
  });

const offerTotal = (offer) =>
  Number(offer?.preco || 0) * Number(offer?.pessoas || 1);

export const trackSelectTicket = (offer) =>
  track(EVENTS.SELECT_TICKET, {
    ticket_type: offer?.id,
    content_name: offer?.nome,
    content_category: 'Ingresso de evento',
    ticket_value: offerTotal(offer),
    unit_value: offer?.preco,
    quantity: offer?.pessoas || 1,
    currency: 'BRL',
  });

export const trackInitiateCheckout = (offer) =>
  track(EVENTS.INITIATE_CHECKOUT, {
    ticket_type: offer?.id,
    content_name: offer?.nome,
    content_category: 'Ingresso de evento',
    ticket_value: offerTotal(offer),
    unit_value: offer?.preco,
    quantity: offer?.pessoas || 1,
    currency: 'BRL',
  });

export const trackLead = (extra) => track(EVENTS.LEAD, extra);
export const trackWhatsappClick = (origem) =>
  track(EVENTS.WHATSAPP_CLICK, { origem });
export const trackShare = (canal) => track(EVENTS.SHARE_EVENT, { canal });

export default { track, EVENTS, trackPageView, trackSelectTicket, trackInitiateCheckout };
