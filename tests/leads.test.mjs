import assert from 'node:assert/strict';
import test from 'node:test';

import { onRequestPost } from '../functions/api/leads.js';

function kv() {
  const values = new Map();
  return {
    values,
    get: async (key) => values.get(key) ?? null,
    put: async (key, value) => values.set(key, value),
  };
}

function request(body) {
  return new Request('https://www.siganexus.com.br/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': '127.0.0.1',
    },
    body: JSON.stringify(body),
  });
}

test('persiste um lead válido e não devolve os dados pessoais', async () => {
  const NEXUS_KV = kv();
  const response = await onRequestPost({
    request: request({
      tipo: 'lead',
      nome: 'Pessoa Teste',
      whatsapp: '85999999999',
      consent: true,
      utm_campaign: 'meta_teste',
    }),
    env: { NEXUS_KV },
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.stored, true);
  assert.equal('whatsapp' in body, false);
  assert.equal([...NEXUS_KV.values.keys()].some((key) => key.startsWith('lead:')), true);
});

test('recusa confirmação sem contato e consentimento', async () => {
  const response = await onRequestPost({
    request: request({ tipo: 'lead', nome: 'Pessoa Teste' }),
    env: { NEXUS_KV: kv() },
  });
  assert.equal(response.status, 422);
});

test('não mostra sucesso quando nenhum destino está configurado', async () => {
  const response = await onRequestPost({
    request: request({
      tipo: 'lead',
      nome: 'Pessoa Teste',
      whatsapp: '85999999999',
      consent: true,
    }),
    env: {},
  });
  assert.equal(response.status, 503);
});
