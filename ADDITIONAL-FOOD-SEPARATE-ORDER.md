# Additional Food — Separate One-Time Orders

- Monthly Standard/Premium Tiffin checkout contains only the monthly plan price. Additional food is not included in or charged to a monthly booking.
- Customers use the separate `/additional-food` page to select enabled items, quantities, delivery date, saved address and payment method.
- The backend rechecks each selected item and its current admin-managed price before creating an `additional-food` order, then uses the existing Razorpay payment verification flow.
- Admins can manage food item names, descriptions, prices and availability under Admin → Settings & Menus → Additional Food Menu. One-time orders are also shown under Admin → Additional Food Orders and Orders.
- Premium morning meal availability remains controlled separately by the Premium Meal Control switch.

## Running locally

1. Keep your own `server/.env` file out of version control and copy your existing private environment settings into the extracted project when needed.
2. In `client`, run `npm install` and `npm run dev`.
3. In `server`, run `npm install` and the existing server start command from `server/package.json`.

This archive intentionally excludes `node_modules` and `server/.env`.
