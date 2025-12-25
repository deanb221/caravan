# Updating Data Files for Google Indexing

## The Problem

Google's crawler doesn't execute JavaScript that runs in `useEffect`, so it only sees the initial server-rendered HTML. This means Google indexes the data from your source files (`data/caravans.ts` and `data/caravanSites.ts`), not the data stored in localStorage from the admin page.

## The Solution

To ensure Google sees your updated data and images, you need to:

1. **Export your admin data**
2. **Update the source files** with the exported data
3. **Commit and push** to trigger a rebuild
4. **Request Google to re-index** with cache clearing

## Step-by-Step Instructions

### Step 1: Export Your Admin Data

1. Go to your admin page: `https://www.nicaravanhire.co.uk/admin`
2. Click the **"Export Data"** button (for both Caravans and Sites sections)
3. This will download a JSON file with all your current data

### Step 2: Update Source Files

1. Open the downloaded JSON file
2. Copy the `caravans` array from the JSON
3. Open `data/caravans.ts` in your code editor
4. Replace the `caravans` array with your exported data
5. Do the same for `caravanSites` → `data/caravanSites.ts`

**Important:** Make sure the JSON structure matches the TypeScript types. The exported data should already be in the correct format.

### Step 3: Commit and Push

```bash
git add data/caravans.ts data/caravanSites.ts
git commit -m "Update caravan and site data from admin"
git push origin main
```

Vercel will automatically rebuild your site with the new data.

### Step 4: Request Google Re-Indexing

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property (`www.nicaravanhire.co.uk`)
3. Use **URL Inspection** tool:
   - Enter each page URL (homepage, caravan pages, etc.)
   - Click **"Request Indexing"**
   - Click **"Test Live URL"** → **"Request Indexing"**
4. Submit your sitemap again:
   - Go to **Sitemaps** in the left menu
   - Enter: `https://www.nicaravanhire.co.uk/sitemap.xml`
   - Click **"Submit"**
5. For faster cache clearing:
   - In URL Inspection, after requesting indexing, click **"View Tested Page"**
   - Use the **"Request Removal"** option if available (this clears Google's cache)

## What Changed in the Code

The pages have been converted to use **Static Site Generation (SSG)** with `getStaticProps`:

- **`pages/index.tsx`** - Homepage now uses `getStaticProps`
- **`pages/caravans/index.tsx`** - Caravan listing page uses `getStaticProps`
- **`pages/caravans/[slug].tsx`** - Individual caravan pages use `getStaticProps` and `getStaticPaths`

This means:
- ✅ Data is baked into the HTML at build time
- ✅ Google can see all the data and images in the initial HTML
- ✅ Pages still support localStorage for instant updates (progressive enhancement)
- ✅ Pages revalidate every hour (ISR - Incremental Static Regeneration)

## Future Updates

After you update the source files and push:
- The site will rebuild automatically on Vercel
- New data will be in the HTML that Google crawls
- You can request re-indexing to see changes faster

## Quick Reference

**Files to update:**
- `data/caravans.ts` - Caravan data
- `data/caravanSites.ts` - Caravan site data

**After updating:**
```bash
git add data/
git commit -m "Update data from admin"
git push origin main
```

Then request re-indexing in Google Search Console.

