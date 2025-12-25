# How to Find Your Supabase Keys

## Step-by-Step Guide

### Step 1: Go to Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Sign in to your account
3. Select your project (or create one if you haven't)

### Step 2: Navigate to API Settings
1. In the left sidebar, click **"Settings"** (gear icon)
2. Click **"API"** in the settings menu

### Step 3: Find Your Keys

You'll see a page with several sections. Here's what you need:

#### 1. Project URL
- **Location:** Under "Project URL" section
- **Looks like:** `https://xxxxxxxxxxxxx.supabase.co`
- **Use for:** `NEXT_PUBLIC_SUPABASE_URL`

#### 2. API Keys
You'll see several keys. You need the **anon/public** key:

- **Location:** Under "Project API keys" section
- **Look for:** The key labeled **"anon"** or **"public"**
- **Looks like:** A long string starting with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Use for:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Important:** Use the **anon/public** key, NOT the service_role key (that one is secret and should never be exposed in client-side code).

### Step 4: Copy the Keys

1. **Project URL:**
   - Click the copy icon next to the URL
   - Or manually copy: `https://xxxxxxxxxxxxx.supabase.co`

2. **Anon Key:**
   - Click "Reveal" if it's hidden
   - Click the copy icon next to the anon key
   - Or manually copy the key

### Step 5: Add to Your `.env.local` File

Open `.env.local` in your project root and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2MjM5MDIyfQ.xxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://www.nicaravanhire.co.uk
```

Replace:
- `https://your-project-id.supabase.co` with your actual Project URL
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` with your actual anon key

### Step 6: Add to Vercel (For Production)

1. Go to: https://vercel.com/dashboard
2. Select your project: `caravan` (or whatever it's named)
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Name:** `NEXT_PUBLIC_SUPABASE_URL`
   - **Value:** Your Supabase project URL
   - Click "Add"
   
   - **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value:** Your anon key
   - Click "Add"

5. Make sure they're added to **Production**, **Preview**, and **Development** environments
6. Click "Save"

## Visual Guide

In Supabase Dashboard:
```
Settings (⚙️)
  └── API
      ├── Project URL: https://xxxxx.supabase.co  ← Copy this
      └── Project API keys:
          ├── anon public: eyJhbGci...  ← Copy this one
          └── service_role: [secret - don't use this]
```

## Quick Checklist

- [ ] Created Supabase account
- [ ] Created a project
- [ ] Ran the SQL from `supabase_setup.sql` to create tables
- [ ] Found Project URL in Settings > API
- [ ] Found anon/public key in Settings > API
- [ ] Added both to `.env.local` file
- [ ] Added both to Vercel environment variables
- [ ] Restarted dev server (if running)

## Troubleshooting

**"Can't find the API section":**
- Make sure you're in the correct project
- Look for "Settings" in the left sidebar (gear icon)

**"Which key should I use?"**
- Use the **anon/public** key (starts with `eyJ...`)
- Do NOT use the service_role key (it's secret)

**"Keys not working":**
- Make sure you copied the entire key (they're very long)
- Check for extra spaces when pasting
- Verify the keys are in both `.env.local` and Vercel

## Security Note

✅ **Safe to use:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` - This is meant to be public
❌ **Never expose:** `service_role` key - Keep this secret!

The anon key is safe because Row Level Security (RLS) policies control what users can do.

