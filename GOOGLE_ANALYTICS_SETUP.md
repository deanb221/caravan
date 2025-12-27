# Google Analytics Setup Guide

This guide will help you set up Google Analytics for your NI Caravan Hire website.

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Admin"** (gear icon) → **"Create Account"**

## Step 2: Set Up a Property

1. Enter an **Account name** (e.g., "NI Caravan Hire")
2. Click **"Next"**
3. Enter a **Property name** (e.g., "NI Caravan Hire Website")
4. Select your **Reporting time zone** and **Currency**
5. Click **"Next"**

## Step 3: Configure Business Information

1. Select your **Industry category** (e.g., "Travel & Tourism")
2. Select your **Business size**
3. Choose how you'll use Google Analytics (e.g., "Measure customer engagement")
4. Click **"Create"**
5. Accept the **Terms of Service**

## Step 4: Get Your Measurement ID

1. After creating the property, you'll see a **Data Streams** screen
2. Click **"Web"** to add a web stream
3. Enter your **Website URL**: `https://www.nicaravanhire.co.uk`
4. Enter a **Stream name** (e.g., "NI Caravan Hire Website")
5. Click **"Create stream"**
6. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
   - **Copy this ID** - you'll need it in the next step

## Step 5: Add the Measurement ID to Your Site

**Your Google Analytics ID**: `G-T46KXFFJN4`

The code is already configured with your ID as a fallback, so it will work immediately. However, for best practices, you can also set it as an environment variable:

### Option A: Local Development (.env.local) - Optional

1. Open or create `.env.local` in your project root
2. Add the following line:
   ```
   NEXT_PUBLIC_GA_ID=G-T46KXFFJN4
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Option B: Vercel Deployment - Optional

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **NI Caravan Hire** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Enter:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-T46KXFFJN4`
   - **Environment**: Select all (Production, Preview, Development)
6. Click **"Save"**
7. **Redeploy** your site for the changes to take effect

**Note**: The tracking code is already configured with your ID, so it will work even without setting the environment variable. Setting it as an environment variable is optional but recommended for easier management.

## Step 6: Verify It's Working

1. Visit your website: `https://www.nicaravanhire.co.uk`
2. Navigate to a few pages
3. Go back to Google Analytics
4. Click **"Reports"** → **"Realtime"**
5. You should see your visit appear within a few seconds

## What Gets Tracked

The following events are automatically tracked:

- **Page views** - Every time someone visits a page
- **Page navigation** - When users navigate between pages
- **User interactions** - Clicks, scrolls, and other engagement metrics

## Troubleshooting

### Analytics not showing data?

1. **Check your Measurement ID** - Make sure it's correct in your environment variables
2. **Wait a few minutes** - It can take 24-48 hours for data to appear in standard reports (Realtime should work immediately)
3. **Check browser console** - Open Developer Tools (F12) and look for any errors
4. **Verify deployment** - Make sure you've redeployed after adding the environment variable

### Still not working?

1. Check that `NEXT_PUBLIC_GA_ID` is set correctly
2. Make sure the environment variable is available in your deployment
3. Clear your browser cache and try again
4. Use Google Analytics DebugView to see if events are being sent

## Additional Resources

- [Google Analytics Help Center](https://support.google.com/analytics)
- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)

