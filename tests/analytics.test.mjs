import assert from 'node:assert/strict';
import test from 'node:test';

function storage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

globalThis.document = { referrer: '' };
globalThis.window = {
  innerWidth: 390,
  innerHeight: 844,
  location: { pathname: '/', search: '' },
  localStorage: storage(),
  sessionStorage: storage(),
  dataLayer: [],
};

const analytics = await import('../src/lib/analytics.js');

test('recupera eventos padrão após consentimento e usa valor total do passe', () => {
  const calls = [];
  delete window.fbq;
  window.__NEXUS_MARKETING_CONSENT__ = null;
  analytics.clearPendingMetaEvents();

  analytics.trackViewEvent();
  analytics.track(analytics.EVENTS.VIEW_PRICING);
  analytics.trackInitiateCheckout({
    id: 'duplo',
    nome: 'Passaporte Duplo+',
    preco: 199,
    pessoas: 2,
  });

  window.fbq = (...args) => calls.push(args);
  assert.equal(analytics.flushPendingMetaEvents(), 2);
  assert.equal(calls[0][0], 'track');
  assert.equal(calls[0][1], 'ViewContent');
  assert.equal(calls[1][1], 'InitiateCheckout');
  assert.equal(calls[1][2].value, 398);
  assert.equal(calls[1][2].currency, 'BRL');
  assert.equal(calls[1][2].num_items, 2);
  assert.equal(calls[1][2].contents[0].item_price, 199);
});

test('descarta eventos de marketing quando o visitante recusa', () => {
  const calls = [];
  delete window.fbq;
  window.__NEXUS_MARKETING_CONSENT__ = false;
  analytics.clearPendingMetaEvents();

  analytics.trackViewEvent();
  analytics.trackInitiateCheckout({
    id: 'individual',
    nome: 'Ingresso Individual',
    preco: 247,
    pessoas: 1,
  });

  window.fbq = (...args) => calls.push(args);
  assert.equal(analytics.flushPendingMetaEvents(), 0);
  assert.equal(calls.length, 0);
});
