# Admin Approval Button Implementation

Purpose:

Add a staff-admin button that converts a corporate application enquiry into an approved corporate account, links a Supabase Auth user, and activates portal access without manually running SQL.

Current blocker:

The workspace only contains `admin.html`, which redirects to `https://admin.kridiyatravel.com/`. The real admin app source is not present here. Use this document when the real admin source is available.

## Where The Button Should Appear

Recommended placement:

- Admin Enquiries page
- Only for enquiries where:
  - `reference` starts with `KD-COA-`
  - or `details.Request_type = Corporate account setup`
  - or `summary` contains corporate account/application wording

Button label:

```text
Approve corporate portal account
```

Secondary actions:

```text
Create Auth user
Copy enquiry ID
Open company record
Send login instructions
```

## Required Staff Permissions

The RPC checks these permissions for signed-in staff:

```text
create_bookings
edit_corporates
```

If staff lacks either permission, show:

```text
You need booking creation and corporate edit permission to approve corporate accounts.
```

## Supabase RPC

Function:

```text
public.approve_corporate_application(
  p_enquiry_id uuid,
  p_auth_user_id uuid,
  p_role text default 'travel_coordinator',
  p_can_request boolean default true,
  p_can_approve_quotes boolean default false,
  p_can_view_finance boolean default false,
  p_can_view_documents boolean default true,
  p_notes text default null
)
```

JavaScript call:

```js
const { data, error } = await supabase.rpc("approve_corporate_application", {
  p_enquiry_id: enquiryId,
  p_auth_user_id: authUserId || null,
  p_role: role || "travel_coordinator",
  p_can_request: true,
  p_can_approve_quotes: false,
  p_can_view_finance: false,
  p_can_view_documents: true,
  p_notes: notes || "Approved corporate portal account"
});

if (error) throw error;
```

Expected success shape:

```json
{
  "ok": true,
  "booking_id": "...",
  "corporate_account_id": "...",
  "corporate_contact_id": "...",
  "corporate_portal_member_id": "...",
  "portal_status": "active"
}
```

## Modal Fields

Approval modal should show:

- Company name
- Contact name
- Email
- Phone/WhatsApp
- Service needs
- Monthly travel volume
- Billing/LPO notes
- Internal approval notes

Required staff inputs:

- Auth user ID
- Portal role
- Can request
- Can approve quotes
- Can view finance
- Can view documents
- LPO required
- Approval note

Recommended defaults:

```text
role = travel_coordinator
can_request = true
can_approve_quotes = false
can_view_finance = false
can_view_documents = true
lpo_required = true
```

Finance/admin defaults:

```text
role = company_admin
can_request = true
can_approve_quotes = true
can_view_finance = true
can_view_documents = true
lpo_required = true
```

## Auth User Creation

Best staff flow:

1. Staff clicks `Create Auth user`.
2. Admin asks for:
   - Email
   - Temporary password
   - Email confirmation setting
3. Admin creates Supabase Auth user.
4. Admin copies returned Auth user ID into approval modal.
5. Staff clicks `Approve corporate portal account`.
6. Admin sends login instructions privately.

Do not display the password after creation except in the immediate staff confirmation step.

## UI States

Before approval:

```text
Status: Corporate application received
Action: Approve corporate portal account
```

During approval:

```text
Approving account...
```

After approval:

```text
Corporate portal account active
Company account: [company name]
Portal member: [role]
Next: Send login details
```

Error states:

```text
Corporate application enquiry not found
Corporate Auth user not found
Company name is required on the enquiry details
Booking creation permission required
Corporate edit permission required
```

## Tables Updated By Approval

The RPC creates or updates:

```text
public.corporate_accounts
public.corporate_contacts
public.corporate_portal_members
public.bookings
public.enquiries
public.customers
```

## After Approval Checklist

Staff should confirm:

- Enquiry status changed to confirmed
- Corporate account exists and is active
- Corporate contact exists
- Portal member exists and is active
- Converted booking exists
- Company can login at:

```text
https://corporate.kridiyatravel.com/login.html?next=corporate-account.html
```

- Company test request appears in admin bookings under the same corporate account

## Safe Login Message Template

Subject:

```text
Kridiya Business Travel corporate portal access
```

Body:

```text
Dear [Name],

Your Kridiya Business Travel corporate portal access has been activated.

Login page:
https://corporate.kridiyatravel.com/login.html?next=corporate-account.html

Username:
[email]

Temporary password:
[temporary password]

Please sign in and send one test request so we can confirm your company account is linked correctly.

Regards,
Kridiya Business Travel
corporate@kridiyatravel.com
+971 50 941 3873
```

## Test Cases

Happy path:

- Corporate application enquiry exists
- Auth user exists
- Staff has `create_bookings` and `edit_corporates`
- RPC returns `ok: true`
- Portal member becomes active

Missing auth user:

- Use a random UUID
- RPC should show `Corporate Auth user not found`

Missing company name:

- Remove company name from enquiry details
- RPC should show `Company name is required on the enquiry details`

Permission test:

- Staff without required permissions clicks approve
- UI should block or RPC should return permission error

Duplicate approval:

- Run approval again for the same enquiry/user
- Should not create duplicate portal member for same company/user

Portal isolation:

- Login as company user
- Confirm only linked company bookings/documents/quotes appear
- Confirm supplier cost/profit/internal notes do not appear
