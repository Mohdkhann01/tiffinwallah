# Tiffin Wallah — Final Bug Fixes

## Rules Book
- Added dedicated protected admin endpoints:
  - `GET /api/admin/rules`
  - `PUT /api/admin/rules`
- Admin Rules Book now loads the latest rules directly and saves independently of the other admin tabs.
- Admin dashboard startup uses `Promise.allSettled`, so a failure in delivery-partner loading cannot blank the Rules Book or other admin sections.
- Public `/api/rules` remains available.

## Delivery Partner login
- Added delivery-partner creation to `server/src/seed.js`.
- Server startup also self-heals the environment-managed primary delivery account.
- The account is created from:
  - `DELIVERY_PARTNER_ID`
  - `DELIVERY_PARTNER_PASSWORD`
- Existing environment-managed credentials are repaired when the configured password changes.
- Admin-created/edited partners are marked admin-managed so their credentials are not overwritten by the environment sync.
- Delivery login accepts the partner ID in the normal Login field.
- Delivery partners only receive paid Monthly Tiffin and Press Wallah orders assigned by an administrator.
- Party orders are excluded from delivery-partner assignment.

## Data safety / startup
- MongoDB startup creates the delivery-partner collection automatically when the first environment-managed partner is created.
- Monthly Tiffin migration guarantees both Standard and Premium plans exist.
- Party migration guarantees both Standard and Premium party packages exist.
- Duplicate health route was removed.

## Required server/.env values
```env
DELIVERY_PARTNER_ID=TWDEL001
DELIVERY_PARTNER_PASSWORD=change-this-to-a-secure-password
```

The same credentials are automatically seeded/created in MongoDB on server startup.

## Windows startup
1. Extract the project.
2. Create `server/.env` from `server/.env.example`.
3. Put the real MongoDB, JWT, Razorpay and SMTP values into `server/.env`.
4. Set a secure delivery partner ID/password.
5. In `server` run `npm install` then `npm run seed`.
6. Start the backend with `npm start`.
7. In `client` run `npm install` then `npm run dev`.

If the database already exists, running `npm run seed` is safe for the delivery partner: the environment-managed partner is created if missing and its configured password is synchronized.


## 2026-10-02 Admin stability and Rules Book hardening
- Fixed Admin Rules Book to use isolated loading/saving state and protected error handling.
- Admin Rules Book API now initializes the main Menu document when missing and restores default rules if rules are absent.
- Added `AdminSectionBoundary` so a runtime error in one admin module cannot blank the entire Admin Control Center.
- Wrapped routed pages with the same isolation boundary so a page-level React error does not take down the site shell.
- Public Rules Book now handles API failure and falls back to the public menu endpoint without rendering a blank page.
- Verified all project JavaScript/JSX source files with Babel parser and Node syntax checks for server files.
- Removed platform-specific `node_modules` from the distributable ZIP; install dependencies on the target Windows machine with `npm ci`.
