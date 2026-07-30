# Kridiya Corporate Site Manual

## What Was Built

This folder is a complete static corporate site for:

`https://corporate.kridiyatravel.com`

It is branded as **Kridiya Business Travel** and includes:

- Corporate homepage
- Services page
- Company account setup page
- Corporate booking request page
- Corporate portal sign-in/preview page
- Approved company portal at `corporate-account.html`
- Contact page
- Thank-you page
- Shared corporate CSS mapped to the Kridiya cream/espresso/gold business palette
- Airport-style request/search UI without orange interface controls
- Supabase publishable-key connection pattern
- FormSubmit email fallback to `corporate@kridiyatravel.com`
- GitHub Pages `CNAME`
- `robots.txt`
- `sitemap.xml`

## Manual Setup Steps

1. Create the corporate email:
   `corporate@kridiyatravel.com`

2. Create a new GitHub repository:
   `Kridiyatravels/kridiya-corporate`

3. Push the contents of this folder as the root of that repo:
   `C:\Users\Who\kridiya1\kridiya-corporate`

4. In GitHub repo settings:
   - Go to Pages
   - Source: deploy from branch
   - Branch: `main`
   - Folder: `/root`
   - Custom domain: `corporate.kridiyatravel.com`
   - Enable HTTPS after DNS is detected

5. In GoDaddy DNS for `kridiyatravel.com`, add:
   - Type: `CNAME`
   - Name: `corporate`
   - Value: `kridiyatravels.github.io`

6. In Supabase Auth URL settings, add:
   - `https://corporate.kridiyatravel.com`
   - `https://corporate.kridiyatravel.com/login.html`
   - `https://corporate.kridiyatravel.com/corporate-account.html`
   - `https://corporate.kridiyatravel.com/reset-password.html`

7. In Supabase security/RLS, corporate portal phase must ensure:
   - Company users see only their linked company rows
   - Supplier cost/profit is never exposed
   - Documents use private storage
   - Downloads use signed URLs
   - Admin-only conversion remains in `admin.kridiyatravel.com`

8. Test after deployment:
   - Main site Business Travel link opens the subdomain
   - Company account setup form sends/saves
   - Corporate booking request sends/saves
   - Contact form sends/saves
   - Portal sign-in accepts only valid Supabase username/password
   - Mobile layout works at 375px

## Staff Operating Procedure

Use this process for every corporate company.

1. Company applies on `corporate.kridiyatravel.com`.
2. Confirm the row appears in Supabase `public.enquiries` and in staff admin enquiries.
3. Review company details, service needs, billing/LPO notes, and contact details.
4. Create or confirm a Supabase Auth user for the approved company contact.
5. Copy the Auth user ID.
6. Copy the corporate application enquiry ID from `public.enquiries`.
7. Run the approval RPC from a signed-in staff/admin flow, or from SQL only if you are using the admin bypass version already installed:

```sql
select public.approve_corporate_application(
  'ENQUIRY_ID_HERE',
  'AUTH_USER_ID_HERE',
  'travel_coordinator',
  true,
  false,
  false,
  true,
  'Approved corporate portal account'
);
```

8. Confirm these tables were created/updated:
   - `public.corporate_accounts`
   - `public.corporate_contacts`
   - `public.corporate_portal_members`
   - `public.bookings`, when the application is converted
9. Send the company their login email and temporary password privately.
10. Ask them to sign in at:
    `https://corporate.kridiyatravel.com/login.html?next=corporate-account.html`
11. Ask them to submit one test request from the portal.
12. Confirm that request appears in admin under the same corporate account.

## Permission Meanings

- `can_request`: company user can submit new portal requests.
- `can_approve_quotes`: company user can accept or decline released quote options.
- `can_view_finance`: company user can see payment/amount fields released to the portal.
- `lpo_required`: company account normally requires LPO/PO before booking.

Recommended default for a normal travel coordinator:

```text
role = travel_coordinator
can_request = true
can_approve_quotes = false
can_view_finance = false
lpo_required = true
```

Recommended default for a company finance/admin user:

```text
role = company_admin
can_request = true
can_approve_quotes = true
can_view_finance = true
lpo_required = true
```

## Next System Improvements

These are the next high-value upgrades after the current live system:

1. Add an admin button: `Approve corporate portal account`, so staff do not manually run SQL.
2. Add staff controls to link/unlink Auth users to a company.
3. Add portal document downloads using private Supabase Storage signed URLs.
4. Add quote release controls in admin, with portal accept/decline history.
5. Add monthly statement export as PDF/CSV.
6. Add notification emails to `corporate@kridiyatravel.com` when a portal request is submitted.
7. Add role templates: travel coordinator, approver, finance, viewer.
8. Add audit log view for portal events.
9. Add admin filters for corporate applications, active corporate bookings, open LPO, quote pending, payment pending, documents pending.
10. Add a private internal note template for corporate SLA, travel policy, billing contact, and escalation contact.

## Important Security Rule

Never place Supabase service role keys, GoDaddy credentials, email passwords, or admin secrets in this repo.
