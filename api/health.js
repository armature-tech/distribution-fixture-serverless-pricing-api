const { sendJson } = require('../lib/http');

module.exports = function handler(req, res) {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'method_not_allowed' });
  }

  return sendJson(res, 200, {
    ok: true,
    service: 'pricing-api',
    runtime: 'serverless',
  });
};
