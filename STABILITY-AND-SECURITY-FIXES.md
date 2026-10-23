# Stability and security fixes

## Applied in this source update
- Replaced permissive reflected-origin CORS with an explicit allowlist. Configure `CLIENT_URL` and comma-separated `ALLOWED_ORIGINS` for every real frontend origin.
- Production startup now fails closed if JWT/admin/delivery credentials are missing or weak; local development uses explicitly local-only credentials.
- Added lightweight per-process rate limits to registration/login and password reset endpoints. For multi-instance deployments, also configure a shared Redis/edge rate limiter.
- Payment verification now checks Razorpay's server-side payment record, captured status, matching Razorpay order ID, amount and INR currency before confirming an order. Repeated confirmation of the same already-paid payment is idempotent.
- Menu initialization now preserves administrator-created monthly plans and only appends missing Standard/Premium defaults instead of replacing the full plan list.
- Homepage plan count and labels now derive from the API response rather than a hardcoded “2 plans”.
- Removed unused service videos while retaining the homepage cooking video. Service sections use the existing image components.
- CORS denials return a clear 403 response.

## Required before production deployment
1. Copy `server/.env.example` to `server/.env` and fill in real production values. Do not use the example placeholders.
2. Keep the existing production `ADMIN_EMAIL` and strong password configuration so the existing admin account remains accessible. Confirm credentials securely before release.
3. Set `CLIENT_URL` and `ALLOWED_ORIGINS` to the exact production frontend origins. Remove sample origins that are not used.
4. Back up MongoDB and test against a staging copy first. Do not run seed scripts against production as part of deployment.
5. Run `npm ci` and `npm run build` inside `client`; run backend syntax check and end-to-end tests inside `server`.
6. Verify login, password reset, Standard/Premium menu editing, booking creation, Razorpay success/failure/cancel/pending states, referral claims, delivery assignment, admin access and mobile layout.
7. Use a shared rate limiter (Redis or gateway) if the API runs more than one process/instance. Configure proxy trust only for known reverse proxies.
8. Monitor API 4xx/5xx rates, payment reconciliation and MongoDB latency after rollout. Keep a rollback release ready.

## Validation performed in this workspace
- `node --check server/src/index.js` passed.
- Frontend build could not be verified here: dependency installation timed out and the Vite executable was unavailable. Do not consider this archive production-build verified until `npm ci && npm run build` succeeds in your deployment/CI environment.
- No live database, Razorpay credentials, or production endpoint was accessed or changed.
