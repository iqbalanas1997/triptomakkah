# Troubleshooting Guide

## Error: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

This error means the API is returning HTML instead of JSON. Here's how to fix it:

### Common Causes & Solutions

#### 1. Supabase Not Configured
**Symptom**: API returns HTML error page

**Solution**:
1. Check Vercel environment variables:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
   - Make sure they're added for **Production**, **Preview**, and **Development**
2. **Redeploy** after adding environment variables

#### 2. Storage Bucket Not Created
**Symptom**: Upload fails with "Bucket not found" error

**Solution**:
1. Go to Supabase Dashboard → Storage
2. Create a bucket named `package-images`
3. Make it **Public**
4. Add policies:
   - Public read access
   - Authenticated upload access

#### 3. API Route Not Found
**Symptom**: 404 error, returns index.html

**Solution**:
- Verify `api/upload-image.js` exists
- Check that `vercel.json` has the correct rewrite rules
- Redeploy after making changes

#### 4. CORS Issues
**Symptom**: Network errors in browser console

**Solution**:
- API functions already include CORS headers
- Check browser console for specific CORS errors
- Verify the API endpoint URL is correct

### Debugging Steps

1. **Check Browser Console**:
   - Open DevTools → Network tab
   - Try uploading an image
   - Check the `/api/upload-image` request
   - Look at the Response tab to see what's being returned

2. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on the function that's failing
   - Check the logs for error messages

3. **Test API Directly**:
   ```bash
   curl -X POST https://your-domain.vercel.app/api/upload-image \
     -H "Content-Type: application/json" \
     -d '{"image":"data:image/jpeg;base64,...","filename":"test.jpg","fileType":"image/jpeg"}'
   ```

4. **Verify Environment Variables**:
   - In Vercel, check that variables are set correctly
   - Variable names must match exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
   - No extra spaces or quotes

### Quick Fix Checklist

- [ ] Supabase project created
- [ ] Database schema run (from `supabase/schema.sql`)
- [ ] Storage bucket `package-images` created and made public
- [ ] Environment variables set in Vercel
- [ ] Application redeployed after setting environment variables
- [ ] Browser console checked for specific errors

### Still Not Working?

1. Check Vercel function logs for detailed error messages
2. Verify Supabase dashboard shows your project is active
3. Test with a simple API call to verify the route works
4. Make sure you're using the correct Supabase URL and key (from Settings → API)

