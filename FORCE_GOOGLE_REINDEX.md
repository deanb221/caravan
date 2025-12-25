# Force Google to Re-Index with Cache Clearing

## The Problem

Google has separate caches for desktop and mobile. Even though your site is updated, Google's mobile cache may still be serving the old version from 5 days ago.

## Solution: Force Google to Re-Crawl and Clear Cache

### Step 1: Update Your Data Files (If Not Done Yet)

First, make sure your source files are updated:

1. Export data from `/admin` page
2. Update `data/caravans.ts` and `data/caravanSites.ts`
3. Commit and push:
   ```bash
   git add data/
   git commit -m "Update data files"
   git push origin main
   ```

Wait for Vercel to finish rebuilding (check Vercel dashboard).

### Step 2: Use Google Search Console URL Inspection Tool

This is the **most effective** way to force Google to re-crawl and clear cache:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `www.nicaravanhire.co.uk`
3. Click **"URL Inspection"** in the left menu
4. For each important page, do the following:

   **For Homepage:**
   - Enter: `https://www.nicaravanhire.co.uk/`
   - Click **"Test Live URL"**
   - Wait for it to test
   - Click **"Request Indexing"**
   - **Important:** After requesting, click **"View Tested Page"** → Look for **"Request Removal"** or **"Clear Cache"** option

   **For Caravan Pages:**
   - Enter each caravan URL, e.g.:
     - `https://www.nicaravanhire.co.uk/caravans/luxury-family-caravan`
     - `https://www.nicaravanhire.co.uk/caravans/compact-couples-retreat`
     - (etc. for all caravans)
   - For each: **"Test Live URL"** → **"Request Indexing"**

   **For Caravan Listing:**
   - `https://www.nicaravanhire.co.uk/caravans`
   - **"Test Live URL"** → **"Request Indexing"**

### Step 3: Submit Updated Sitemap

1. In Google Search Console, go to **"Sitemaps"** in the left menu
2. Remove the old sitemap entry (if any)
3. Add: `https://www.nicaravanhire.co.uk/sitemap.xml`
4. Click **"Submit"**
5. This will trigger Google to re-crawl all pages

### Step 4: Use Google's URL Removal Tool (For Immediate Cache Clearing)

1. In Google Search Console, go to **"Removals"** in the left menu
2. Click **"New Request"**
3. Enter each URL you want to remove from cache:
   - `https://www.nicaravanhire.co.uk/`
   - `https://www.nicaravanhire.co.uk/caravans`
   - Each individual caravan page
4. Select **"Clear this URL and its direct images from Google search results"**
5. Click **"Request Removal"**
6. **Note:** This temporarily removes the URL, then Google will re-crawl it fresh

### Step 5: Wait and Monitor

- Google typically re-crawls within 24-48 hours after requesting indexing
- You can check progress in **"URL Inspection"** tool
- Look for **"Last crawl"** date to confirm it's been re-crawled

### Step 6: Test on Mobile

After 24-48 hours:

1. On your mobile device, open an **incognito/private browser window**
2. Search for: `site:nicaravanhire.co.uk` in Google
3. Click through to your pages
4. The pages should now show the updated data

## Alternative: Force Mobile Cache Clear

If the above doesn't work, try these additional steps:

### Option A: Add Version Parameter (Temporary)

You can temporarily add a version parameter to force cache refresh:

1. Share your site URL with `?v=2` parameter:
   - `https://www.nicaravanhire.co.uk/?v=2`
   - This bypasses cache for users

2. Request indexing of the versioned URL in Google Search Console

### Option B: Check Vercel Build

Make sure Vercel has actually rebuilt with new data:

1. Go to Vercel dashboard
2. Check the latest deployment
3. Click on the deployment
4. View the build logs to ensure it completed successfully
5. Test the live URL directly (not through Google):
   - `https://www.nicaravanhire.co.uk/`
   - View page source (right-click → View Source)
   - Search for one of your new caravan names or images
   - If you see the new data in the HTML source, the build is correct

## Why This Happens

- Google caches HTML separately for desktop and mobile
- Mobile cache can persist longer than desktop cache
- Even after updating files, Google may serve cached versions
- The URL Inspection tool forces Google to fetch fresh content

## Prevention for Future Updates

After updating data files:
1. Always commit and push to trigger Vercel rebuild
2. Wait for Vercel build to complete
3. Immediately use URL Inspection to request re-indexing
4. This ensures Google sees updates within 24-48 hours instead of waiting weeks

## Quick Checklist

- [ ] Data files updated and pushed
- [ ] Vercel build completed successfully
- [ ] Tested live URL directly (not via Google) - shows new data
- [ ] Used URL Inspection for homepage
- [ ] Used URL Inspection for all caravan pages
- [ ] Submitted updated sitemap
- [ ] Requested removal/clear cache for key pages
- [ ] Waited 24-48 hours
- [ ] Tested on mobile in incognito mode

## Still Not Working?

If after 48 hours Google still shows old data:

1. **Check the actual HTML source:**
   - Visit your site directly (not via Google)
   - Right-click → View Source
   - Search for your new data/images
   - If it's NOT in the source, the build didn't include your updates

2. **Verify data files are correct:**
   - Check `data/caravans.ts` and `data/caravanSites.ts`
   - Make sure they have your latest data (not placeholder data)

3. **Check Vercel environment:**
   - Ensure Vercel is building from the correct branch
   - Check for any build errors in Vercel logs

4. **Contact Google Support:**
   - If everything else is correct, you can contact Google Search Console support
   - They can manually clear cache for your domain

