import assert from 'node:assert/strict';
import test from 'node:test';

import { sendPurchase } from '../functions/_shared/capi.js';

const env = {
  META_PIXEL_ID: '1706951560594723',
  META_CAPI_TOKEN: 'token_de_teste',
};

test('não transforma compra antiga em conversão nova', async () => {
  const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
  const result = await sendPurchase(env, {
    orderId: 'OLD-1',
    value: 247,
    eventTime: eightDaysAgo,
  });
  assert.equal(result.ok, false);
  assert.equal(result.skipped, true);
  assert.equal(result.reason, 'event_time_older_than_7_days');
});

test('envia o horário real e usa a Graph API v25', async () => {
  const originalFetch = globalThis.fetch;
  const captured = {};
  globalThis.fetch = async (url, options) => {
    captured.url = url;
    captured.body = JSON.parse(options.body);
    return new Response(JSON.stringify({ events_received: 1 }), { status: 200 });
  };

  try {
    const eventTime = Math.floor(Date.now() / 1000) - 60;
    const result = await sendPurchase(env, {
      orderId: 'NEW-1',
      value: 398,
      quantity: 2,
      email: 'pessoa@example.com',
      eventTime,
    });
    assert.equal(result.ok, true);
    assert.match(captured.url, /graph\.facebook\.com\/v25\.0\//);
    assert.equal(captured.body.data[0].event_time, eventTime);
    assert.equal(captured.body.data[0].custom_data.value, 398);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
