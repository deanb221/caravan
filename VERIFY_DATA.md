# Verify Your Data Files Are Updated

## Quick Check: Are Your Data Files Updated?

Before trying to force Google to re-index, **verify that your source data files actually contain your new data** (not placeholder data).

### Step 1: Check Your Caravan Data File

Open `data/caravans.ts` and look for:

- ❌ **Old/Placeholder Data:** If you see "Luxury Family Caravan", "Compact Couples Retreat" with Unsplash images
- ✅ **Your Real Data:** If you see your actual caravan names, descriptions, and Cloudinary/real images

### Step 2: Check Your Site Data File

Open `data/caravanSites.ts` and verify it has your actual site data.

### Step 3: If Files Still Have Placeholder Data

You need to export from admin and update the files:

1. **Go to Admin Page:**
   - Visit: `https://www.nicaravanhire.co.uk/admin`
   - Click **"Export Data"** button (for both Caravans and Sites)

2. **Update the Files:**
   - Open the downloaded JSON file
   - Copy the `caravans` array
   - Paste it into `data/caravans.ts` (replace the existing array)
   - Do the same for `caravanSites` → `data/caravanSites.ts`

3. **Verify the Structure:**
   - Make sure each caravan has:
     - `id`, `name`, `slug`
     - `images` array with your actual image URLs (Cloudinary URLs)
     - `description`, `shortDescription`
     - `pricing` object
     - All other required fields

4. **Commit and Push:**
   ```bash
   git add data/caravans.ts data/caravanSites.ts
   git commit -m "Update with real caravan and site data"
   git push origin main
   ```

5. **Wait for Vercel Build:**
   - Check Vercel dashboard
   - Wait for build to complete
   - Check build logs for errors

6. **Test the Live Site:**
   - Visit: `https://www.nicaravanhire.co.uk/`
   - Right-click → **"View Page Source"**
   - Search for one of your caravan names
   - If you see it in the HTML source, the data is correct!

## How to View Page Source on Mobile

On mobile devices, it's harder to view source. Instead:

1. **Test on Desktop First:**
   - Visit your site directly (not via Google)
   - View page source
   - Verify your data is in the HTML

2. **Then Test on Mobile:**
   - Use a mobile browser
   - Visit the site directly (type URL, don't search)
   - If it shows correct data when visiting directly, the issue is Google's cache

## Common Issues

### Issue: "I updated the files but still see old data"

**Solution:**
- Make sure you saved the files
- Make sure you committed and pushed
- Check Vercel build logs for errors
- Wait for Vercel build to complete (can take 2-5 minutes)

### Issue: "Vercel build succeeded but site still shows old data"

**Solution:**
- Clear your browser cache
- Try incognito/private mode
- Check if Vercel is using the correct branch
- Verify the deployment URL matches your domain

### Issue: "Data files look correct but Google shows old data"

**Solution:**
- This is a Google cache issue
- Follow the steps in `FORCE_GOOGLE_REINDEX.md`
- Use Google Search Console URL Inspection tool
- Request indexing for each page

## Quick Verification Commands

If you have access to the terminal:

```bash
# Check if files were modified recently
git log --oneline -5 data/caravans.ts data/caravanSites.ts

# View the current data (first caravan name)
grep -A 2 '"name"' data/caravans.ts | head -3

# Check if Cloudinary URLs are present (your real images)
grep -i "cloudinary" data/caravans.ts
```

If you see Cloudinary URLs, your data is likely updated. If you see Unsplash URLs, you still have placeholder data.

