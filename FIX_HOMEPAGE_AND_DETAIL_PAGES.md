# Fix: Homepage and Individual Caravan Pages Not Showing Data

## The Problem

- ✅ `/caravans` page works (shows real data)
- ❌ Homepage (`/`) shows placeholder data
- ❌ Individual caravan pages (`/caravans/[slug]`) show placeholder data

## Why This Happens

These pages were likely built **before** Supabase had data, so they're serving cached static HTML with placeholder data. Even though they use `revalidate: 60`, they need to be rebuilt to fetch fresh data.

## The Solution

### Option 1: Force Vercel Rebuild (Recommended)

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Select your project**
3. **Go to Deployments tab**
4. **Click the 3 dots (⋯) on the latest deployment**
5. **Click "Redeploy"**
6. **Wait 2-5 minutes** for rebuild

This will rebuild all pages with fresh data from Supabase.

### Option 2: Trigger Revalidation via API

If you have a revalidation endpoint set up, you can call it to force pages to rebuild.

### Option 3: Make a Small Change

Sometimes making a small change and pushing triggers a rebuild:

1. Make a tiny change (add a space, update a comment)
2. Push to git
3. Vercel will rebuild automatically

## Verify It's Fixed

After rebuild:

1. **Visit homepage:** `https://www.nicaravanhire.co.uk/`
2. **Right-click → "View Page Source"**
3. **Search for one of your real caravan names** (Ctrl+F)
4. **If you see it:** ✅ Success!
5. **If you don't:** Check Vercel build logs for errors

## Check Build Logs

If it's still not working:

1. **Vercel Dashboard → Deployments → Latest deployment**
2. **Click on the deployment to see build logs**
3. **Look for:**
   - `✅ Fetched X caravans from Supabase` (good!)
   - `⚠️ Supabase client not initialized` (env vars missing)
   - `⚠️ Supabase returned empty data` (no data in database)

## Common Issues

### "Supabase client not initialized"
- Environment variables not set in Vercel
- Go to Vercel → Settings → Environment Variables
- Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### "Supabase returned empty data"
- Data not saved to Supabase yet
- Go to admin page → Click "Save" on caravans/sites
- Verify in Supabase Table Editor that data exists

### Pages still showing placeholder after rebuild
- Check that Supabase has data (Table Editor)
- Check Vercel build logs for errors
- Verify environment variables are set correctly

## Quick Test

To test if Supabase is working:

1. **Go to admin:** `https://www.nicaravanhire.co.uk/admin`
2. **Click "Save" on any caravan**
3. **Should see:** "✅ Caravans saved to database"
4. **If you see:** "Caravans saved to file" → Supabase not configured

## After Fixing

Once pages show real data:

1. **Force Google to re-crawl** (Search Console → URL Inspection)
2. **Request indexing** for homepage and individual caravan pages
3. **Wait 24-48 hours** for Google to update

The key is: **All pages need to be rebuilt after Supabase is set up** to fetch fresh data.

