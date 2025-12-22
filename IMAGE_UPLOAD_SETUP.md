# Image Upload Setup Guide

## Overview
The admin page now supports uploading images directly instead of just using image URLs. Images are uploaded to Cloudinary (free cloud storage).

## Setup Cloudinary (Free Tier)

### Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. Verify your email

### Step 2: Get Your Credentials
1. Go to your Cloudinary Dashboard
2. Copy your **Cloud Name** (visible on dashboard)
3. Go to Settings → API Keys
4. Copy your **API Key** and **API Secret**

### Step 3: Create Upload Preset
1. Go to Settings → Upload
2. Scroll to "Upload presets"
3. Click "Add upload preset"
4. Name it: `caravan_uploads`
5. Set "Signing mode" to "Unsigned" (for easier setup)
6. Set "Folder" to: `caravan-hire`
7. Save

### Step 4: Add to Vercel Environment Variables
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add these variables:
   ```
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   CLOUDINARY_UPLOAD_PRESET=caravan_uploads
   ```
4. Redeploy your site

## How to Use

### Uploading Images in Admin Panel

1. **Go to Admin Page** (`/admin`)
2. **Add/Edit a Caravan:**
   - Click "Upload Image" button next to any image field
   - Select an image file (max 10MB)
   - Wait for upload to complete
   - Image URL will be automatically filled in

3. **Add/Edit a Caravan Site:**
   - Same process - click "Upload" button
   - Select image file
   - URL is automatically added

### Features
- ✅ Direct file upload (no need for external URLs)
- ✅ Image preview before saving
- ✅ Support for multiple images per caravan
- ✅ Automatic image optimization via Cloudinary
- ✅ Fallback to URL input if Cloudinary not configured
- ✅ Max file size: 10MB
- ✅ Supports: JPG, PNG, GIF, WebP

## Without Cloudinary (Testing)

If Cloudinary is not configured, the upload will still work but images will be stored as base64 data URLs. This is fine for testing but not recommended for production (images will be large).

## Troubleshooting

**Upload fails?**
- Check Cloudinary credentials in Vercel environment variables
- Verify upload preset exists and is set to "Unsigned"
- Check file size (must be under 10MB)
- Check browser console for errors

**Images not showing?**
- Verify Cloudinary URLs are accessible
- Check Next.js image configuration allows Cloudinary domain
- Verify image format is supported

**Need help?**
- Check Cloudinary dashboard for upload logs
- Review Vercel function logs
- Test with a small image first

## Alternative: Use Image URLs

You can still paste image URLs directly into the URL field if you prefer to host images elsewhere or use existing image URLs.

