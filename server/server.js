require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const { apiLimiter } = require('./middleware/rateLimiter');

const path = require('path');
const fs = require('fs');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Connect DB
connectDB();

// Log FRONTEND_URL on startup
console.log('=== CORS Configuration ===');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('==========================');

// Middleware
app.use(helmet());

// CORS Configuration - Support multiple origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://portfolio-showcase-57ey.vercel.app',
  'https://portfolio-showcase-57ey-9l0bb7aby-faizan-jahangirs-projects.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean).map(origin => origin.replace(/\/$/, '')); // Remove trailing slashes

app.use(cors({
  origin: (origin, callback) => {
    console.log('Incoming origin:', origin);
    console.log('Allowed origins:', allowedOrigins);
    
    // Allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) {
      console.log('No origin provided - allowing request');
      return callback(null, true);
    }
    
    // Remove trailing slash from incoming origin for comparison
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    if (allowedOrigins.includes(normalizedOrigin)) {
      console.log('Origin allowed:', normalizedOrigin);
      callback(null, true);
    } else {
      console.log('Origin blocked:', normalizedOrigin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter);

// Routes
app.use('/uploads', express.static(uploadsDir));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/experiences', require('./routes/experienceRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Portfolio API running' }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));
