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

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
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
