require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

const seedAdmin = async () => {
  try {
    await connectDB();
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit(0);
    }
    await Admin.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      title: 'MERN Stack Developer',
    });
    console.log('Admin seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
