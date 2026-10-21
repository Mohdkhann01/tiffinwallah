# Payment + UPI upgrade

- Added a payment method selector to Daily Tiffin, Party Service and Laundry.
- Razorpay remains the payment gateway and default option.
- Added a UPI option that opens Razorpay Checkout with UPI preselected when customer contact/email are available.
- Server still verifies the Razorpay signature before confirming the booking.
- After verification, the server attempts to read the actual Razorpay payment method and stores it on the booking (`upi`, `card`, `netbanking`, etc.).
- No direct/manual UPI ID payment was added; this keeps payment verification inside Razorpay.
