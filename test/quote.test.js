const assert = require('node:assert/strict');
const test = require('node:test');
const { calculateQuote } = require('../lib/quote');

test('calculateQuote returns totals in minor units', () => {
  const quote = calculateQuote({
    currency: 'usd',
    region: 'us-ca',
    items: [
      { sku: 'starter', quantity: 2, unitPrice: 1900 },
      { sku: 'addon', quantity: 1, unitPrice: 1200 },
    ],
  });

  assert.equal(quote.currency, 'USD');
  assert.equal(quote.subtotal, 5000);
  assert.equal(quote.tax, 413);
  assert.equal(quote.shipping, 799);
  assert.equal(quote.total, 6212);
  assert.equal(quote.itemCount, 3);
});

test('calculateQuote makes shipping free above threshold', () => {
  const quote = calculateQuote({
    region: 'gb',
    items: [{ sku: 'pro', quantity: 1, unitPrice: 12000 }],
  });

  assert.equal(quote.shipping, 0);
  assert.equal(quote.tax, 2400);
  assert.equal(quote.total, 14400);
});
