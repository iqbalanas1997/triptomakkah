import { supabase as supabaseClient } from '../lib/supabase.js';

const supabase = supabaseClient;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!supabase) {
      console.error('Supabase not configured');
      return res.status(500).json({ 
        error: 'Supabase not configured', 
        message: 'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables' 
      });
    }

    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    
    if (!body.image || !body.filename) {
      return res.status(400).json({ error: 'Image data and filename are required' });
    }

    // Handle base64 image
    const base64Data = body.image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const fileType = body.fileType || 'image/jpeg';
    
    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({ error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed' });
    }

    // Validate file size (5MB)
    if (buffer.length > 5 * 1024 * 1024) {
      return res.status(400).json({ error: 'File size must be less than 5MB' });
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = body.filename.match(/\.[0-9a-z]+$/i)?.[0] || '.jpg';
    const filename = `image-${uniqueSuffix}${ext}`;
    const filePath = `HotelPictures/${filename}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('package-images')
      .upload(filePath, buffer, {
        contentType: fileType,
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      
      // Check if bucket doesn't exist
      if (uploadError.message?.includes('Bucket not found') || uploadError.message?.includes('The resource was not found')) {
        return res.status(500).json({ 
          error: 'Storage bucket not found', 
          details: 'Please create a bucket named "package-images" in Supabase Storage and make it public' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Failed to upload image', 
        details: uploadError.message 
      });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('package-images')
      .getPublicUrl(filePath);

    const imageUrl = urlData.publicUrl;
    
    return res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.error('Upload handler error:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
