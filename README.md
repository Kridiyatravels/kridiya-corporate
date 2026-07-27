# Kridiya Business Travel

Static GitHub Pages-ready corporate travel site for `corporate.kridiyatravel.com`, using the main Kridiya visual palette and corporate-specific airport-style controls.

## Purpose

This is the separate corporate front door for Kridiya Travel and Tourism FZ-LLC. It sends corporate enquiries into the same business flow as the main site/admin system:

Corporate site -> Supabase enquiries / FormSubmit email -> admin.kridiyatravel.com -> corporate account/contact/booking -> payment -> documents -> accounting/backup.

## Manual Setup

1. Create GitHub repo: `Kridiyatravels/kridiya-corporate`.
2. Push this folder as the repo root.
3. Enable GitHub Pages from `main` branch, root folder.
4. In GoDaddy DNS, add:
   - Type: `CNAME`
   - Name: `corporate`
   - Value: `kridiyatravels.github.io`
5. Create email: `corporate@kridiyatravel.com`.
6. In Supabase Auth, add allowed URLs later:
   - `https://corporate.kridiyatravel.com`
   - `https://corporate.kridiyatravel.com/portal.html`
7. Keep service role keys only in admin/backend. Never place them in this repo.

## Security Notes

- This frontend may use the browser-safe Supabase publishable key only.
- Private corporate data must be protected by Supabase RLS.
- Document upload/view should use private storage and signed URLs.
- Supplier cost, profit, staff notes, and admin controls must stay in `admin.kridiyatravel.com`.
