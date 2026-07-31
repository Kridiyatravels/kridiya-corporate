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
