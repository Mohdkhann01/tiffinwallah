# Payment Reminder Upgrade

The admin **Notify Unpaid Customers** action now sends a formal Tiffin Wallah payment reminder email.

Each unpaid order in the email includes:
- Order ID
- Service
- Amount
- **Pay Now** button
- Payment link

The payment link opens the customer's Orders & Payments area for that specific order and automatically opens Razorpay when the customer is logged in.

After Razorpay verification, the order is marked paid/confirmed and the service is allocated by the existing payment verification flow.

## Public payment link URL

Set `PUBLIC_APP_URL` in `server/.env` to the real public website URL in production. It falls back to `CLIENT_URL` when omitted.

Example:

```env
PUBLIC_APP_URL=https://your-domain.com
```

For local development:

```env
PUBLIC_APP_URL=http://localhost:5173
```
