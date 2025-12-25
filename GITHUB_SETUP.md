# GitHub Setup Instructions

## Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `ni-caravan-hire` (or your preferred name)
3. Choose Public or Private
4. **Don't** check "Initialize with README" (we already have files)
5. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, run these commands (replace `YOUR_USERNAME` with your GitHub username):

```bash
git push -u origin main
```

## Alternative: Using SSH (if you have SSH keys set up)

```bash
git remote add origin git@github.com:YOUR_USERNAME/ni-caravan-hire.git
git branch -M main
git push -u origin main
```

## Future Updates

After making changes to your code:

```bash
git add .
git commit -m "Your commit message"
git push
```














