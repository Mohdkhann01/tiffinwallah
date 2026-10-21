# Tiffin Wallah — Windows Start Guide

## First time setup

### 1. Configure MongoDB

Copy:

`server/.env.example` → `server/.env`

Then add your real MongoDB URI and JWT secret. For Razorpay, add your Test Mode keys.

### 2. Start backend

PowerShell terminal 1:

```powershell
cd "Tiffin-Wallah\server"
npm install
npm start
```

Wait for:

`MongoDB connected successfully.`

and:

`Tiffin Wallah API running on http://localhost:5000`

Then open:

`http://localhost:5000/api/health`

It should report `database: mongodb`.

### 3. Start frontend

PowerShell terminal 2:

```powershell
cd "Tiffin-Wallah\client"
npm install
npm run dev
```

Open:

`http://localhost:5173`

## Customer flow

1. Register.
2. Login.
3. Complete your profile and saved address once.
4. Open Tiffin, Party or Laundry.
5. Your saved customer information is attached automatically.
6. Pay through Razorpay.
7. The order is confirmed only after server-side payment verification.

## Admin flow

1. Login using the admin credentials from `server/.env`.
2. Open Admin.
3. Manage customers, orders, payment status, tiffin prices, weekly menu, party packages and laundry prices.

## Delivery partner login
Set these in `server/.env` before starting the server:
- `DELIVERY_PARTNER_ID=TWDEL001`
- `DELIVERY_PARTNER_PASSWORD=your-secure-delivery-password`

The server seeds that primary delivery account automatically. Additional delivery IDs can be generated from Admin → Delivery Partners. Delivery partners sign in from the normal Login page using their partner ID and password.
