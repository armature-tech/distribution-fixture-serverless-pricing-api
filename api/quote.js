const { calculateQuote } = require('../lib/quote');
const { readJson, sendJson } = require('../lib/http');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'method_not_allowed' });
  }

  try {
    const body = await readJson(req);
    return sendJson(res, 200, { quote: calculateQuote(body) });
  } catch (error) {
    return sendJson(res, 400, {
      error: 'invalid_quote_request',
      message: error instanceof Error ? error.message : String(error),
    });
  }
};
