# Tiffin Wallah - Windows setup

## 1. Backend environment

Open `server` and create `.env` from `.env.example`:

```powershell
cd server
Copy-Item .env.example .env
notepad .env
```

Set your real MongoDB URI and Razorpay keys. Do not commit `.env` to Git.

## 2. Install dependencies

Terminal 1:

```powershell
cd server
npm install
npm start
```

You should see:

```text
MongoDB connected successfully.
Tiffin Wallah API running on http://localhost:5000
```

Check:

`http://localhost:5000/api/health`

It should return JSON with `ok: true`.

Terminal 2:

```powershell
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## One-click start

After the dependencies are installed and `server/.env` exists, double-click `START-ALL-WINDOWS.bat`.

## Important

If Vite shows `ECONNREFUSED /api/...`, the backend is not running on port 5000. Start the server first and check `/api/health`.

If the backend exits immediately, read the backend terminal: MongoDB credentials/network access are the most common cause.
