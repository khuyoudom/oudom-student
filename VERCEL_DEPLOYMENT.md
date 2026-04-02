# Vercel Deployment Guide

## Prerequisites Completed ✓
- [x] Project is a Node.js Express app
- [x] Git repository initialized and connected to GitHub (https://github.com/khuyoudom/test-school)
- [x] vercel.json configuration in place
- [x] package.json with correct start script
- [x] Environment variables documented in .env.example

## Deployment Steps

### Step 1: Set Up MongoDB Atlas (Cloud Database)

Since Vercel runs serverless functions, you cannot use `localhost:27017`. You need a cloud MongoDB:

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new cluster (free tier available)
4. Once cluster is created:
   - Click "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/...`)
   - Replace `<PASSWORD>` with your database password
   - Update the MONGODB_URI in your Vercel environment variables

### Step 2: Deploy to Vercel via GitHub

1. Go to https://vercel.com/khuyoudoms-projects
2. Click "Add New..." → "Project"
3. Select your GitHub repository: `khuyoudom/test-school`
4. Vercel will auto-detect it as a Node.js project
5. Click "Deploy"

### Step 3: Configure Environment Variables on Vercel

After selecting the repository, before deploying:

1. Click "Environment Variables"
2. Add the following variables:

```
PORT=3000
SESSION_SECRET=[Generate a random string using: openssl rand -hex 32]
JWT_SECRET=[Generate a random string using: openssl rand -hex 32]
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dynamics_node?retryWrites=true&w=majority
MONGODB_DB_NAME=dynamics_node
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=[Set a secure password]
MONGODB_SERVER_SELECTION_TIMEOUT_MS=5000
```

3. Click "Deploy"

### Step 4: Monitor Deployment

1. Vercel will build and deploy your app automatically
2. View build logs and deployment status in the dashboard
3. Once deployed, you'll get a live URL (e.g., https://dynamics-node.vercel.app)

### Step 5: Verify Deployment

After deployment completes:

1. Visit your Vercel URL
2. Test key functionality:
   - Homepage loads correctly
   - Products page works
   - Login/Register functionality
   - Admin dashboard access
   - /health/mongodb endpoint returns 200

## Important Notes

### Limitations on Vercel (Serverless)

- **File Uploads**: The `public/uploads` directory is ephemeral and resets after each deployment
  - Solution: Use cloud storage (AWS S3, Cloudinary, etc.)
  
- **Database**: Must use cloud MongoDB (not local)
  - Local SQLite won't persist between deployments
  
- **Cold Starts**: First request after inactivity takes longer (typical serverless behavior)

### Environment Variables to Generate

For security, generate random secrets:

**On Mac/Linux:**
```bash
openssl rand -hex 32
openssl rand -hex 32
```

**On Windows (via PowerShell):**
```powershell
-join (1..64 | ForEach-Object {'{0:x}' -f (Get-Random -Maximum 16)})
```

## Troubleshooting

### Build Fails
- Check that all dependencies in package.json are installed
- Verify node_modules/.bin/vercel exists
- Check build output logs in Vercel dashboard

### Application Errors
- Check Function logs in Vercel dashboard
- Look for MongoDB connection errors (verify MONGODB_URI)
- Ensure all environment variables are set

### Upload Issues
- Uploads don't persist on Vercel servers
- Implement cloud storage integration for production

## Next Steps

1. Set up MongoDB Atlas account and get connection string
2. Push latest changes to GitHub (already done)
3. Connect GitHub repository to Vercel
4. Add environment variables
5. Deploy and verify

## Deployment URL

After successful deployment, your live URL will be:
`https://[project-name].vercel.app`
