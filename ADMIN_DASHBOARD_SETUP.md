# Admin Dashboard Setup Guide

## Overview
The Admin Dashboard allows you to manage Umrah packages without manually editing the JSON file. It provides a user-friendly interface for adding, editing, and deleting packages.

## Prerequisites
- Node.js installed
- All dependencies installed (`npm install`)

## Setup Instructions

### 1. Install Dependencies
The following packages have been added to `package.json`:
- `express` - Backend server
- `cors` - Cross-origin resource sharing
- `multer` - File upload handling
- `concurrently` - Run multiple scripts simultaneously

Run:
```bash
npm install
```

### 2. Start the Development Servers

You have two options:

**Option A: Run both servers separately (recommended for development)**

Terminal 1 - Start the backend server:
```bash
npm run dev:server
```

Terminal 2 - Start the frontend:
```bash
npm run dev
```

**Option B: Run both servers together**
```bash
npm run dev:all
```

### 3. Access the Admin Dashboard

Once both servers are running:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Admin Dashboard: http://localhost:3000/admin/packages

## Features

### Dashboard Page (`/admin/packages`)
- View all packages grouped by category:
  - 3 Star Packages
  - 4 Star Packages
  - 5 Star Packages
  - Ramadan Packages
- Each package card displays:
  - Package image
  - Package title
  - Duration
  - Price
  - Hotel information
  - Nights breakdown
  - Badge (if applicable)
  - Featured status
- Action buttons: Edit | Delete

### Add/Edit Package Form
- **Package Category**: Dropdown (3-star, 4-star, 5-star, ramadan)
- **Package Title**: Text input (required)
- **Hotel Makkah**: Text input (required)
- **Hotel Madinah**: Text input (required)
- **Nights in Makkah**: Number input (required)
- **Nights in Madinah**: Number input (required)
- **Transport Type**: Text input
- **Price**: Text input (required)
- **Currency**: Dropdown (GBP, USD, EUR)
- **Duration**: Text input (required)
- **Inclusions**: Dynamic list (add/remove items)
- **Exclusions**: Dynamic list (add/remove items)
- **Badge**: Optional text input
- **Featured**: Checkbox
- **Image Upload**: Upload images to `/public/images/HotelPictures/`

### Image Upload
- Supported formats: JPEG, JPG, PNG, WebP
- Maximum file size: 5MB
- Images are saved to: `public/images/HotelPictures/`
- Image URL is automatically added to the package JSON

## API Endpoints

### GET `/api/packages`
Read all packages from `umrahPackages.json`

### POST `/api/packages`
Add a new package
- Body: Package object (JSON)
- Auto-generates `packageId` if not provided

### PUT `/api/packages/:id`
Update an existing package
- URL parameter: `packageId`
- Body: Updated package object (JSON)
- Handles category changes (moves package to new category)

### DELETE `/api/packages/:id`
Delete a package
- URL parameter: `packageId`

### POST `/api/upload-image`
Upload an image file
- Form data: `image` (file)
- Returns: `{ success: true, imageUrl: "/images/HotelPictures/filename.jpg" }`

## File Structure

```
TripToMakkah/
├── server.js                          # Express backend server
├── public/
│   ├── data/
│   │   └── umrahPackages.json         # Package data (auto-updated)
│   └── images/
│       └── HotelPictures/            # Uploaded images
└── src/
    └── components/
        └── admin/
            ├── AdminDashboard.jsx    # Main dashboard page
            ├── PackageForm.jsx        # Add/Edit form
            ├── DeleteConfirmModal.jsx # Delete confirmation
            └── Toast.jsx              # Toast notifications
```

## Usage

### Adding a New Package
1. Click "Add Package" button
2. Fill in the required fields
3. Upload an image (optional)
4. Add inclusions/exclusions as needed
5. Click "Add Package" to save

### Editing a Package
1. Click "Edit" on any package card
2. Modify the fields as needed
3. Upload a new image if desired
4. Click "Update Package" to save

### Deleting a Package
1. Click "Delete" on any package card
2. Confirm deletion in the modal
3. Package is permanently removed

## Important Notes

- **JSON Structure**: The dashboard preserves the exact JSON structure. Do not manually edit `umrahPackages.json` while the server is running.
- **Package IDs**: Auto-generated if not provided when adding new packages
- **Category Changes**: If you change a package's category, it will be moved to the appropriate array
- **Image URLs**: Automatically formatted as `/images/HotelPictures/filename.jpg`
- **Validation**: Form validation ensures required fields are filled
- **Error Handling**: Toast notifications show success/error messages

## Troubleshooting

### Server won't start
- Ensure port 3001 is not in use
- Check that all dependencies are installed

### Images not uploading
- Verify `public/images/HotelPictures/` directory exists
- Check file size (must be < 5MB)
- Ensure file type is JPEG, PNG, or WebP

### Packages not saving
- Check server console for errors
- Verify `public/data/umrahPackages.json` is writable
- Ensure JSON structure is valid

### CORS errors
- Ensure backend server is running on port 3001
- Check Vite proxy configuration in `vite.config.js`

## Security Considerations

⚠️ **Important**: This admin dashboard has no authentication. In production:
1. Add authentication/authorization
2. Protect API routes
3. Validate all inputs server-side
4. Implement rate limiting
5. Add CSRF protection

For development use only!

