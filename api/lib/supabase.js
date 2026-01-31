import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

// Create client with fallback to prevent crashes
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Transform database row to package format
export function transformPackageFromDB(row) {
  return {
    packageId: row.package_id,
    category: row.category,
    packageTitle: row.package_title,
    hotelMakkah: row.hotel_makkah,
    hotelMakkahDistance: row.hotel_makkah_distance || '',
    hotelMadinah: row.hotel_madinah,
    hotelMadinahDistance: row.hotel_madinah_distance || '',
    nightsMakkah: row.nights_makkah,
    nightsMadinah: row.nights_madinah,
    transportType: row.transport_type || '',
    price: row.price,
    currency: row.currency || 'GBP',
    duration: row.duration,
    inclusions: row.inclusions || [],
    exclusions: row.exclusions || [],
    badge: row.badge || null,
    imageUrl: row.image_url || null,
    featured: row.featured || false
  };
}

// Transform package to database format
export function transformPackageToDB(pkg) {
  return {
    package_id: pkg.packageId,
    category: pkg.category,
    package_title: pkg.packageTitle,
    hotel_makkah: pkg.hotelMakkah,
    hotel_makkah_distance: pkg.hotelMakkahDistance || '',
    hotel_madinah: pkg.hotelMadinah,
    hotel_madinah_distance: pkg.hotelMadinahDistance || '',
    nights_makkah: pkg.nightsMakkah,
    nights_madinah: pkg.nightsMadinah,
    transport_type: pkg.transportType || '',
    price: pkg.price,
    currency: pkg.currency || 'GBP',
    duration: pkg.duration,
    inclusions: pkg.inclusions || [],
    exclusions: pkg.exclusions || [],
    badge: pkg.badge || null,
    image_url: pkg.imageUrl || null,
    featured: pkg.featured || false
  };
}

// Generate packageId
export function generatePackageId(category) {
  const prefix = category === 'ramadan' ? 'ramadan' : category.replace('-star', 'star');
  const timestamp = Date.now();
  return `${prefix}-${timestamp}`;
}

