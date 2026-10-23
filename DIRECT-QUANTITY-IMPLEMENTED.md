# Tiffin Wallah — Direct Quantity Input

Implemented the agreed quantity behavior across customer ordering pages.

## What changed
- Daily Tiffin: customers type the exact number of tiffins they want.
- Party Service: customers type the exact number of guests they need.
- Laundry: customers type the exact number of pieces for each clothing item.
- No plus/minus buttons.
- No browser number-input spinner controls.
- No scrolling through quantities.
- Numeric keyboard is requested on supported mobile devices.
- Non-numeric characters are ignored.
- Daily Tiffin and Party Service validate that the submitted quantity is a positive whole number.
- Laundry requires at least one positive quantity before checkout.

## Not added
- No customer-facing tiffin tracking system was added.
- The existing navigation bar was not redesigned.
- Existing payment/auth/address/order functionality was preserved.
