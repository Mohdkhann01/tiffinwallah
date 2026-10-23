# Additional Food Dashboard Update

- Removed Additional Food from the public top navigation and footer service links.
- Added Additional Food as a tab and quick action inside the logged-in customer dashboard.
- The Additional Food order remains a separate one-time purchase and payment; it is not added to Monthly Tiffin.
- The old `/additional-food` URL redirects logged-in customers to the dashboard tab and sends logged-out visitors to login.
- Admin can add/edit food name, item ID, price, description, and availability under Admin → Settings & Menus → Additional Food Menu.
- Existing Monthly Tiffin, Premium morning meal controls, admin orders, payment and other service flows are preserved.

## Build note
The JSX parser syntax check passed. A full Vite build could not run in this environment because the uploaded Windows `node_modules` package does not contain Rollup's Linux optional binary. Run `npm install` in `client` on the target machine, then `npm run build`.
