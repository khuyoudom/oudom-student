# 🚀 DEPLOYMENT TO VERCEL - FINAL INSTRUCTIONS

**Status:** ✅ Application is fully tested and ready to deploy  
**Repository:** https://github.com/khuyoudom/test-school  
**Vercel Account:** https://vercel.com/khuyoudoms-projects

---

## 📋 BEFORE YOU START

Make sure you have:
- [ ] A GitHub account (you already have this)
- [ ] A Vercel account (free tier available: https://vercel.com)
- [ ] A MongoDB Atlas account (free tier available: https://www.mongodb.com/cloud/atlas)

---

## 🔧 STEP 1: Set Up MongoDB Atlas (REQUIRED - Do This First)

MongoDB cannot run on localhost in Vercel. You MUST use cloud MongoDB.

### Instructions:

1. **Go to MongoDB Atlas**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Sign up or log in with your account

2. **Create a New Project**
   - Click "Create Project"
   - Name it (e.g., "dynamics-node")
   - Click "Create Project"

3. **Build a Cluster**
   - Click "Build a Database"
   - Choose "Shared" (free, perfect for testing)
   - Select your region (closest to you)
   - Click "Create Cluster"
   - Wait 5-10 minutes for cluster to be created

4. **Create Database User**
   - In left sidebar, click "Database Access"
   - Click "Add New Database User"
   - Username: `nodeapp` (or any name)
   - Password: Generate a strong password, copy it
   - Database User Privileges: "Read and write to any database"
   - Click "Create Database User"

5. **Get Connection String**
   - In left sidebar, click "Cluster" → "Connect"
   - Click "Drivers" (not shell)
   - Select "Node.js" driver
   - Copy the connection string (looks like this):
     ```
     mongodb+srv://nodeapp:PASSWORD@cluster0.abc123xyz.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `PASSWORD` with the password you created
   - Keep this string safe - you'll need it for Vercel

6. **Allow Network Access**
   - In left sidebar, click "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development, restrictive in production)
   - Click "Confirm"

✅ **MongoDB Setup Complete!** You now have your connection string.

---

## 🔐 STEP 2: Generate Security Secrets

You need two random security tokens for your app.

### On Windows (PowerShell):

Open PowerShell and run this command twice to generate two tokens:

```powershell
-join (1..64 | ForEach-Object {'{0:x}' -f (Get-Random -Maximum 16)})
```

This gives you a random 32-character hex string. Run it twice and save both values:
- **Token 1**: Use as `SESSION_SECRET`
- **Token 2**: Use as `JWT_SECRET`

Example output (your values will be different):
```
a47f2e8b9c1d6f3e4a7b2c8d9e1f3a4b
e7f2a4c8b1d3e5f7a2c4e6f8b1d3e5f7
```

✅ **You now have:** 
- MongoDB connection string
- SESSION_SECRET
- JWT_SECRET

---

## 🚀 STEP 3: Deploy to Vercel

### Method A: Using Vercel Web Dashboard (Recommended - No CLI needed)

1. **Go to Vercel Dashboard**
   - Open: https://vercel.com/khuyoudoms-projects
   - Click "Add New" → "Project"

2. **Select GitHub Repository**
   - Find and click "khuyoudom/test-school"
   - (If not visible, click "Import an External Git Repository")
   - Enter: `https://github.com/khuyoudom/test-school`

3. **Configure Project**
   - Framework: "Other" (auto-detected as Node.js)
   - Root Directory: "./" (default)
   - Build Command: (leave blank - uses npm)
   - Output Directory: (leave blank)

4. **Add Environment Variables** ⚠️ **IMPORTANT**

   BEFORE clicking "Deploy", click "Environment Variables" and add these:

   ```
   PORT = 3000
   SESSION_SECRET = [paste TOKEN 1 from Step 2]
   JWT_SECRET = [paste TOKEN 2 from Step 2]
   MONGODB_URI = [paste connection string from Step 1, with PASSWORD replaced]
   MONGODB_DB_NAME = dynamics_node
   ADMIN_EMAIL = admin@example.com
   ADMIN_PASSWORD = [your admin password - make it strong!]
   MONGODB_SERVER_SELECTION_TIMEOUT_MS = 10000
   ```

   Example of completed MONGODB_URI:
   ```
   mongodb+srv://nodeapp:MySecurePassword123@cluster0.abc123xyz.mongodb.net/dynamics_node?retryWrites=true&w=majority
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 2-5 minutes)
   - You'll see "Deployment Complete" ✅

6. **Visit Your Live App**
   - You'll get a URL like: `https://dynamics-node-khuyoudom.vercel.app`
   - Click "Visit" or copy the URL

---

## ✅ STEP 4: Test Your Deployed Application

After deployment completes, test these URLs:

```
https://your-app.vercel.app/                    → Homepage
https://your-app.vercel.app/products            → Products page
https://your-app.vercel.app/health/mongodb      → DB health check
https://your-app.vercel.app/login               → Login page
https://your-app.vercel.app/admin               → Admin dashboard (redirects to login)
https://your-app.vercel.app/api/products        → API endpoint
```

### Expected Results:
- ✅ All pages load without errors
- ✅ `/health/mongodb` returns: `{"ok":true,"database":"dynamics_node"}`
- ✅ Admin login works with credentials from environment variables
- ✅ Products display on homepage

---

## 🎯 Troubleshooting

### Issue: "MongoDB connection failed"
**Solution:**
- Check MONGODB_URI spelling in Vercel environment variables
- Verify password is correct in connection string
- Check network access is allowed in MongoDB Atlas (should be "Allow Access from Anywhere")
- Test connection locally first with same connection string

### Issue: "Cannot find module"
**Solution:**
- Vercel will auto-install dependencies (npm install)
- Check build logs for actual error message
- This shouldn't happen if all changes are committed

### Issue: "Admin dashboard not loading"
**Solution:**
- This is normal on first deploy - seed data auto-creates admin user
- Use ADMIN_EMAIL and ADMIN_PASSWORD from environment variables to login
- If that doesn't work, create a new account via `/register` first

### Issue: "Page shows 'Internal Server Error'"
**Solution:**
- Click "Deployments" → view build logs
- Look for "error" or "failed" messages
- Check and fix environment variables (missing MONGODB_URI is common)
- Redeploy after fixing variables

---

## 🔗 Important Links

| Resource | Link |
|----------|------|
| Your Repository | https://github.com/khuyoudom/test-school |
| Vercel Dashboard | https://vercel.com/khuyoudoms-projects |
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |
| App Documentation | [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) |
| Test Report | [TEST_REPORT.md](./TEST_REPORT.md) |

---

## 📊 What Gets Deployed

When you deploy to Vercel:
- ✅ Express.js web server
- ✅ EJS templates
- ✅ All your routes and APIs
- ✅ Static files from `/public`
- ✅ All environment-aware code

**NOT deployed:**
- ❌ Local SQLite database (`.env` file is local only)
- ❌ node_modules (Vercel installs these automatically)
- ❌ `.env` file (use Vercel environment variables instead)

---

## 💡 Pro Tips

1. **Check Vercel Logs**: After deployment, view real-time logs in Vercel dashboard to debug issues
2. **Use Custom Domain**: After first deployment, you can add your own domain in project settings
3. **Monitor Usage**: Free tier includes 100 serverless function invocations per day (more than enough for testing)
4. **Automatic Deploys**: Every push to `main` branch auto-deploys (you can disable in settings)

---

## 🎉 Expected Outcome

After successfully deploying, you'll have:
- ✅ Live web application running on Vercel
- ✅ A public URL you can share with anyone
- ✅ Cloud MongoDB backing your data
- ✅ Auto-scaling infrastructure
- ✅ HTTPS enabled by default

**Example Live URL:**
```
https://dynamics-node-khuyoudom.vercel.app
```

---

## 📞 Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Express.js Guide**: https://expressjs.com
- **Your Repo Issues**: Open issue on GitHub

---

## ✨ Next Steps

1. ✅ Read Steps 1-4 above
2. ✅ Set up MongoDB Atlas (Step 1)
3. ✅ Generate security secrets (Step 2)
4. ✅ Deploy to Vercel (Step 3)
5. ✅ Test your live app (Step 4)
6. ✅ Share your live URL!

---

**You're all set! 🚀 Proceed with the deployment steps above.**

Last Updated: April 2, 2026  
Application Status: ✅ Production Ready  
Repository: https://github.com/khuyoudom/test-school
