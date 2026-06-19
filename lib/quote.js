const TAX_RATES = new Map([
  ['us-ca', 0.0825],
  ['us-ny', 0.08875],
  ['us-wa', 0.065],
  ['eu-de', 0.19],
  ['gb', 0.2],
]);

function normalizeLineItem(raw) {
  const sku = String(raw?.sku || '').trim();
  const quantity = Number(raw?.quantity);
  const unitPrice = Number(raw?.unitPrice);
  if (!sku) throw new Error('Each item requires a sku');
  if (!Number.isInteger(quantity) || quantity <= 0) throw new Error(`Invalid quantity for ${sku}`);
  if (!Number.isInteger(unitPrice) || unitPrice < 0) throw new Error(`Invalid unitPrice for ${sku}`);
  return { sku, quantity, unitPrice };
}

function calculateQuote(input) {
  const items = Array.isArray(input?.items) ? input.items.map(normalizeLineItem) : [];
  if (items.length === 0) throw new Error('At least one item is required');

  const currency = String(input?.currency || 'USD').toUpperCase();
  const region = String(input?.region || 'us-ca').toLowerCase();
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxRate = TAX_RATES.get(region) ?? 0;
  const tax = Math.round(subtotal * taxRate);
  const shipping = subtotal >= 10000 ? 0 : 799;
  const total = subtotal + tax + shipping;

  return {
    currency,
    region,
    subtotal,
    tax,
    shipping,
    total,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

module.exports = { calculateQuote };
