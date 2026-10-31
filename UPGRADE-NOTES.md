# Tiffin Wallah — Upgrade Notes

## Authentication and page navigation
- Public pages remain accessible after login.
- A customer who logs in from Tiffin, Party, Laundry, Reviews, or another public page is returned to that page.
- Customers are sent to Account only when they must complete a missing address/profile before an order can continue.
- After saving the required address/profile, the customer is returned to the page that requested it.
- Account and Admin remain protected areas.
- Stale/expired JWT sessions are automatically cleared by the frontend when the API returns HTTP 401.

## Reviews
- Reviews can be read without login.
- Login is required only to submit a review.
- Review loading errors are shown instead of being silently ignored.
- Successful reviews appear immediately after MongoDB saves them.
- Backend validates the logged-in customer, rating range, and review length.

## Existing functionality preserved
- Tiffin daily/monthly ordering
- Monday–Sunday menu
- Party packages
- Laundry pricing
- Customer profile and saved address
- Order history and payments
- Razorpay verification flow
- Admin controls
- Feedback
- Forgot/reset password
- MongoDB/Mongoose
- No tracking page or tracking API
