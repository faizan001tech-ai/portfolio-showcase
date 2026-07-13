# Portfolio Showcase - Deployment Guide

## Issue Fixed: "No Projects Found"

### Root Cause Analysis
The "No Projects Found" issue was caused by:
1. **Missing VITE_API_URL environment variable** - The frontend was falling back to localhost:5000 in production
2. **Silent API failures** - Error handling was empty, so users couldn't see if the API was failing
3. **Environment configuration** - No clear documentation on required environment variables

### Changes Made

#### Frontend Changes
1. **client/src/services/api.js**
   - Removed localhost fallback to force proper environment variable configuration
   - Now requires `VITE_API_URL` to be set

2. **client/src/pages/FrontendProjects.jsx**
   - Added error state and proper error handling
   - Added retry button for failed API calls
   - Added console.error logging for debugging

3. **client/src/pages/FullStackProjects.jsx**
   - Added error state and proper error handling
   - Added retry button for failed API calls
   - Added console.error logging for debugging

4. **client/src/pages/AIProjects.jsx**
   - Added error state and proper error handling
   - Added retry button for failed API calls
   - Added console.error logging for debugging

5. **client/.env.example** (NEW)
   - Created example environment file with clear instructions
   - Documents VITE_API_URL requirement

6. **client/vite.config.js**
   - Added comments clarifying proxy is for development only

#### Backend Changes
1. **server/.env.example**
   - Added comments clarifying FRONTEND_URL should be set to Vercel URL in production

#### Utility Files
1. **server/check-db.js** (NEW)
   - Created database verification script for testing

---

## Environment Variables Setup

### Frontend (Vercel)
Create these environment variables in your Vercel project settings:

```
VITE_API_URL=https://your-render-api-url.onrender.com/api
```

**Important:** Replace `your-render-api-url` with your actual Render backend URL.

### Backend (Render)
Create these environment variables in your Render project settings:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=<your-secure-random-string>
JWT_EXPIRE=7d
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@portfolio.dev
ADMIN_PASSWORD=<your-secure-password>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
```

**Important:**
- Replace all placeholder values with your actual values
- FRONTEND_URL must match your Vercel deployment URL
- MONGODB_URI must be your MongoDB Atlas connection string

---

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Cloudinary account (optional, for image uploads)

### Backend Setup
1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` with your values:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
JWT_SECRET=your-dev-secret
JWT_EXPIRE=7d
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@portfolio.dev
ADMIN_PASSWORD=your-dev-password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FRONTEND_URL=http://localhost:5173
```

5. Start the server:
```bash
npm start
```

### Frontend Setup
1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` with your local backend URL:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

---

## Production Deployment

### Step 1: Deploy Backend to Render

1. Push your code to GitHub
2. Go to [Render.com](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: portfolio-api (or your preferred name)
   - **Region**: Oregon (or closest to your users)
   - **Branch**: main
   - **Root Directory**: server
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add all environment variables listed above
6. Click "Deploy Web Service"
7. Wait for deployment to complete and note your API URL

### Step 2: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com) and create a new project
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: client
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
4. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL (e.g., `https://portfolio-api.onrender.com/api`)
5. Click "Deploy"
6. Wait for deployment to complete

### Step 3: Update Backend CORS

After deploying frontend to Vercel:
1. Go to your Render dashboard
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Trigger a redeploy of the backend

---

## Testing the Deployment

### 1. Test Backend Health
Visit: `https://your-render-api-url.onrender.com/api/health`
Expected response:
```json
{
  "success": true,
  "message": "Portfolio API running"
}
```

### 2. Test Projects Endpoint
Visit: `https://your-render-api-url.onrender.com/api/projects`
Expected response:
```json
{
  "success": true,
  "message": "Projects fetched",
  "data": {
    "projects": [...],
    "total": 0,
    "page": 1,
    "pages": 1
  }
}
```

### 3. Test Frontend
1. Visit your Vercel frontend URL
2. Navigate to Projects section
3. Verify projects load correctly
4. If error appears, check browser console for details

---

## Troubleshooting

### Issue: "No Projects Found" after deployment

**Check 1: VITE_API_URL is set**
- Go to Vercel project settings → Environment Variables
- Verify `VITE_API_URL` is set to your Render backend URL
- Redeploy frontend after adding/changing the variable

**Check 2: Backend is accessible**
- Visit your Render backend URL + `/api/health`
- If it doesn't load, check Render logs for errors

**Check 3: CORS is configured**
- Verify `FRONTEND_URL` in Render matches your Vercel URL exactly
- Redeploy backend after changing the variable

**Check 4: Database has data**
- Access admin panel at `/admin`
- Login with admin credentials
- Add some projects if none exist

### Issue: CORS errors in browser console

**Solution:**
1. Ensure `FRONTEND_URL` in Render backend matches your Vercel URL exactly
2. Include protocol (https://) and no trailing slash
3. Redeploy backend after updating

### Issue: Images not loading

**Solution:**
1. Check Cloudinary credentials are correct
2. Ensure image URLs are absolute (full URLs)
3. Check browser console for 403/404 errors

---

## Database Seeding (Optional)

To add sample projects to your database:

1. Start the backend locally
2. Access the admin panel at `http://localhost:5173/admin`
3. Login with admin credentials
4. Navigate to "Manage Projects"
5. Add projects using the form

Or use MongoDB Compass/Atlas to directly insert documents:

```javascript
db.projects.insertMany([
  {
    title: "E-Commerce Store",
    description: "A full-featured e-commerce platform with cart, checkout, and payment integration",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    image: "https://res.cloudinary.com/your-cloud/image/upload/v1/ecommerce.jpg",
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://your-ecommerce.vercel.app",
    category: "fullstack",
    featured: true
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application with location-based forecasts and interactive maps",
    techStack: ["React", "OpenWeather API", "Chart.js", "CSS Modules"],
    image: "https://res.cloudinary.com/your-cloud/image/upload/v1/weather.jpg",
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://your-weather.vercel.app",
    category: "frontend",
    featured: false
  }
])
```

---

## Security Notes

1. **Never commit .env files** - They are in .gitignore for a reason
2. **Use strong secrets** - Generate random strings for JWT_SECRET
3. **Rotate credentials** - Change passwords and secrets regularly
4. **Enable MongoDB Atlas IP whitelist** - Only allow Render IP addresses
5. **Use HTTPS** - Both Vercel and Render provide free SSL certificates

---

## Support

If you encounter issues:
1. Check browser console for error messages
2. Check Render logs for backend errors
3. Check Vercel logs for frontend build errors
4. Verify all environment variables are set correctly
5. Ensure MongoDB Atlas allows connections from your backend IP

---

## Summary

The "No Projects Found" issue has been resolved by:
1. Removing localhost fallbacks to force proper environment configuration
2. Adding comprehensive error handling with user-friendly messages
3. Creating clear documentation for environment variable setup
4. Adding retry functionality for failed API calls

The application is now production-ready with proper error handling and clear deployment instructions.
