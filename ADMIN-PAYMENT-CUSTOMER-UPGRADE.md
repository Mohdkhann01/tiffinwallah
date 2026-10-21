# Tiffin Wallah — Payment + Admin Control Upgrade

This upgrade adds the requested real-project workflow without changing the navbar design.

## Customer dashboard
- Pending orders now show a **Pay Now** button.
- Pay Now opens Razorpay Checkout for the existing order.
- After Razorpay verification, the order is automatically marked **paid** and **confirmed**.
- The order receives `serviceStatus: allocated` and an allocation timestamp.
- **Check Payment** can reconcile a payment that was completed but not reflected in the current browser session.
- The Orders & Payments tab can be opened directly with `/account?tab=orders`.

## Admin panel
- Customers tab now has **Remove User** for customer accounts.
- Removing a customer also removes that customer's orders, reviews and feedback. Admin accounts cannot be removed from this customer control.
- New **Reviews** tab with **Edit Review** controls for service, rating and review text.
- New **Notify Unpaid Customers** action sends payment reminder emails to customers with unpaid orders.
- Admin order loading also checks pending Razorpay orders and automatically confirms captured payments.

## Email reminder setup
Add these values to `server/.env` for the notification button:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM=your-from-address@example.com
```

Razorpay still requires:

```env
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

MongoDB and JWT settings are still required as before.
