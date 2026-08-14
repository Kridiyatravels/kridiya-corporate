# Kridiya Business Travel

Static GitHub Pages site and approved-company portal for:

`https://corporate.kridiyatravel.com`

This is the separate corporate front door for Kridiya Travel and Tourism FZ-LLC.

## Pages

- `index.html`: corporate homepage and account application
- `company.html`: company account, billing/LPO, approval workflow
- `services.html`: corporate service directory
- `booking.html`: public corporate request intake
- `portal.html`: approved portal explainer
- `login.html`: Supabase Auth login
- `forgot-password.html`: Supabase password reset request
- `reset-password.html`: secure password update landing page
- `corporate-account.html`: private company portal
- `contact.html`: Corporate Desk contact page

## System Flow

```text
Corporate site
-> Supabase enquiries + corporate@kridiyatravel.com fallback
-> admin.kridiyatravel.com review
-> corporate account/contact/member approval
-> company portal login
-> portal requests/bookings/quotes/documents/finance
```

Admin source is maintained separately at:

`C:\Users\Who\kridiya-admin`

## Hosting

GitHub Pages:

```text
Repository: Kridiyatravels/kridiya-corporate
Branch: main
Folder: /root
Custom domain: corporate.kridiyatravel.com
```

DNS:

```text
Type: CNAME
Name: corporate
Value: kridiyatravels.github.io
```

## Security

- Browser frontend uses only the Supabase publishable key.
- Service role keys must stay outside this repo.
- Company data must be protected by Supabase RLS and RPC functions.
- Supplier costs, profit, staff notes, and admin controls must not be exposed to portal users.
- Private documents should use signed Supabase Storage URLs.

## Full Manual

See [MANUAL.md](MANUAL.md) for setup, operating procedure, approval SQL, permissions, testing checklist, and future admin work.

Admin approval button implementation notes:

[docs/admin-approval-implementation.md](docs/admin-approval-implementation.md)

Production hardening checklist:

[docs/production-hardening.md](docs/production-hardening.md)
