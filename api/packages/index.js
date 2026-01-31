import { supabase as supabaseClient, transformPackageFromDB, transformPackageToDB, generatePackageId } from '../lib/supabase.js';

const supabase = supabaseClient;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase not configured. Please set environment variables.' });
    }

    if (req.method === 'GET') {
      // GET /api/packages - Read all packages
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching packages:', error);
        return res.status(500).json({ error: 'Failed to fetch packages', details: error.message });
      }

      // Transform to match original JSON structure
      const packages = {
        threeStarPackages: [],
        fourStarPackages: [],
        fiveStarPackages: [],
        ramadanPackages: []
      };

      data.forEach(row => {
        const pkg = transformPackageFromDB(row);
        const categoryMap = {
          '3-star': 'threeStarPackages',
          '4-star': 'fourStarPackages',
          '5-star': 'fiveStarPackages',
          'ramadan': 'ramadanPackages'
        };
        const categoryKey = categoryMap[pkg.category];
        if (categoryKey) {
          packages[categoryKey].push(pkg);
        }
      });

      return res.status(200).json(packages);
    }

    if (req.method === 'POST') {
      // POST /api/packages - Add new package
      const newPackage = req.body;

      // Validate required fields
      if (!newPackage.category || !newPackage.packageTitle) {
        return res.status(400).json({ error: 'Category and package title are required' });
      }

      // Validate category
      const validCategories = ['3-star', '4-star', '5-star', 'ramadan'];
      if (!validCategories.includes(newPackage.category)) {
        return res.status(400).json({ error: 'Invalid category' });
      }

      // Generate packageId if not provided
      if (!newPackage.packageId) {
        newPackage.packageId = generatePackageId(newPackage.category);
      }

      // Transform to database format
      const dbPackage = transformPackageToDB(newPackage);

      // Insert into database
      const { data, error } = await supabase
        .from('packages')
        .insert([dbPackage])
        .select()
        .single();

      if (error) {
        console.error('Error inserting package:', error);
        return res.status(500).json({ error: 'Failed to add package', details: error.message });
      }

      const transformedPackage = transformPackageFromDB(data);
      return res.status(200).json({ success: true, package: transformedPackage });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
