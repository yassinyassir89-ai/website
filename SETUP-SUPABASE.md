# 🚀 Setup Supabase for Grow Beauty

This guide walks you through setting up a free Supabase project for the database + image storage.

---

## 1. Create Supabase Project (5 minutes)

1. Go to **https://supabase.com** and sign up (or login) with GitHub/email
2. Click **"New Project"**
3. Fill in:
   - **Name**: `grow-beauty`
   - **Database Password**: Generate a strong password — **save it somewhere safe!**
   - **Region**: `Europe West (eu-west-1)` — closest to Morocco for low latency
   - **Plan**: Free
4. Click **"Create new project"** and wait ~2 minutes for setup

---

## 2. Get Your Connection String (Database)

Once project is ready:

1. Go to **Settings (gear icon, bottom-left) → Database**
2. Scroll down to **"Connection string"** section
3. Pick the **"URI"** tab and choose **"Transaction"** mode (port 6543, with `pgbouncer=true`)
4. Copy the string. It looks like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
5. Replace `[YOUR-PASSWORD]` with the password you saved in step 1
6. This is your **`DATABASE_URL`**

For `DIRECT_URL` (used by Prisma migrations), use the **Session pooler** (port 5432) version:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
```

---

## 3. Get API Keys (for image uploads)

1. Go to **Settings → API**
2. Copy these two values:
   - **Project URL** → goes to `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → goes to `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (under "Project API keys") → goes to `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **KEEP THIS SECRET**

---

## 4. Create Storage Bucket for Product Images

1. Click **"Storage"** in the left sidebar
2. Click **"New bucket"**
3. Name: `products`
4. Check **"Public bucket"** ✅ (so customers can see the images)
5. Click **"Create bucket"**

### Set Storage Policies

1. Click on the `products` bucket → go to **"Policies"** tab
2. Add the following 2 policies:

**Policy 1 — Public read (so customers see images):**
- Click "New Policy" → Get started quickly → "Give users read access"
- Or write custom: `bucket_id = 'products'`, allowed operations: `SELECT`

**Policy 2 — Authenticated upload (so admin can upload):**
- Click "New Policy" → For full customization
- Name: `Allow service_role to upload`
- Operation: `INSERT`
- Target roles: `service_role` (this is the role I use server-side via SUPABASE_SERVICE_ROLE_KEY)
- USING expression: `bucket_id = 'products'`
- WITH CHECK expression: `bucket_id = 'products'`

---

## 5. Add Variables to `.env.local`

Open `c:\Users\hp\grow-beauty\.env.local` and add/update:

```env
DATABASE_URL="postgresql://postgres.xxxxx:YOURPASSWORD@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:YOURPASSWORD@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."
SUPABASE_SERVICE_ROLE_KEY="eyJ..."

NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="run: openssl rand -base64 32 to generate"

NEXT_PUBLIC_APP_URL="http://localhost:3001"
NEXT_PUBLIC_APP_NAME="Grow Beauty"
```

---

## 6. Apply the Database Schema

In your terminal at `c:\Users\hp\grow-beauty`:

```bash
npx prisma generate
npx prisma db push
```

This creates all the tables (Product, Category, User, etc.) on Supabase.

---

## 7. Seed Initial Data (Optional)

If you want to start with the 12 demo products:

```bash
npm run db:seed
```

---

## 8. Create Your Admin User

1. Run the dev server: `npm run dev`
2. Go to `http://localhost:3001/inscription` and create an account
3. In Supabase Dashboard → **Table Editor** → `User` table
4. Find your account and change `role` from `USER` to `ADMIN`
5. Re-login at `/connexion`
6. Visit `/admin/produits` — you should see the admin product manager

---

## 9. Add Same Env Variables to Hostinger Production

In **Hostinger Dashboard** → your domain → **Deployments** → **Environment variables**:

Add the same 6 variables. **Make sure to use the same values** as your local `.env.local`.

Then click **Redeploy**.

---

## ✅ Done!

You can now:
- Add new products via `/admin/produits` with image upload (drag from your computer) OR URL input
- Each product has French + Arabic names/descriptions
- Images are served from Supabase CDN globally
- Stock, prices, badges all manageable from the admin panel

---

## 💡 Troubleshooting

**"Can't reach database server"**
- Check `DATABASE_URL` password is URL-encoded if it contains special chars (`@` → `%40`, etc.)
- Make sure you used the **Transaction pooler** (port 6543)

**"Bucket not found" on upload**
- Bucket name must be exactly `products` (lowercase)
- Must be set as Public

**Upload returns 401 "Unauthorized"**
- You must be logged in as an ADMIN user
- Check `SUPABASE_SERVICE_ROLE_KEY` is set on the server (.env.local + Hostinger env vars)

**Images upload but don't show on the site**
- Check the bucket is **Public**
- Verify the public read policy is active in Storage → policies
