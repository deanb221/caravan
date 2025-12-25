# Get Your Admin Data Live on the Site

## Quick Steps to Make Your Admin Data Live

Your admin data is stored in your browser's localStorage. To make it live on the website, follow these steps:

### Step 1: Export Your Data from Admin

1. Go to: `https://www.nicaravanhire.co.uk/admin`
2. Click the **"Export Data"** button
3. This downloads a JSON file with all your caravans and sites

### Step 2: Update the JSON Files

1. **Open the downloaded JSON file** in a text editor (Notepad, VS Code, etc.)
2. **Find the `caravans` array** - it looks like:
   ```json
   "caravans": [
     {
       "id": "...",
       "name": "...",
       ...
     }
   ]
   ```
3. **Copy ONLY the array content** (without the `"caravans":` part)
   - Copy from `[` to `]`
4. **Open `data/caravans.json`** in your code editor
5. **Replace everything** with the copied array
6. **Do the same for sites:**
   - Find the `caravanSites` array in the exported JSON
   - Copy the array content
   - Paste into `data/caravanSites.json`

### Step 3: Commit and Push

Run these commands in your terminal:

```bash
git add data/caravans.json data/caravanSites.json
git commit -m "Update with real caravan and site data from admin"
git push origin main
```

### Step 4: Wait for Vercel to Rebuild

- Vercel will automatically rebuild (takes 2-5 minutes)
- Check Vercel dashboard to see when it's done
- Your site will now show your real data!

### Step 5: Request Google Re-Indexing (Optional)

After the site rebuilds, use Google Search Console to request re-indexing (see `FORCE_GOOGLE_REINDEX.md`)

## Example: What the JSON Files Should Look Like

**`data/caravans.json`** should start like:
```json
[
  {
    "id": "1",
    "name": "Your Real Caravan Name",
    "slug": "your-real-caravan-slug",
    "images": [
      "https://res.cloudinary.com/.../your-image.jpg"
    ],
    ...
  }
]
```

**NOT:**
```json
[]
```

## Troubleshooting

### "Still showing placeholder data"
- Make sure you copied the **array content**, not the whole object
- Make sure the JSON files are valid (no syntax errors)
- Check that the files were committed and pushed

### "JSON file is empty"
- The JSON files should contain your data array, not be empty `[]`
- Re-export from admin and try again

### "Changes not showing after push"
- Wait for Vercel to finish rebuilding (check Vercel dashboard)
- Clear your browser cache
- Check that the JSON files have data in them

## Quick Reference

**Files to update:**
- `data/caravans.json` - Paste your caravans array here
- `data/caravanSites.json` - Paste your sites array here

**After updating:**
```bash
git add data/caravans.json data/caravanSites.json
git commit -m "Update data from admin"
git push origin main
```

That's it! Your data will be live in 2-5 minutes.

