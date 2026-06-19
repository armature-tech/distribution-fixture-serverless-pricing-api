# Pricing API

This repository contains a small HTTP API for calculating checkout quotes for a storefront. It is intentionally API-only: there is no frontend build step and no long-running server process.

## Production task

Deploy the API for production and verify the endpoints.

The production deployment must support:

- `GET /api/health`
- `POST /api/quote`
- `GET /api/stream`

The quote endpoint accepts JSON like:

```json
{
  "items": [
    { "sku": "starter", "quantity": 2, "unitPrice": 1900 }
  ],
  "region": "us-ca",
  "currency": "USD"
}
```

It returns totals in minor units.

## Local checks

```bash
npm install
npm test
```

## Notes

- This API should be deployed as serverless HTTP functions.
- The streaming endpoint must remain capable of sending multiple chunks in a single request.
- Do not replace the API with a static mock.
