# Deploying to Vercel - Step by Step Guide

## Method 1: Deploy via GitHub (Recommended - Easiest)

### Prerequisites
- Your code is pushed to GitHub (you already have this set up)
- A Vercel account (free)

### Steps:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" and choose "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

2. **Import Your Project**
   - After signing in, click "Add New..." → "Project"
   - You'll see a list of your GitHub repositories
   - Find and select your `caravan` repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Should auto-detect as "Next.js" ✅
   - **Root Directory**: Leave as `./` (default)
   - **Build Command**: Should be `npm run build` (auto-detected)
   - **Output Directory**: Leave as `.next` (auto-detected)
   - **Install Command**: Should be `npm install` (auto-detected)

4. **Environment Variables** (if needed)
   - If you add any environment variables later, you can add them here
   - For now, you don't need any

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your site will be live! 🎉

6. **Get Your Live URL**
   - After deployment, Vercel will give you a URL like: `your-project-name.vercel.app`
   - You can also add a custom domain later

### Automatic Deployments
- Every time you push to your `main` branch on GitHub, Vercel will automatically deploy
- You'll get a new preview URL for each pull request

---

## Method 2: Deploy via Vercel CLI (Alternative)

If you prefer using the command line:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - It will ask if you want to link to an existing project or create a new one
   - Choose your settings

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Important Notes

### ✅ Your Project is Ready
- Your `package.json` has all the correct scripts
- Next.js is configured properly
- No special Vercel configuration needed

### 📝 After Deployment

1. **Test Your Site**
   - Visit your Vercel URL
   - Test the booking form
   - Check all pages work correctly

2. **Custom Domain (Optional)**
   - In Vercel dashboard, go to your project → Settings → Domains
   - Add your custom domain (e.g., `nicaravanhire.co.uk`)
   - Follow DNS setup instructions

3. **Environment Variables**
   - If you need to change the booking email later, you can:
     - Update `config/booking.ts` and push to GitHub (auto-deploys)
     - Or use Vercel Environment Variables if you move config to env vars

### 🔄 Updating Your Site

Since you're using GitHub integration:
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. Vercel automatically deploys the changes (usually takes 2-3 minutes)

---

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Ensure TypeScript errors are fixed

### Images Not Loading
- External images should work (you've configured `next.config.js` with `remotePatterns`)
- If issues persist, check the image URLs are accessible

### Booking Form Not Working
- Test locally first: `npm run build && npm start`
- Check browser console for errors
- Verify `config/booking.ts` email is correct

---

## Quick Start Checklist

- [ ] Push latest code to GitHub
- [ ] Create Vercel account (via GitHub)
- [ ] Import project from GitHub
- [ ] Click Deploy
- [ ] Test your live site
- [ ] (Optional) Add custom domain

Your site should be live in about 5 minutes! 🚀




