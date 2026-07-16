require('dotenv').config();
const mongoose = require('mongoose');
const Experience = require('../models/Experience');

const seedExperience = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing experiences
    await Experience.deleteMany({});
    console.log('Cleared existing experiences');

    // Add new experiences
    const experiences = [
      {
        company: 'FSC (Pre-medical)',
        role: 'Student',
        duration: 'Pre-medical Education',
        description: 'Completed FSC with Pre-medical focus',
        current: false,
      },
      {
        company: 'SMIT Peshawar',
        role: 'MERN Stack Development Course',
        duration: '15 Months',
        description: 'Completed comprehensive MERN Stack Development course covering MongoDB, Express.js, React.js, and Node.js',
        current: false,
      },
    ];

    await Experience.insertMany(experiences);
    console.log('Experiences seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding experiences:', error);
    process.exit(1);
  }
};

seedExperience();
