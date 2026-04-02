# GitHub Actions CI/CD Setup

This project includes automated deployment to Vercel on every push to `main` branch.

## 🔧 Setup Requirements

To enable automatic deployments, you need to add 3 secrets to your GitHub repository:

### Step 1: Get Vercel Tokens

1. **Vercel Token**
   - Go to: https://vercel.com/account/tokens
   - Click "Create Token"
   - Name: `VERCEL_TOKEN_DEPLOY`
   - Copy the token

2. **Vercel Org ID**
   - Go to: https://vercel.com/account/general
   - Find "Organization ID" 
   - Copy it

3. **Vercel Project ID**
   - Go to: https://vercel.com/khuyoudoms-projects
   - Click on your project
   - Go to Settings → General
   - Find "Project ID"
   - Copy it

### Step 2: Add Secrets to GitHub

1. Go to: https://github.com/khuyoudom/test-school/settings/secrets/actions
2. Click "New repository secret"
3. Add these 3 secrets:

   | Name | Value |
   |------|-------|
   | VERCEL_TOKEN | (paste from Step 1) |
   | VERCEL_ORG_ID | (paste from Step 1) |
   | VERCEL_PROJECT_ID | (paste from Step 1) |

### Step 3: Verify Setup

1. Go to: https://github.com/khuyoudom/test-school/actions
2. Make a small commit to `main` branch
3. Watch the workflow run automatically
4. Check status in "Actions" tab

## 📊 Workflow Details

The workflow (`.github/workflows/deploy.yml`) does:

1. **Install Dependencies**
   - Runs on Ubuntu
   - Node.js 20.x
   - Caches npm modules

2. **Build & Test**
   - Installs packages
   - Runs linting (if configured)
   - Runs tests (if configured)

3. **Deploy to Vercel**
   - Only on `main` branch
   - Uses Vercel CLI
   - Deploys to production

## 🚀 How It Works

```
git push origin main
    ↓
GitHub detects push to main
    ↓
Workflow triggers automatically
    ↓
Dependencies installed
    ↓
Tests run (optional)
    ↓
Vercel CLI deploys app
    ↓
Live app updated in <2 minutes
```

## ❌ Troubleshooting

### Workflow Fails: "Missing secrets"
**Solution:**
- Go to repo settings → Secrets & variables
- Add VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

### Workflow Fails: "Deploy failed"
**Solution:**
- Click on workflow run to see logs
- Check Vercel dashboard for build errors
- Verify environment variables are set in Vercel

### Workflow Doesn't Run
**Solution:**
- Check `.github/workflows/deploy.yml` exists
- Verify workflow is not disabled in Actions settings
- Try making a new commit to `main`

## 📝 Manual Deployment

If you need to deploy without GitHub Actions:

```bash
# Using Vercel CLI
npm install -g vercel
cd /path/to/project
vercel --prod
```

## 🔄 Environment Variables

Workflow uses GitHub Secrets for sensitive data:
- `VERCEL_TOKEN` - CLI authentication
- `VERCEL_ORG_ID` - Organization identifier
- `VERCEL_PROJECT_ID` - Project identifier

These are automatically injected during workflow execution.

## ✅ After Setup

1. ✅ Verify secrets are added to GitHub
2. ✅ Make a test commit to `main`
3. ✅ Watch workflow in Actions tab
4. ✅ Confirm deployment to Vercel
5. ✅ Test your live app

## 📞 Support

- **GitHub Actions Docs**: https://docs.github.com/actions
- **Vercel CLI Reference**: https://vercel.com/cli
- **Workflow Syntax**: https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions

---

**Status:** Ready to enable  
**Repository:** https://github.com/khuyoudom/test-school  
**Automation:** GitHub Actions + Vercel
