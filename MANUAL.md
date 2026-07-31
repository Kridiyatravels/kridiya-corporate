# Kridiya Business Travel Corporate System Manual

Live site:

`https://corporate.kridiyatravel.com`

Local repo:

`C:\Users\Who\kridiya1\kridiya-corporate-live`

GitHub repo:

`https://github.com/Kridiyatravels/kridiya-corporate`

## What Is Built

This is a separate corporate site for Kridiya Travel and Tourism FZ-LLC.

Public pages:

- `index.html`: corporate homepage and account application
- `company.html`: company account, billing/LPO, approval model
- `services.html`: full corporate service directory
- `booking.html`: public corporate request intake
- `portal.html`: public portal explainer and login preview
- `contact.html`: Corporate Desk contact page
- `login.html`: approved portal user sign-in
- `thanks.html`: fallback thank-you page

Private approved-company portal:

- `corporate-account.html`: company-only portal workspace
- Overview command center
- New corporate request form
- Quotes view
- Bookings tracker
- Documents/download view
- Finance/payment view
- Corporate desk contact area

System connections:

- Corporate forms save into Supabase `public.enquiries`
- FormSubmit sends fallback email to `corporate@kridiyatravel.com`
- Approved portal users sign in through Supabase Auth
- Portal data is read through Supabase RPC functions
- Portal requests create linked corporate bookings
- Private documents use signed Supabase Storage URLs

## DNS And Hosting

GitHub Pages:

- Source: deploy from branch
- Branch: `main`
- Folder: `/root`
- Custom domain: `corporate.kridiyatravel.com`
- HTTPS: enable when GitHub allows it

GoDaddy DNS:

```text
Type: CNAME
Name: corporate
Value: kridiyatravels.github.io
TTL: default or 1 hour
```

Current `CNAME` file must contain:

```text
corporate.kridiyatravel.com
```

## Email

Corporate email:

`corporate@kridiyatravel.com`

Recommended use:

- Put this email in the website header/footer/contact pages
- Use it for corporate account applications and serious company documents
- Keep WhatsApp as the fastest urgent channel
- Do not use personal Gmail for corporate company records

Recommended internal inbox handling:

- Create folders or labels: Applications, Active companies, Requests, Documents, Payments, Statements
- Save important company emails under the company name
- For LPO/PO, payment proof, passport scans, and invoices, keep the same reference number in the email subject when possible

## Supabase Required Settings

Auth URL allow list should include:

```text
https://corporate.kridiyatravel.com
https://corporate.kridiyatravel.com/login.html
https://corporate.kridiyatravel.com/corporate-account.html
```

Required database objects already used by the portal:

```text
public.enquiries
public.corporate_accounts
public.corporate_contacts
public.corporate_portal_members
public.bookings
public.booking_documents
public.payments
public.quotes
```

Required RPC functions already used by the portal:

```text
public.get_my_corporate_portal()
public.list_my_corporate_bookings(...)
public.list_my_corporate_quotes(...)
public.respond_my_corporate_quote(...)
public.get_my_corporate_booking_detail(...)
public.create_my_corporate_request(...)
public.approve_corporate_application(...)
```

Security rule:

Never put Supabase service role keys, email passwords, GoDaddy credentials, or admin secrets inside this GitHub Pages repo.

## Daily Staff Workflow

Use this for every new corporate company.

1. Company applies from `https://corporate.kridiyatravel.com/#apply`.
2. Confirm the application appears in `public.enquiries`.
3. Confirm the same lead appears in `admin.kridiyatravel.com` enquiries.
4. Review:
   - Company name
   - Authorized contact
   - Email and WhatsApp
   - Services needed
   - Monthly travel volume
   - Billing/LPO requirement
   - Notes and urgency
5. Contact the company from `corporate@kridiyatravel.com` or WhatsApp.
6. If approved, create a Supabase Auth user for the company contact.
7. Copy the Auth user ID.
8. Copy the corporate enquiry ID from `public.enquiries`.
9. Run the approval function or use the future admin approval button.
10. Send the company their login email and temporary password privately.
11. Ask them to sign in at:

```text
https://corporate.kridiyatravel.com/login.html?next=corporate-account.html
```

12. Ask them to submit one test request from the portal.
13. Confirm the request appears in admin under the correct corporate account.

## Manual Approval SQL

Use only when approving manually in Supabase SQL.

Replace both IDs before running:

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

Recommended default user:

```text
role = travel_coordinator
can_request = true
can_approve_quotes = false
can_view_finance = false
lpo_required = true
```

Recommended finance/admin user:

```text
role = company_admin
can_request = true
can_approve_quotes = true
can_view_finance = true
lpo_required = true
```

## What The Portal User Can Do

Approved company user can:

- Submit new company requests
- Track linked company bookings
- View quote status
- Accept or decline released quotes if permission allows
- See portal-safe payment status if permission allows
- Download released documents
- Contact the corporate desk

Approved company user must not see:

- Supplier cost
- Profit
- Internal staff notes
- Other company records
- Supabase/admin controls
- Service role keys

## Admin Side Still Needed

Highest priority future admin features:

1. Add `Approve corporate portal account` button in admin enquiry view.
2. Add staff UI to link/unlink Auth users to corporate accounts.
3. Add role selector: travel coordinator, approver, finance, viewer.
4. Add quote release controls for portal visibility.
5. Add document release controls for portal downloads.
6. Add monthly statement PDF/CSV export.
7. Add notification email when a portal request is submitted.
8. Add corporate filters: applications, active accounts, quote pending, payment pending, documents pending, LPO required.
9. Add audit log: login, request submitted, quote approved, document downloaded.
10. Add account health panel: missing billing email, missing authorized contact, inactive user, unpaid requests.

Important: the current workspace does not contain the real admin source code. To build the admin approval button and admin screens, the actual admin app/source repo must be available locally or shared.

Admin approval implementation guide:

`docs/admin-approval-implementation.md`

## Testing Checklist

Before calling the system ready after changes:

- Open homepage
- Open Company page
- Open Services page
- Open Book Travel page
- Open Portal explainer
- Open Contact page
- Submit public application test
- Confirm test appears in Supabase `public.enquiries`
- Confirm test appears in admin enquiries
- Create/confirm Supabase Auth user
- Approve corporate application
- Login as company user
- Submit portal request
- Confirm request appears in admin bookings
- Confirm company portal shows bookings
- Confirm quote/document/finance views do not expose supplier/private data
- Test mobile width around 375px

## Git Commands

After edits:

```powershell
git status --short
node --check js\corporate.js
node --check js\auth.js
git diff --check
git add -- .
git commit -m "Your commit message"
git push origin main
```

Do not commit credentials or private files.

Known ignored/untracked local helper:

```text
preview-server.cjs
```

Leave it alone unless intentionally adding local preview tooling.
