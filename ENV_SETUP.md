# Environment Variables Setup

## Where is `.env.local`?

The `.env.local` file is in the **root of your project** (same folder as `package.json`).

It's hidden by default because:
- It starts with a dot (`.env.local`)
- It contains sensitive information (API keys)
- It's in `.gitignore` (not committed to git)

## How to Create/Edit It

### Option 1: In Your Code Editor
1. Open your project in VS Code (or any editor)
2. In the root folder, create a new file named `.env.local`
3. Add your environment variables

### Option 2: Using File Explorer
1. Navigate to: `C:\Users\dean\Documents\cursur\Caravan`
2. Create a new file named `.env.local` (make sure it starts with a dot!)
3. Open it in Notepad or any text editor

### Option 3: Using Terminal
```bash
# In your project root
notepad .env.local
```

## What to Add

Once you have your Supabase credentials, add them to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=https://www.nicaravanhire.co.uk
```

## Important Notes

- ✅ `.env.local` is already in `.gitignore` (won't be committed)
- ✅ This file is for **local development** only
- ✅ For **Vercel production**, add the same variables in Vercel dashboard:
  - Go to your project in Vercel
  - Settings > Environment Variables
  - Add each variable

## Getting Supabase Credentials

See **`FIND_SUPABASE_KEYS.md`** for detailed step-by-step instructions with screenshots guide.

Quick version:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** (⚙️) > **API**
4. Copy:
   - **Project URL** (looks like `https://xxxxx.supabase.co`) → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** (long string starting with `eyJ...`) → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   
**Important:** Use the **anon/public** key, NOT the service_role key!

## After Adding Variables

1. **Restart your dev server** if it's running:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **Add to Vercel** (for production):
   - Vercel dashboard > Your project > Settings > Environment Variables
   - Add the same variables

3. **Test it:**
   - Make a change in admin
   - It should save to Supabase automatically!

