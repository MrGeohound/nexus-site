// =============================================================================
// Consentimento LGPD + carregamento condicional de scripts de tracking
// -----------------------------------------------------------------------------
// - Scripts de terceiros (GA4/Meta Pixel/GTM) só carregam APÓS consentimento.
// - Nada de caixas marcadas previamente. Padrão = não rastrear.
// - Registro do consentimento com timestamp em localStorage.
// =============================================================================

import { ANALYTICS } from '../config/site.js';
import {
  clearPendingMetaEvents,
  flushPendingMetaEvents,
} from './analytics.js';

const CONSENT_KEY = 'nexus_consent_v1';

export function getConsent() {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function hasDecision() {
  return getConsent() !== null;
}

export function setConsent(accepted) {
  const record = {
    analytics: !!accepted,
    marketing: !!accepted,
    ts: new Date().toISOString(),
    version: 'v1',
  };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    /* ignora */
  }
  window.__NEXUS_MARKETING_CONSENT__ = !!accepted;
  if (accepted) {
    loadTrackingScripts();
    // O stub do fbq já existe neste ponto. Assim, ViewContent/checkout que
    // ocorreram antes da decisão entram na fila oficial do Pixel.
    flushPendingMetaEvents();
  } else {
    clearPendingMetaEvents();
  }
  // Sinaliza para o Google Consent Mode, se presente.
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: accepted ? 'granted' : 'denied',
      ad_storage: accepted ? 'granted' : 'denied',
    });
  }
  return record;
}

let loaded = false;

// Carrega GA4 e Meta Pixel apenas quando houver IDs e consentimento.
export function loadTrackingScripts() {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;

  // --- Google Analytics 4 ---------------------------------------------------
  if (ANALYTICS.ga4Id) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4Id}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS.ga4Id, { anonymize_ip: true });
  }

  // --- Meta Pixel -----------------------------------------------------------
  if (ANALYTICS.metaPixelId) {
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', ANALYTICS.metaPixelId);
    window.fbq('track', 'PageView');
  }
}

// No boot: se já houver consentimento salvo, recarrega os scripts.
export function initConsent() {
  const c = getConsent();
  if (!c) {
    window.__NEXUS_MARKETING_CONSENT__ = null;
    return;
  }
  window.__NEXUS_MARKETING_CONSENT__ = !!c.marketing;
  if (c.analytics && c.marketing) {
    loadTrackingScripts();
    flushPendingMetaEvents();
  } else {
    clearPendingMetaEvents();
  }
}

export default { getConsent, hasDecision, setConsent, loadTrackingScripts, initConsent };
