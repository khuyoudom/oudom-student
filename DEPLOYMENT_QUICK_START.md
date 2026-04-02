# Vercel Deployment - Quick Start

## Your Project Repository
GitHub: https://github.com/khuyoudom/test-school
Vercel Account: https://vercel.com/khuyoudoms-projects

## Current Status ✓
- [x] Project code pushed to GitHub (main branch)
- [x] vercel.json configured correctly
- [x] package.json has proper start script
- [x] Bug fixes committed (search input escaping, template safety)
- [x] Environment documentation created

## Deployment Checklist

### ✓ COMPLETED (Ready to Deploy)
1. Git repository connected to GitHub
2. Code committed and pushed
3. Vercel.json configuration in place
4. Node.js version compatible (v20.19.2)
5. All dependencies listed in package.json

### ⚠️ BEFORE DEPLOYING - REQUIRED ACTIONS

#### 1. Create MongoDB Atlas Account (Cloud Database)
MongoDB on Vercel must be cloud-hosted (not localhost):
- Go to https://www.mongodb.com/cloud/atlas
- Create free account
- Build a cluster (free tier)
- Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/`

#### 2. Generate Secure Secrets
Open PowerShell and run:
```powershell
# Generate two random 32-character hex strings
-join (1..64 | ForEach-Object {'{0:x}' -f (Get-Random -Maximum 16)})
-join (1..64 | ForEach-Object {'{0:x}' -f (Get-Random -Maximum 16)})
```
Save these values for SESSION_SECRET and JWT_SECRET

#### 3. Deploy to Vercel

**Option A: Via Web Dashboard (Recommended)**
1. Go to https://vercel.com/khuyoudoms-projects
2. Click "Add New..." → "Project"
3. Select "khuyoudom/test-school" from GitHub
4. Before deploying, add Environment Variables:
   ```
   PORT=3000
   SESSION_SECRET=<paste generated value 1>
   JWT_SECRET=<paste generated value 2>
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dynamics_node?retryWrites=true&w=majority
   MONGODB_DB_NAME=dynamics_node
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=<secure password>
   MONGODB_SERVER_SELECTION_TIMEOUT_MS=10000
   ```
5. Click "Deploy"
6. Wait for build to complete (usually 2-5 minutes)
7. Vercel will provide your live URL

**Option B: Via Vercel CLI**
```bash
npm install -g vercel
cd c:\laragon\www\project\dynamics-node
vercel --prod
# Follow prompts to connect to your project
```

## Expected Live URL Format
After deployment, your URL will be similar to:
```
https://dynamics-node-khuyoudom.vercel.app
https://test-school-khuyoudom.vercel.app
# (Exact URL depends on Vercel's auto-naming)
```

## Verification After Deployment

Once deployed, test these URLs:
1. `https://your-project.vercel.app/` - Homepage
2. `https://your-project.vercel.app/products` - Products page
3. `https://your-project.vercel.app/health/mongodb` - MongoDB health check
4. `https://your-project.vercel.app/login` - Login page
5. `https://your-project.vercel.app/admin` - Admin dashboard

## Important Notes

### Serverless Limitations
- **File Uploads**: The `/public/uploads` directory is temporary
  - Files disappear after deployment
  - For production: integrate AWS S3 or Cloudinary
  
- **Database Persistence**: Must use cloud MongoDB (done)
  - Local SQLite doesn't work on Vercel
  
- **Cold Starts**: First request may take 5-15 seconds (normal for serverless)

### Troubleshooting

**Deploy fails:**
- Check GitHub repository is public or you have access
- Verify vercel.json exists in root
- Check package.json has correct "start" script

**MongoDB connection errors:**
- Verify MONGODB_URI is correct format
- Check MongoDB Atlas network access whitelist (allow all for testing)
- Test connection string locally first

**Admin dashboard not loading:**
- Seed data needs manual setup from `/api/auth/login`
- Create admin account: `admin@example.com` / your password

## Next Steps

1. **Immediate (do now):**
   - Set up MongoDB Atlas account → get connection string
   - Generate two secure secrets
   
2. **Deploy (web dashboard):**
   - Open https://vercel.com/khuyoudoms-projects
   - Connect your GitHub repo and add env variables
   - Click Deploy

3. **After Deployment:**
   - Test the endpoints listed above
   - Log in with admin credentials
   - Create sample data if needed

## Support

For issues with:
- **Vercel deployment**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Express.js**: https://expressjs.com/en/starter/basic-routing.html

---

**Current Git Status:**
- Repository: https://github.com/khuyoudom/test-school
- Latest commit: docs: add Vercel deployment guide
- Ready for deployment ✓
