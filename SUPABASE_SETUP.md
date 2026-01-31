# Supabase Setup Guide

This guide will help you set up Supabase (free tier) for persistent data storage on Vercel.

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Create a new project:
   - **Name**: TripToMakkah (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
   - **Pricing Plan**: Free tier is sufficient

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run** to execute the SQL
5. Verify the table was created by going to **Table Editor** → You should see `packages` table

## Step 3: Set Up Storage Bucket

1. Go to **Storage** in the Supabase dashboard
2. Click **New bucket**
3. Create bucket with:
   - **Name**: `package-images`
   - **Public bucket**: ✅ Enable (so images are publicly accessible)
4. Click **Create bucket**
5. Go to **Policies** tab for the bucket
6. Click **New Policy** → **For full customization**
7. Add this policy (allows public read, authenticated write):

```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'package-images');

-- Allow authenticated insert (for uploads)
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'package-images');
```

Or use the simpler approach:
- Go to **Storage** → **Policies**
- Click **New Policy** → **Allow public access** (for read)
- Click **New Policy** → **Allow authenticated uploads** (for write)

## Step 4: Get API Credentials

1. Go to **Settings** → **API** in Supabase dashboard
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 5: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ... (your anon key)
```

**Important**: 
- Add these for **Production**, **Preview**, and **Development**
- After adding, **redeploy** your application

## Step 6: Migrate Existing Data

1. Create a `.env.local` file in your project root (for local migration):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ... (your anon key)
```

2. Run the migration script:

```bash
npm install
npm run migrate
```

This will copy all packages from `public/data/umrahPackages.json` to Supabase.

## Step 7: Verify Setup

1. Deploy to Vercel (or redeploy if already deployed)
2. Visit your admin dashboard: `https://your-domain.vercel.app/admin/packages`
3. Try adding/editing a package
4. Check Supabase dashboard → **Table Editor** → `packages` to see your data

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure you added the environment variables in Vercel
- Redeploy after adding environment variables

### "Failed to upload image"
- Check that the `package-images` bucket exists
- Verify bucket policies allow uploads
- Check Supabase Storage settings

### "Package not found" errors
- Run the migration script to populate the database
- Check Supabase dashboard to verify data exists

### Migration script errors
- Ensure `.env.local` has correct credentials
- Check that the `packages` table exists in Supabase
- Verify your JSON file path is correct

## Free Tier Limits

Supabase free tier includes:
- ✅ 500 MB database storage
- ✅ 1 GB file storage
- ✅ 2 GB bandwidth
- ✅ Unlimited API requests (with rate limits)

This is more than enough for most use cases!

## Future Migration to Paid Hosting

When you move to paid hosting:
1. Export data from Supabase (SQL dump)
2. Import to your new database
3. Update environment variables
4. Update API functions if needed (they should work with any PostgreSQL database)

The code is designed to work with any PostgreSQL database, so migration is straightforward.

