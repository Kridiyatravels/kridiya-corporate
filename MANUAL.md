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
- Contact page
- Thank-you page
- Shared corporate CSS mapped to the main Kridiya orange/gold/cream palette
- Airport-style request/search UI
- Supabase publishable-key connection pattern
- FormSubmit email fallback to `corporate@kridiyatravel.com`
- GitHub Pages `CNAME`
- `robots.txt`
- `sitemap.xml`

## Manual Steps For You

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

6. In Supabase Auth URL settings, add later:
   - `https://corporate.kridiyatravel.com`
   - `https://corporate.kridiyatravel.com/portal.html`

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

## Important Security Rule

Never place Supabase service role keys, GoDaddy credentials, email passwords, or admin secrets in this repo.
