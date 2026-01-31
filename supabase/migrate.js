import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: SUPABASE_URL and SUPABASE_ANON_KEY must be set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Read packages from JSON file
async function readPackages() {
  const filePath = path.join(__dirname, '..', 'public', 'data', 'umrahPackages.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

// Transform package to database format
function transformPackage(pkg) {
  return {
    package_id: pkg.packageId,
    category: pkg.category,
    package_title: pkg.packageTitle,
    hotel_makkah: pkg.hotelMakkah || '',
    hotel_makkah_distance: pkg.hotelMakkahDistance || '',
    hotel_madinah: pkg.hotelMadinah || '',
    hotel_madinah_distance: pkg.hotelMadinahDistance || '',
    nights_makkah: pkg.nightsMakkah || 0,
    nights_madinah: pkg.nightsMadinah || 0,
    transport_type: pkg.transportType || '',
    price: pkg.price || '',
    currency: pkg.currency || 'GBP',
    duration: pkg.duration || '',
    inclusions: pkg.inclusions || [],
    exclusions: pkg.exclusions || [],
    badge: pkg.badge || null,
    image_url: pkg.imageUrl || null,
    featured: pkg.featured || false
  };
}

// Migrate packages to Supabase
async function migrate() {
  try {
    console.log('Reading packages from JSON...');
    const packagesData = await readPackages();
    
    const allPackages = [
      ...(packagesData.threeStarPackages || []),
      ...(packagesData.fourStarPackages || []),
      ...(packagesData.fiveStarPackages || []),
      ...(packagesData.ramadanPackages || [])
    ];

    console.log(`Found ${allPackages.length} packages to migrate`);

    // Clear existing packages (optional - comment out if you want to keep existing)
    // const { error: deleteError } = await supabase.from('packages').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // if (deleteError) console.error('Error clearing packages:', deleteError);

    // Insert packages in batches
    const batchSize = 10;
    for (let i = 0; i < allPackages.length; i += batchSize) {
      const batch = allPackages.slice(i, i + batchSize);
      const transformedBatch = batch.map(transformPackage);

      const { data, error } = await supabase
        .from('packages')
        .upsert(transformedBatch, { onConflict: 'package_id' });

      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      } else {
        console.log(`Migrated batch ${i / batchSize + 1} (${batch.length} packages)`);
      }
    }

    console.log('Migration completed!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();

