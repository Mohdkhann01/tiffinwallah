# Press Wallah video
Place your licensed pressing video at `client/public/videos/press-wallah.mp4`.
The homepage food preparation video is retained at `client/public/videos/food-preparation.mp4`.
If the press video is absent or cannot load, the existing pressing image appears automatically.
Additional Food already has a customer dashboard tab, admin-managed menu, separate order, Razorpay payment verification, and admin order handling. These existing flows were preserved.
The weekly menu reads `/api/menu` from MongoDB, and displays the selected plan's stored weekly meals. If the API is unreachable, it shows an error instead of pretending default values are live.
Run `npm ci && npm run build` in client and test with your configured backend/database before deployment.
