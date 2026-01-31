# Vercel Deployment Notes

## Important: File System Limitations

⚠️ **Critical Limitation**: Vercel serverless functions run in a read-only file system (except `/tmp`). This means:

1. **File writes are NOT persistent** - Any changes to `umrahPackages.json` or uploaded images will be lost on the next deployment
2. **Uploaded images will be deleted** - Images uploaded through the admin dashboard won't persist

## Current Implementation

The admin dashboard API routes are set up as Vercel serverless functions in the `api/` directory:
- `api/packages/index.js` - GET and POST packages
- `api/packages/[id].js` - PUT and DELETE packages  
- `api/upload-image.js` - Image upload handler

## Solutions for Production

### Option 1: Use a Database (Recommended)
Replace file-based storage with a database:
- **Vercel Postgres** - Free tier available, easy integration
- **MongoDB Atlas** - Free tier available
- **Supabase** - Free tier, includes storage

### Option 2: Use External Storage
- **Cloudinary** - Free tier for image storage
- **AWS S3** - Pay-as-you-go
- **Vercel Blob Storage** - Integrated with Vercel

### Option 3: Use Vercel KV (Key-Value Store)
- Store package data in Vercel KV
- Store image URLs (upload images to external service)

## Migration Steps

1. **Set up database/storage service**
2. **Update API functions** to read/write from database instead of files
3. **Migrate existing data** from `umrahPackages.json` to database
4. **Update image upload** to use external storage service

## Temporary Workaround

For development/testing, you can:
- Use the local Express server (`npm run dev:server`)
- Deploy backend separately to Railway, Render, or similar service
- Use the admin dashboard locally only

## Current API Endpoints

All API endpoints are available at:
- `GET /api/packages` - Read all packages
- `POST /api/packages` - Add package
- `PUT /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package
- `POST /api/upload-image` - Upload image (base64)

## Next Steps

1. Choose a database/storage solution
2. Update API functions to use the chosen solution
3. Test thoroughly before production use

