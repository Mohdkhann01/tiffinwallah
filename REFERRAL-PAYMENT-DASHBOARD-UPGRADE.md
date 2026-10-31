# Referral, Payment API & Dashboard Upgrade — 2026-09-29

- Removed Service Addresses from the main navigation.
- Added the Tiffin and Press Wallah service addresses into the Contact footer area.
- Reworked referral codes into administrator-controlled coupons.
- Added coupon validation before Monthly Tiffin checkout.
- Added admin coupon code generation, offer type, value, title, description, expiry and one-use-per-customer settings.
- Free Press Wallah coupon rewards are automatically credited after successful Tiffin payment verification.
- Percentage/fixed coupons are applied server-side so the customer cannot alter the discount.
- Added `VITE_API_BASE_URL` support for deployed frontends.
- Made Razorpay order creation idempotent for a pending booking.
- Added clearer API reachability and Razorpay configuration errors.
- Added role-based dashboard routing: admin credentials go to Admin Control Center; customer credentials go to My Account.
- Added Admin Security tab for changing the administrator password.
- Added customer referral/coupon wallet to the user dashboard.
