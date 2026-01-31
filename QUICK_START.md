# Quick Start Guide - Supabase Integration

## 🚀 Get Your Admin Dashboard Running in 5 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Supabase Account & Project
1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project
3. Wait 2-3 minutes for setup to complete

### 3. Set Up Database
1. In Supabase dashboard → **SQL Editor**
2. Copy/paste contents from `supabase/schema.sql`
3. Click **Run**

### 4. Set Up Storage
1. Go to **Storage** → **New bucket**
2. Name: `package-images`
3. Make it **Public**
4. Add policy: Allow public read access

### 5. Configure Environment Variables

**For Vercel:**
1. Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon key
3. **Redeploy** your application

**For Local Development:**
1. Create `.env.local` file:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

### 6. Migrate Existing Data
```bash
npm run migrate
```

### 7. Deploy & Test
- Your admin dashboard will now work on Vercel!
- Data persists across deployments ✅
- Images are stored in Supabase ✅

## 📚 Full Documentation
See `SUPABASE_SETUP.md` for detailed instructions.

## 🆓 Free Tier Limits
- 500 MB database (thousands of packages)
- 1 GB file storage (hundreds of images)
- More than enough for your needs!

## 🔄 Future Migration
When you get paid hosting, you can easily export from Supabase and import to your new database. The code works with any PostgreSQL database.

