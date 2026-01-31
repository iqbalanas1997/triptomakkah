import { supabase as supabaseClient, transformPackageFromDB, transformPackageToDB } from '../lib/supabase.js';

const supabase = supabaseClient;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  const packageId = id;

  try {
    if (!supabase) {
      return res.status(500).json({ error: 'Supabase not configured. Please set environment variables.' });
    }

    if (req.method === 'PUT') {
      // PUT /api/packages/:id - Update package
      const updatedPackage = req.body;

      // Validate category if provided
      if (updatedPackage.category) {
        const validCategories = ['3-star', '4-star', '5-star', 'ramadan'];
        if (!validCategories.includes(updatedPackage.category)) {
          return res.status(400).json({ error: 'Invalid category' });
        }
      }

      // Transform to database format
      const dbPackage = transformPackageToDB({ ...updatedPackage, packageId });

      // Update in database
      const { data, error } = await supabase
        .from('packages')
        .update(dbPackage)
        .eq('package_id', packageId)
        .select()
        .single();

      if (error) {
        console.error('Error updating package:', error);
        if (error.code === 'PGRST116') {
          return res.status(404).json({ error: 'Package not found' });
        }
        return res.status(500).json({ error: 'Failed to update package', details: error.message });
      }

      const transformedPackage = transformPackageFromDB(data);
      return res.status(200).json({ success: true, package: transformedPackage });
    }

    if (req.method === 'DELETE') {
      // DELETE /api/packages/:id - Delete package
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('package_id', packageId);

      if (error) {
        console.error('Error deleting package:', error);
        return res.status(500).json({ error: 'Failed to delete package', details: error.message });
      }

      // Check if any rows were deleted
      const { data: checkData } = await supabase
        .from('packages')
        .select('package_id')
        .eq('package_id', packageId)
        .single();

      if (checkData) {
        return res.status(404).json({ error: 'Package not found' });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
