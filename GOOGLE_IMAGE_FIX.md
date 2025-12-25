# Fixing Images Not Showing When Accessed via Google

## Problem
Images show correctly when accessing the site directly, but don't show when accessed via Google search results.

## Solutions Applied

### 1. Referrer Policy Headers
Added headers in `next.config.js` to allow images to load regardless of referrer:
- `Referrer-Policy: no-referrer-when-downgrade` for all pages
- Special handling for `/_next/image` endpoint

### 2. Cloudinary Domain Added
Added `res.cloudinary.com` to allowed image domains for uploaded images.

### 3. SEO Meta Tags
Added proper Open Graph and Twitter meta tags with absolute image URLs.

## Additional Steps to Fix Google Cache

### Step 1: Request Google to Recrawl Your Site
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property: `www.nicaravanhire.co.uk`
3. Verify ownership
4. Go to "URL Inspection" tool
5. Enter your homepage URL
6. Click "Request Indexing"

### Step 2: Clear Google's Cache
1. In Google Search Console, go to "Removals"
2. Click "New Request"
3. Enter your site URL
4. Select "Clear cached image"
5. Submit the request

### Step 3: Wait for Re-indexing
- Google typically re-crawls within a few days
- You can speed this up by submitting your sitemap in Search Console

## Testing

### Test Direct Access
```
https://www.nicaravanhire.co.uk
```
✅ Images should load correctly

### Test via Google
1. Search for "nicaravanhire.co.uk" on Google
2. Click the search result
3. Images should now load correctly

### Check Image URLs
All images should use absolute URLs or relative paths that work from any referrer:
- ✅ `/logo.png` (relative - works)
- ✅ `https://res.cloudinary.com/...` (absolute - works)
- ❌ `//example.com/image.jpg` (protocol-relative - may fail)

## If Images Still Don't Show

1. **Check Browser Console**
   - Open DevTools (F12)
   - Check Console for image loading errors
   - Check Network tab for failed image requests

2. **Check Image Sources**
   - Verify images exist at the specified URLs
   - Check if images are blocked by CORS or referrer policies

3. **Verify Next.js Image Configuration**
   - Check `next.config.js` has correct `remotePatterns`
   - Ensure Cloudinary domain is in allowed domains

4. **Check Vercel Deployment**
   - Verify images in `/public` folder are deployed
   - Check Vercel build logs for any image-related errors

## Common Issues

### Issue: Images load locally but not on Vercel
**Solution**: Ensure images in `/public` folder are committed to git and pushed.

### Issue: External images don't load
**Solution**: Add the domain to `remotePatterns` in `next.config.js`.

### Issue: Google shows old images
**Solution**: Request cache removal in Google Search Console and wait for re-crawl.




