# Tiffin Wallah targeted upgrade

## Implemented in this ZIP
- Razorpay signature-verified webhook at `POST /api/payments/webhook` with server-side payment verification and conditional payment-state update. Configure `RAZORPAY_WEBHOOK_SECRET` in Render and the matching webhook in Razorpay dashboard.
- Admin date-specific menu scheduling at `/admin/menu-schedule`, backed by MongoDB `MenuSchedule` records.
- Customer subscription calendar at `/account/calendar` (30-day estimate; individual meal delivery records are not available in the original schema).
- Paginated admin live order board at `/admin/live-orders`, refreshing every 15 seconds.
- MongoDB indexes for order lookup, payment, delivery and menu schedule.
- Basic security headers and proxy awareness. Existing rate limiter and CORS preserved.
- Existing Additional Food order and payment flow preserved.

## Not complete / limitations
- Date-specific scheduled menu overrides are stored and exposed at `/api/menu/schedule`; existing homepage weekly display still uses `/api/menu` and does not yet merge overrides into the homepage UI.
- Meal customization attached to a specific active monthly subscription has not been added; existing separately paid Additional Food remains available.
- Subscription calendar is an estimate using 30-day windows and approved pauses, not authoritative day-by-day delivery records.
- Razorpay webhook handler is not yet feature-equivalent to all existing client-side payment post-processing (allocation codes/referral awards). Do not disable existing client verification.
- No real Razorpay, Atlas, or full frontend build tests were possible here. Test in staging before deployment.
- Two-video optimization remains as in the previously updated ZIP; pressing MP4 must be supplied by the owner.

## Start / test
1. Copy `.env.example` to `.env` and fill existing variables; set webhook secret.
2. `cd server && npm ci && npm start`
3. `cd client && npm ci && npm run build && npm run dev`
4. Test all existing booking, payment, delivery, admin and login flows against a staging database.
