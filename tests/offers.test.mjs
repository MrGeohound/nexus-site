import assert from 'node:assert/strict';
import test from 'node:test';

import { OFFERS } from '../src/config/offers.js';

test('oferta SOCIAL usa 50% de desconto nas duas modalidades', () => {
  const individual = OFFERS.find((offer) => offer.id === 'individual');
  const duplo = OFFERS.find((offer) => offer.id === 'duplo');

  assert.equal(individual.precoDe, 247);
  assert.equal(individual.preco, 123.5);
  assert.equal(individual.preco * individual.pessoas, 123.5);

  assert.equal(duplo.precoDe, 199);
  assert.equal(duplo.preco, 99.5);
  assert.equal(duplo.preco * duplo.pessoas, 199);
});
