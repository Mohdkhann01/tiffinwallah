# Tiffin Wallah

Full-stack React + Express + MongoDB application with:

- Daily Tiffin
- Party Service
- Laundry
- Reviews
- Feedback
- Authentication and saved addresses
- Razorpay checkout with UPI-capable Razorpay Checkout
- Admin menu/party/laundry management
- Direct quantity entry (no slow steppers)

## Start on Windows

1. Configure `server/.env` from `server/.env.example`.
2. Run `npm install` in both `server` and `client` once.
3. Run `START-ALL-WINDOWS.bat`, or start the two terminals manually.
4. Verify backend at `http://localhost:5000/api/health`.
5. Open `http://localhost:5173`.

The Vite proxy sends `/api/*` to `http://localhost:5000`.

## API / Razorpay deployment note

The frontend now supports `VITE_API_BASE_URL`. This fixes the common production issue where a separately deployed static frontend sends `/api` requests to itself instead of the Node/Express backend.

- Local development: leave `VITE_API_BASE_URL` empty; Vite proxies `/api` to `http://localhost:5000`.
- Render frontend: set `VITE_API_BASE_URL` to the deployed backend URL ending in `/api`, then rebuild/redeploy the frontend.
- Backend `.env` must contain valid `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` for Tiffin/Party/Press Wallah payments.

The payment API also reuses an existing Razorpay order for a pending booking, so refreshing/retrying checkout does not create duplicate Razorpay orders.

## Referral / Coupon flow

The Admin Control Center now has a **Coupon / Referral Builder**. The admin can generate a code, enable/disable it, set the title/description, choose:

- Free Press Wallah service
- Percentage discount on Monthly Tiffin
- Fixed rupee discount on Monthly Tiffin

The admin can also set expiry and one-use-per-customer behavior. Customers enter the code during Monthly Tiffin checkout and use **Apply Code**. The backend validates the coupon again before creating the booking. Free Press Wallah rewards are credited automatically after the qualifying Tiffin payment is successfully verified.


### Delivery partner
The server seeds a primary delivery partner from `DELIVERY_PARTNER_ID` and `DELIVERY_PARTNER_PASSWORD`. Admins can create additional delivery partner IDs in the Delivery Partners tab. Delivery accounts can only see assigned paid Monthly Tiffin and Press Wallah orders.

## Final bug-fix release
See `FINAL-BUG-FIXES.md` for the Rules Book API fix and delivery-partner database seeding/self-healing behavior.
