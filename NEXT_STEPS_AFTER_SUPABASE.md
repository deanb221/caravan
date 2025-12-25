# Next Steps After Supabase Setup

## ✅ You've Set Up Supabase - Great!

Now let's get your data into Supabase so Google can see it.

## Step 1: Add Environment Variables to Vercel

**Critical:** You need to add your Supabase keys to Vercel so the live site can connect.

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Select your project** (caravan)
3. **Go to Settings → Environment Variables**
4. **Add these two variables:**

   **Variable 1:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase Project URL (from Supabase dashboard → Settings → API)
   - Environment: Production, Preview, Development (check all)

   **Variable 2:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: Your Supabase Anon/Public Key (from Supabase dashboard → Settings → API)
   - Environment: Production, Preview, Development (check all)

5. **Click "Save"**
6. **Redeploy:** Go to Deployments → Click the 3 dots on latest deployment → Redeploy

## Step 2: Verify Local Environment Variables

Make sure you have `.env.local` in your project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Where to find these values:**
- Supabase Dashboard → Settings → API
- Copy "Project URL" → `NEXT_PUBLIC_SUPABASE_URL`
- Copy "anon public" key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Save Your Admin Data to Supabase

1. **Go to admin page:** `https://www.nicaravanhire.co.uk/admin` (or localhost if testing locally)
2. **Make sure all your caravans and sites are correct**
3. **Click "Save" on any caravan** (or edit and save)
4. **You should see:** "✅ Caravans saved to database"
5. **Click "Save" on any site** (or edit and save)
6. **You should see:** "✅ Sites saved to database"

**If you see errors:**
- Check that environment variables are set correctly
- Check that you ran the SQL in Supabase (see `SETUP_DATABASE.md`)
- Check browser console for errors

## Step 4: Verify Data is in Supabase

1. **Go to Supabase Dashboard**
2. **Click "Table Editor"** in the left sidebar
3. **You should see:**
   - `caravans` table with your caravan data
   - `caravan_sites` table with your site data

**If tables are empty:**
- Go back to admin and click "Save" on each caravan/site
- Or use the "Update Live Site" button in admin

## Step 5: Test the Live Site

1. **Wait 2-5 minutes** after redeploying Vercel
2. **Visit:** `https://www.nicaravanhire.co.uk/`
3. **Right-click → "View Page Source"**
4. **Search for one of your real caravan names** (Ctrl+F)
5. **If you see it:** ✅ Success! Google will see it too
6. **If you don't:** Check Vercel build logs for errors

## Step 6: Force Google to Re-Crawl

After your data is live on Vercel:

1. **Go to Google Search Console:** https://search.google.com/search-console
2. **Click "URL Inspection"** (top search bar)
3. **Enter:** `https://www.nicaravanhire.co.uk/`
4. **Click "Request Indexing"**
5. **Repeat for:**
   - `https://www.nicaravanhire.co.uk/caravans`
   - Each caravan detail page
   - Other important pages

**Or use sitemap:**
- In Search Console → Sitemaps
- Submit: `https://www.nicaravanhire.co.uk/sitemap.xml`
- Click "Request Indexing"

## Troubleshooting

### "Caravans saved to file" instead of "saved to database"
- Supabase environment variables not set in Vercel
- Or Supabase client not initialized
- Check Vercel environment variables

### "Failed to save" error
- Check Supabase dashboard → Table Editor → verify tables exist
- Check that you ran the SQL setup (see `supabase_setup.sql`)
- Check browser console for specific error

### Data not showing on live site
- Wait 2-5 minutes after Vercel redeploy
- Check Vercel build logs for errors
- Verify environment variables are set in Vercel
- Check Supabase dashboard to confirm data is there

### Still seeing placeholder data
- Make sure you clicked "Save" in admin after setting up Supabase
- Check Supabase Table Editor to verify data exists
- View page source to see what's actually in the HTML

## What Happens Now

✅ **Admin saves automatically** - Click "Save" → Data goes to Supabase  
✅ **Pages load from Supabase** - No more manual JSON updates  
✅ **Google sees real data** - Server-side rendering uses Supabase  
✅ **Fully automatic** - No more manual steps!

## Need Help?

If something isn't working:
1. Check Vercel build logs
2. Check browser console (F12)
3. Check Supabase dashboard → Table Editor
4. Verify environment variables are set correctly

