# How to Update Caravan Data on Live Site

## The Problem
Data added via the admin page is stored in **localStorage** (browser-only), which doesn't persist on the live Vercel site. New visitors see the default data from `data/caravans.ts` and `data/caravanSites.ts`.

## Solution: Export and Update Data Files

### Step 1: Export Your Data
1. Go to `/admin` on your local site
2. Click **"📥 Export Data"** button
3. A JSON file will download with all your caravans and sites

### Step 2: Update the Data Files
Once you have the exported JSON file, you can:

**Option A: Manual Update (Quick)**
1. Open the exported JSON file
2. Copy the `caravans` array
3. Replace the content in `data/caravans.ts` (the `caravans` array)
4. Copy the `sites` array  
5. Replace the content in `data/caravanSites.ts` (the `caravanSites` array)
6. Commit and push to GitHub

**Option B: Use the Import Feature**
1. On your local admin page, click **"📤 Import Data"**
2. Select the exported JSON file
3. Your data will be loaded into localStorage
4. Then export again if needed

### Step 3: Deploy to Live Site
After updating the data files:
```bash
git add data/caravans.ts data/caravanSites.ts
git commit -m "Update caravan and site data"
git push origin main
```

Vercel will automatically deploy the changes, and your caravans/sites will appear on the live site!

## Important Notes
- Always keep a backup of your exported data
- The export includes all caravans and sites from localStorage
- Images must be accessible URLs (not local files)
- After updating data files, the live site will show the new data to all visitors




