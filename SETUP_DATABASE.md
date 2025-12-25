# Setup Database for Automatic Saving

## The Problem
Currently, you have to manually update JSON files every time you make changes. This is tedious and error-prone.

## The Solution: Use Supabase (Free Database)

Supabase is a free, easy-to-use database that will:
- ✅ Save your changes automatically
- ✅ No manual file updates needed
- ✅ Works instantly - changes appear immediately
- ✅ Free tier is perfect for your needs

## Quick Setup (10 minutes)

### Step 1: Create Supabase Account
1. Go to: https://supabase.com
2. Click "Start your project"
3. Sign up (free)
4. Create a new project
5. Note your:
   - Project URL (looks like: `https://xxxxx.supabase.co`)
   - API Key (in Settings > API)

### Step 2: Create Database Tables

In Supabase dashboard, go to "SQL Editor" and run:

```sql
-- Create caravans table
CREATE TABLE caravans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  sleeps INTEGER,
  berths INTEGER,
  images TEXT[],
  features TEXT[],
  pet_friendly BOOLEAN,
  pricing JSONB,
  availability JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create caravan_sites table
CREATE TABLE caravan_sites (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  description TEXT,
  image TEXT,
  website TEXT,
  features TEXT[],
  rating DECIMAL,
  facilities TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (allow public read, but you'll need auth for write)
ALTER TABLE caravans ENABLE ROW LEVEL SECURITY;
ALTER TABLE caravan_sites ENABLE ROW LEVEL SECURITY;

-- Create policies (allow anyone to read, but only authenticated users to write)
CREATE POLICY "Allow public read" ON caravans FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON caravan_sites FOR SELECT USING (true);
```

### Step 3: Add Environment Variables

Add these to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

And in Vercel dashboard, add the same environment variables.

### Step 4: Install Supabase

I'll update the code to use Supabase. This will make everything automatic!

## Benefits

- ✅ **Fully Automatic** - Changes save instantly, no manual steps
- ✅ **Always Live** - Your data is always up-to-date
- ✅ **Google-Friendly** - Database queries work with server-side rendering
- ✅ **Free** - Supabase free tier is perfect for your needs
- ✅ **Reliable** - No more file sync issues

## Alternative: Simpler File-Based Solution

If you don't want to set up a database, I can create a simpler solution that:
- Auto-commits to GitHub when you click "Save"
- Uses GitHub API to update files automatically
- Still requires GitHub token setup

But Supabase is the better long-term solution.

Would you like me to:
1. Set up Supabase integration (recommended - fully automatic)
2. Set up GitHub API auto-commit (simpler but requires GitHub token)

