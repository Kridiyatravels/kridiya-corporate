# Corporate Production Hardening

This checklist is the final launch guard for `corporate.kridiyatravel.com`, `admin.kridiyatravel.com`, Supabase, and Microsoft document storage.

## Completed In Code

- Corporate applications save into Supabase enquiries.
- Approved corporate logins use Supabase Auth.
- Portal requests create company-linked bookings in admin.
- Admin can release portal-safe quotes.
- Company users can accept or decline quotes when permission is enabled.
- Admin can track payment/LPO handoff, supplier risk, tasks, passengers, documents, and timeline.
- Company document requests require an existing booking.
- Admin document release requires an attached file before showing it in the portal.
- Corporate document downloads re-check company access and `visible_to_customer` before opening.
- Password reset request and password update pages are present.

## Supabase Auth Settings

Add these URLs in Supabase Auth redirect allow list:

```text
https://corporate.kridiyatravel.com
https://corporate.kridiyatravel.com/login.html
https://corporate.kridiyatravel.com/corporate-account.html
https://corporate.kridiyatravel.com/forgot-password.html
https://corporate.kridiyatravel.com/reset-password.html
```

Set the Auth email templates to send from the verified corporate sender when SMTP is configured:

```text
corporate@kridiyatravel.com
```

## Email Automation

Do not put SMTP passwords or Supabase service-role keys in GitHub Pages.

Recommended production setup:

- Use Supabase Auth SMTP for password reset/invite emails.
- Use a Supabase Edge Function or trusted server for staff-triggered corporate invites.
- Sender: `corporate@kridiyatravel.com`.
- Reply-to: `corporate@kridiyatravel.com`.
- Keep username/login link and temporary password in separate messages.

## RLS Audit Queries

Run these in Supabase SQL Editor before launch:

```sql
select schemaname, tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in (
    'corporate_accounts',
    'corporate_contacts',
    'corporate_portal_members',
    'bookings',
    'booking_documents',
    'quotes',
    'payments',
    'enquiries'
  )
order by tablename;

select n.nspname as schema_name,
       p.proname as function_name,
       pg_get_userbyid(p.proowner) as owner,
       p.prosecdef as security_definer,
       array_to_string(p.proacl, E'\n') as grants
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname like '%corporate%'
order by p.proname;

select id, document_type, file_name, storage_provider, storage_path, visible_to_customer
from public.booking_documents
where visible_to_customer = true
  and (storage_path is null or trim(storage_path) = '');

select q.id, q.booking_id, q.status, q.visible_to_customer, b.corporate_account_id
from public.quotes q
left join public.bookings b on b.id = q.booking_id
where q.visible_to_customer = true
  and b.corporate_account_id is null;
```

Expected result:

- Customer-facing corporate tables should have RLS enabled.
- Public/anon should not execute privileged staff functions.
- No visible documents should have an empty storage path.
- No customer-visible quote should be orphaned from a corporate booking.

## Fake Data Cleanup

Clean fake records only after final testing. Do not run broad deletes.

Find test data first:

```sql
select id, reference, full_name, email, phone, summary
from public.enquiries
where email ilike '%test%'
   or full_name ilike '%test%'
   or summary ilike '%test fake%';

select id, booking_reference, title, customer_name, corporate_account_id
from public.bookings
where title ilike '%test%'
   or customer_name ilike '%test%';
```

Delete only by exact IDs after confirming the records are fake.

## Manual Launch Verification

- Submit a fresh corporate application.
- Approve/link one portal user.
- Request a password reset and confirm the reset page saves a new password.
- Submit one portal travel request.
- Release one quote from admin and accept it from the portal.
- Mark payment requested or received from admin.
- Request one document from the portal.
- Upload a real file in admin and release it to the portal.
- Download that file from the company portal.
- Check mobile at 375px and 430px widths.
- Confirm supplier cost, profit, staff notes, and internal document notes are hidden from corporate portal users.
