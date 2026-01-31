-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('3-star', '4-star', '5-star', 'ramadan')),
  package_title TEXT NOT NULL,
  hotel_makkah TEXT NOT NULL,
  hotel_makkah_distance TEXT DEFAULT '',
  hotel_madinah TEXT NOT NULL,
  hotel_madinah_distance TEXT DEFAULT '',
  nights_makkah INTEGER NOT NULL CHECK (nights_makkah > 0),
  nights_madinah INTEGER NOT NULL CHECK (nights_madinah > 0),
  transport_type TEXT DEFAULT '',
  price TEXT NOT NULL,
  currency TEXT DEFAULT 'GBP',
  duration TEXT NOT NULL,
  inclusions JSONB DEFAULT '[]'::jsonb,
  exclusions JSONB DEFAULT '[]'::jsonb,
  badge TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category);

-- Create index on package_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_packages_package_id ON packages(package_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON packages
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

