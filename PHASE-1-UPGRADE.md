# Tiffin Wallah — Phase 1 Foundation Upgrade

## Included
- Customer account security with server-side password change.
- Multiple saved customer addresses with labels (Home, Work, etc.).
- Default address selection; new orders continue using the customer's default profile address.
- Add, select, and delete saved addresses.
- Backward-compatible legacy address fields for existing users.
- Stronger authenticated API session handling already present in the client.
- Existing public pages remain public; login is only required for protected actions/pages.
- Existing reviews, feedback, payments, tiffin, party, laundry, admin, and reset-password functionality preserved.

## Run
1. Configure `server/.env` with your real MongoDB Atlas URI.
2. `cd server`
3. `npm install`
4. `npm run seed`
5. `npm start`
6. In another terminal: `cd client`, `npm install`, `npm run dev`

## Validation
- Server `node --check server/src/index.js` passes.
- Server `node --check server/src/seed.js` passes.
- Frontend production build was not run in this environment because npm dependency installation timed out; run `npm install` then `npm run build` locally.
