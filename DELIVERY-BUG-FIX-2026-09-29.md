# Delivery / Admin Bug Fixes — 2026-09-29

## Fixed
- Added the missing Delivery Partner dashboard component used by `/delivery`.
- Delivery partners can now log in with the generated Partner ID and password, view assigned paid Monthly Tiffin / Press Wallah deliveries, start delivery, and mark deliveries delivered.
- The Delivery Partner dashboard does not call the customer-only `/auth/me` endpoint.
- Added mobile-first responsive delivery dashboard layout.
- Added server-side validation so admin cannot assign unpaid or already completed deliveries to a delivery partner.
- Deleting or disabling a delivery partner now releases only undelivered work; completed delivery history remains intact.
- Admin order status changes now keep delivery status synchronized for Tiffin / Press Wallah orders.
- Custom delivery partner passwords must be at least 6 characters.
- Fixed the seed Menu schema so `deliverySettings.bootstrapInitialized` is actually persisted in MongoDB.
- This prevents the environment bootstrap delivery account from being recreated after an admin intentionally deletes it.

## Delivery assignment behavior
- 0 active partners: paid delivery remains unassigned.
- 1 active partner + auto-assign enabled: eligible new paid deliveries are automatically assigned.
- 2+ active partners: admin can assign individual orders or use Auto Divide Unassigned Work for round-robin assignment.
- Party orders are never delivery-partner work.
