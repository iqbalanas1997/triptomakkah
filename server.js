import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure upload directory exists
const uploadPath = path.join(__dirname, 'public', 'images', 'HotelPictures');
fs.mkdir(uploadPath, { recursive: true }).catch(console.error);

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed (jpeg, jpg, png, webp)'));
    }
  }
});

const PACKAGES_FILE = path.join(__dirname, 'public', 'data', 'umrahPackages.json');

// Helper function to read packages
async function readPackages() {
  try {
    const data = await fs.readFile(PACKAGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading packages:', error);
    throw error;
  }
}

// Helper function to write packages
async function writePackages(data) {
  try {
    await fs.writeFile(PACKAGES_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing packages:', error);
    throw error;
  }
}

// Helper function to generate packageId
function generatePackageId(category) {
  const prefix = category === 'ramadan' ? 'ramadan' : category.replace('-star', 'star');
  const timestamp = Date.now();
  return `${prefix}-${timestamp}`;
}

// Helper function to find package by ID
function findPackageById(packages, packageId) {
  const categories = ['threeStarPackages', 'fourStarPackages', 'fiveStarPackages', 'ramadanPackages'];
  
  for (const category of categories) {
    const index = packages[category].findIndex(pkg => pkg.packageId === packageId);
    if (index !== -1) {
      return { category, index, package: packages[category][index] };
    }
  }
  return null;
}

// GET /api/packages - Read all packages
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await readPackages();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read packages' });
  }
});

// POST /api/packages - Add new package
app.post('/api/packages', async (req, res) => {
  try {
    const packages = await readPackages();
    const newPackage = req.body;
    
    // Validate required fields
    if (!newPackage.category || !newPackage.packageTitle) {
      return res.status(400).json({ error: 'Category and package title are required' });
    }
    
    // Generate packageId if not provided
    if (!newPackage.packageId) {
      newPackage.packageId = generatePackageId(newPackage.category);
    }
    
    // Map category to array key
    const categoryMap = {
      '3-star': 'threeStarPackages',
      '4-star': 'fourStarPackages',
      '5-star': 'fiveStarPackages',
      'ramadan': 'ramadanPackages'
    };
    
    const categoryKey = categoryMap[newPackage.category];
    if (!categoryKey) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    // Ensure arrays exist
    if (!packages[categoryKey]) {
      packages[categoryKey] = [];
    }
    
    // Add package
    packages[categoryKey].push(newPackage);
    
    await writePackages(packages);
    res.json({ success: true, package: newPackage });
  } catch (error) {
    console.error('Error adding package:', error);
    res.status(500).json({ error: 'Failed to add package' });
  }
});

// PUT /api/packages/:id - Update package
app.put('/api/packages/:id', async (req, res) => {
  try {
    const packages = await readPackages();
    const packageId = req.params.id;
    const updatedPackage = req.body;
    
    const found = findPackageById(packages, packageId);
    if (!found) {
      return res.status(404).json({ error: 'Package not found' });
    }
    
    // If category changed, move package to new category
    if (updatedPackage.category && updatedPackage.category !== found.package.category) {
      const categoryMap = {
        '3-star': 'threeStarPackages',
        '4-star': 'fourStarPackages',
        '5-star': 'fiveStarPackages',
        'ramadan': 'ramadanPackages'
      };
      
      const oldCategoryKey = found.category;
      const newCategoryKey = categoryMap[updatedPackage.category];
      
      if (!newCategoryKey) {
        return res.status(400).json({ error: 'Invalid category' });
      }
      
      // Remove from old category
      packages[oldCategoryKey].splice(found.index, 1);
      
      // Add to new category
      if (!packages[newCategoryKey]) {
        packages[newCategoryKey] = [];
      }
      packages[newCategoryKey].push({ ...found.package, ...updatedPackage });
    } else {
      // Update in place
      packages[found.category][found.index] = { ...found.package, ...updatedPackage };
    }
    
    await writePackages(packages);
    res.json({ success: true, package: packages[found.category][found.index] });
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ error: 'Failed to update package' });
  }
});

// DELETE /api/packages/:id - Delete package
app.delete('/api/packages/:id', async (req, res) => {
  try {
    const packages = await readPackages();
    const packageId = req.params.id;
    
    const found = findPackageById(packages, packageId);
    if (!found) {
      return res.status(404).json({ error: 'Package not found' });
    }
    
    packages[found.category].splice(found.index, 1);
    await writePackages(packages);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ error: 'Failed to delete package' });
  }
});

// POST /api/upload-image - Upload image
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const imageUrl = `/images/HotelPictures/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

