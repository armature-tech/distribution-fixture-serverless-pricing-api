module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.end('method_not_allowed');
    return;
  }

  res.statusCode = 200;
  res.setHeader('content-type', 'text/event-stream; charset=utf-8');
  res.setHeader('cache-control', 'no-cache, no-transform');

  const chunks = ['accepted', 'priced', 'ready'];
  for (const event of chunks) {
    res.write(`event: status\ndata: ${JSON.stringify({ event })}\n\n`);
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  res.end();
};
