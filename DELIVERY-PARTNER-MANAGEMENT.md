# Delivery Partner Management

## Admin controls

The Admin → Delivery Partners section now supports:

- Create a delivery partner with name, phone, optional ID, and optional password.
- Generate a secure password automatically when the admin leaves the password blank.
- Reset a partner password and immediately display the new password for sharing with the partner.
- Enable or disable a partner.
- Delete a partner. Undelivered work assigned to that partner is released.
- Automatic assignment when exactly one active partner exists.
- Manual assignment from the order dashboards when multiple active partners exist.
- Auto Divide Unassigned Work for round-robin assignment across all active partners.

## Assignment rules

1. Only paid Monthly Tiffin and Press Wallah orders are delivery work.
2. Party orders are never assigned to delivery partners.
3. When `autoAssignSingle` is enabled and exactly one active delivery partner exists, new paid delivery work is assigned automatically.
4. When more than one active partner exists, automatic single-partner assignment stops and the admin can assign each order manually.
5. Admin can use **Auto Divide Unassigned Work** to distribute currently unassigned paid deliveries across active partners in round-robin order.
6. Disabling or deleting a partner releases their undelivered work. If exactly one active partner remains, eligible work is automatically assigned to that partner.

## Bootstrap credentials

The `.env.example` contains the bootstrap delivery ID/password fields:

```env
DELIVERY_PARTNER_ID=TWDEL001
DELIVERY_PARTNER_PASSWORD=change-this-delivery-password
```

The bootstrap partner is created once. After it has been initialized, deleting that partner from the Admin portal does not recreate it automatically on every server restart.

Run `npm run seed` when you intentionally want to initialize/reset the environment-managed bootstrap account in a fresh database.
