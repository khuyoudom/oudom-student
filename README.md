# Dynamics Node - Modern E-commerce Platform

A full-stack Node.js application with Express, MongoDB, and serverless deployment ready architecture.

## 🚀 Features

- **Product Management**: Create, read, update, delete products and categories
- **Role-Based Access Control**: Admin and user roles with different permissions
- **Authentication**: Session-based + JWT token support
- **Search & Filtering**: Full-text search with regex special character safety
- **Admin Dashboard**: Real-time statistics and management interface
- **REST API**: Complete API for programmatic access
- **File Uploads**: Support for product images and videos
- **Responsive Design**: Works on desktop and mobile

## 📋 Requirements

### Local Development
- Node.js 20+
- MongoDB 4.4+ (local or cloud)
- npm 10+

### Production (Vercel)
- Vercel account (free tier available)
- MongoDB Atlas (free tier available)
- GitHub account

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/khuyoudom/test-school.git
cd dynamics-node
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
SESSION_SECRET=your-random-session-secret
JWT_SECRET=your-random-jwt-secret
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB_NAME=dynamics_node
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 4. Start Development Server
```bash
npm run dev
```

Server runs at `http://localhost:3000`

## 🧪 Testing

### Run All Tests
```bash
npm test
```

### Check MongoDB Connection
```bash
npm run check:mongodb
```

### Health Check
```bash
curl http://localhost:3000/health/mongodb
```

## 📊 Project Structure

```
dynamics-node/
├── index.js                    # Express app entry point
├── package.json               # Dependencies & scripts
├── vercel.json               # Vercel serverless config
├── src/
│   ├── config/               # Database & auth config
│   │   ├── database.js       # Sequelize (SQL)
│   │   └── mongodb.js        # MongoDB connection
│   ├── middleware/           # Express middleware
│   │   ├── auth.js          # Authentication guards
│   │   └── upload.js        # File upload config
│   ├── models/              # Database schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── Order.js
│   └── routes/              # API & web routes
│       ├── api.js           # REST API routes
│       └── web.js           # Web page routes
├── views/                   # EJS templates
│   ├── home.ejs
│   ├── products.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── admin/              # Admin pages
│   └── partials/           # Reusable components
├── public/                 # Static files
│   ├── css/
│   ├── js/
│   └── uploads/           # User uploads
└── docs/                  # Documentation
```

## 🔐 Authentication

### Session-Based (Web)
- Login via `/login` page
- User session stored in database
- Admin dashboard accessible at `/admin`

### JWT Tokens (API)
- Register: `POST /api/auth/register`
- Login: `POST /api/auth/login` → returns JWT token
- Use token in header: `Authorization: Bearer <token>`

## 🌐 API Endpoints

### Public Endpoints
```
GET  /api/products           # List all products
GET  /api/products/:id       # Get single product
GET  /api/categories         # List all categories
```

### Authenticated Endpoints
```
POST /api/orders             # Create order (requires login)
GET  /api/user/orders        # Get user orders
```

### Admin Endpoints
```
POST   /api/products         # Create product
PUT    /api/products/:id     # Update product
DELETE /api/products/:id     # Delete product
POST   /api/categories       # Create category
PUT    /api/categories/:id   # Update category
DELETE /api/categories/:id   # Delete category
```

## 🚀 Deployment

### Quick Start
See [DEPLOY_NOW.md](./DEPLOY_NOW.md) for complete step-by-step instructions.

### Vercel Deployment (Recommended)

1. **Setup MongoDB Atlas** (free tier)
   - https://www.mongodb.com/cloud/atlas
   - Get connection string

2. **Set Environment Variables**
   ```
   PORT=3000
   SESSION_SECRET=<random-secret>
   JWT_SECRET=<random-secret>
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
   MONGODB_DB_NAME=dynamics_node
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=<secure-password>
   ```

3. **Deploy**
   - Go to https://vercel.com
   - Connect GitHub repository
   - Add environment variables
   - Click "Deploy"

### Manual Deployment

```bash
# Using Vercel CLI
npm install -g vercel
vercel --prod

# Using Docker
docker build -t dynamics-node .
docker run -p 3000:3000 dynamics-node
```

## 📈 Performance

- Optimized MongoDB queries with indexes
- Regex escaping for search safety
- Template caching enabled
- Static asset compression
- Connection pooling for database

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token expiration (2 hours)
- Input validation and sanitization
- SQL injection prevention
- XSS protection via EJS escaping
- CSRF token placeholder (ready for implementation)
- Rate limiting ready (can add express-rate-limit)

## 🐛 Known Limitations

### File Uploads
- Ephemeral on Vercel (files don't persist)
- Solution: Use AWS S3 or Cloudinary for production

### Local SQLite
- Doesn't work on Vercel
- Use MongoDB Atlas instead

### Cold Starts
- Serverless cold starts: 5-15s first request
- Subsequent requests: <100ms

## 🛠️ Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Solution: Use cloud MongoDB URI in production

### Port 3000 Already In Use
```
Error: EADDRINUSE: address already in use :::3000
```
Solution: `kill -9 $(lsof -ti:3000)` or change PORT in .env

### Admin Dashboard Won't Load
```
Solution: Login first, credentials auto-created on startup
```

## 📚 Documentation

- [DEPLOY_NOW.md](./DEPLOY_NOW.md) - Step-by-step deployment
- [DEPLOYMENT_QUICK_START.md](./DEPLOYMENT_QUICK_START.md) - Quick reference
- [TEST_REPORT.md](./TEST_REPORT.md) - Test results
- [DEPLOYMENT_STATUS.md](./DEPLOYMENT_STATUS.md) - Status checklist

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongodb | ^7.1.1 | Database driver |
| mongoose | ^9.3.3 | Database ODM |
| ejs | ^5.0.1 | Templating engine |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| bcryptjs | ^3.0.3 | Password hashing |
| multer | ^2.1.1 | File uploads |
| express-session | ^1.19.0 | Session management |
| express-validator | ^7.3.2 | Input validation |
| dotenv | ^17.4.0 | Environment variables |

## 📊 File Sizes

```
index.js                 ~250 KB (with comments)
src/routes/             ~150 KB
views/                  ~200 KB
public/                 ~50 KB
Total (no node_modules) ~650 KB
```

## 🎯 Recent Fixes

| Issue | Fix | Status |
|-------|-----|--------|
| 500 error on search | Regex escaping added | ✅ Fixed |
| Missing descriptions crash | Null-safety guards | ✅ Fixed |
| Serverless deployment | vercel.json config | ✅ Ready |

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

ISC

## 👤 Author

Khuyoudom

## 📞 Support

- GitHub Issues: https://github.com/khuyoudom/test-school/issues
- Documentation: See files in root directory

## 🚀 Getting Started

1. Read [README.md](./README.md) (this file)
2. For local dev: Follow "Installation" section
3. For production: Read [DEPLOY_NOW.md](./DEPLOY_NOW.md)
4. Check [TEST_REPORT.md](./TEST_REPORT.md) for test results

---

**Status:** ✅ Production Ready  
**Last Updated:** April 2, 2026  
**Repository:** https://github.com/khuyoudom/test-school  
**Live URL:** (See deployment docs for live link after deploy)
