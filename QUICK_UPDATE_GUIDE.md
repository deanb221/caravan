# Quick Guide: Get Your Admin Data Live

## Step-by-Step (Takes 5 minutes)

### 1. Export from Admin
- Go to: `https://www.nicaravanhire.co.uk/admin`
- Click **"Export Data"** button
- File downloads: `caravan-data-YYYY-MM-DD.json`

### 2. Update JSON Files

**For Caravans:**
1. Open the downloaded JSON file
2. Find the `"caravans"` section - it looks like:
   ```json
   "caravans": [
     {
       "id": "1",
       "name": "Your Caravan Name",
       ...
     }
   ]
   ```
3. Copy **ONLY the array** (from `[` to `]`)
4. Open `data/caravans.json` in your editor
5. **Delete everything** and paste the array
6. Save the file

**For Sites:**
1. In the same JSON file, find `"caravanSites"`
2. Copy the array (from `[` to `]`)
3. Open `data/caravanSites.json`
4. **Delete everything** and paste the array
5. Save the file

### 3. Commit and Push

Run these commands in your terminal:

```bash
git add data/caravans.json data/caravanSites.json
git commit -m "Update with real data from admin"
git push origin main
```

### 4. Done!
- Vercel rebuilds automatically (2-5 minutes)
- Your site will show your real data!

## Example: What the Files Should Look Like

**`data/caravans.json`** should be:
```json
[
  {
    "id": "1",
    "name": "Your Real Caravan",
    "slug": "your-real-slug",
    "images": ["https://res.cloudinary.com/.../image.jpg"],
    ...
  }
]
```

**NOT:**
```json
[]
```

## Need Help?

If the JSON files are still empty after exporting, make sure you:
- Copied the **array content** (the `[...]` part)
- Not the whole object with `"caravans":` wrapper
- Pasted it into the files correctly

