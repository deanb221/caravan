# Fix: Sites Still Showing Placeholder Data

## The Problem

- ✅ Caravans working on all pages (showing real data from Supabase)
- ❌ Sites still showing placeholder data on homepage and `/sites` page

## Why This Happens

**Most likely:** Sites data hasn't been saved to Supabase yet. You saved caravans, but not sites.

## The Solution

### Step 1: Save Sites to Supabase

1. **Go to admin page:** `https://www.nicaravanhire.co.uk/admin`
2. **Scroll down to the "Caravan Sites" section**
3. **Make sure all your sites are correct**
4. **Click "Save" on any site** (or edit and save)
5. **You should see:** "✅ Sites saved to database"

**If you see "Sites saved to file" instead:**
- Supabase not configured for sites
- Check that environment variables are set in Vercel
- See `NEXT_STEPS_AFTER_SUPABASE.md`

### Step 2: Verify Sites Are in Supabase

1. **Go to Supabase Dashboard**
2. **Click "Table Editor"** in the left sidebar
3. **Click on `caravan_sites` table**
4. **You should see your sites listed**

**If the table is empty:**
- Go back to admin and click "Save" on each site
- Or use the "Update Live Site" button in admin

### Step 3: Rebuild on Vercel

After saving sites to Supabase:

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Select your project**
3. **Go to Deployments tab**
4. **Click the 3 dots (⋯) on the latest deployment**
5. **Click "Redeploy"**
6. **Wait 2-5 minutes** for rebuild

This will rebuild pages with fresh sites data from Supabase.

### Step 4: Verify It's Fixed

After rebuild:

1. **Visit homepage:** `https://www.nicaravanhire.co.uk/`
2. **Scroll to the "Recommended Caravan Sites" section**
3. **Check if you see your real sites** (not placeholder)
4. **Visit `/sites` page** and verify

**Or check page source:**
1. Right-click → "View Page Source"
2. Search for one of your real site names (Ctrl+F)
3. If you see it: ✅ Success!

## Check Build Logs

If sites still show placeholder after rebuild:

1. **Vercel Dashboard → Deployments → Latest deployment**
2. **Click on the deployment to see build logs**
3. **Look for:**
   - `✅ Fetched X sites from Supabase` (good!)
   - `⚠️ Supabase returned empty data for sites` (sites not saved yet)
   - `⚠️ Supabase client not initialized` (env vars missing)

## Quick Test

To test if sites are in Supabase:

1. **Go to admin:** `https://www.nicaravanhire.co.uk/admin`
2. **Click "Save" on any site**
3. **Should see:** "✅ Sites saved to database"
4. **If you see:** "Sites saved to file" → Supabase not working for sites

## Common Issues

### "Sites saved to file" instead of "saved to database"
- Environment variables not set in Vercel
- Go to Vercel → Settings → Environment Variables
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set

### Sites table empty in Supabase
- Sites not saved yet
- Go to admin → Click "Save" on each site
- Or use "Update Live Site" button

### Still showing placeholder after rebuild
- Check Supabase Table Editor → verify sites exist
- Check Vercel build logs for errors
- Make sure you clicked "Save" in admin (not just edited)

## The Key Difference

- **Caravans:** ✅ Saved to Supabase → Working
- **Sites:** ❌ Not saved to Supabase yet → Still showing placeholder

**Solution:** Save sites in admin, then rebuild on Vercel.

