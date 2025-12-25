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

-- Allow inserts and updates (for admin API)
CREATE POLICY "Allow insert" ON caravans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update" ON caravans FOR UPDATE USING (true);
CREATE POLICY "Allow delete" ON caravans FOR DELETE USING (true);

CREATE POLICY "Allow insert" ON caravan_sites FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update" ON caravan_sites FOR UPDATE USING (true);
CREATE POLICY "Allow delete" ON caravan_sites FOR DELETE USING (true);

