# Security and module review — 25 October 2026

## Applied in this revision
- Removed forced public DNS resolver default; `MONGODB_DNS_SERVERS` remains opt-in.
- Set `trust proxy` only in production, avoiding unconditional trust in local development.
- Added `Cache-Control: no-store` to API responses.
- Restricted JSON request body size to 256 KiB and rejected malformed/non-object JSON API requests.
- Bounded the existing in-memory rate limiter's map growth (still not a distributed limiter).
- Added explicit HTTP errors for oversized and malformed JSON payloads.
- Preserved routes, Razorpay integration, frontend design, database schemas, and existing service modules.

## Audited risks still requiring work before production
1. Webhook payment confirmation and browser verification do not share the same fulfillment routine. In particular, the webhook does not allocate the final human-readable order ID or apply all referral/offer side effects. Consolidate these with transaction/idempotency handling before deploying.
2. Role authorization currently relies on role claims from 7-day JWTs. Privilege changes may not take effect until token expiry. Add server-side user/session verification and token invalidation.
3. Current limiter is in-memory; deploy a shared Redis/edge limiter for horizontally scaled production.
4. `localStorage` bearer tokens are exposed if the frontend suffers XSS. Evaluate secure HttpOnly cookie sessions with CSRF protection.
5. Add automated tests for user/admin/delivery permissions, menu scheduling, payments, subscriptions and additional food.
6. Run dependency vulnerability audit and a full frontend production build in a network-enabled environment.
7. Confirm Render reverse-proxy hop count and configure CORS origins precisely; rotate secrets if previously exposed.

## Validation
- `node --check server/src/index.js`: PASS.
- Live MongoDB, Razorpay, frontend build and end-to-end flows: NOT TESTED.
- Do not deploy directly to production without staging verification.
