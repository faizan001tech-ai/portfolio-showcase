/**
 * Migration Script: Convert HTTP Image URLs to HTTPS
 * 
 * This script updates all existing project documents in MongoDB
 * to convert HTTP image URLs to HTTPS, preventing mixed content errors.
 * 
 * Usage: node server/utils/migrateToHttps.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const migrateToHttps = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get the Project model
    const Project = require('../models/Project');

    // Find all projects with HTTP image URLs
    const httpProjects = await Project.find({
      image: { $regex: /^http:\/\// }
    });

    console.log(`📊 Found ${httpProjects.length} projects with HTTP image URLs`);

    if (httpProjects.length === 0) {
      console.log('✅ No HTTP URLs found. Migration not needed.');
      process.exit(0);
    }

    // Update each project
    let updatedCount = 0;
    for (const project of httpProjects) {
      const oldUrl = project.image;
      const newUrl = oldUrl.replace('http://', 'https://');
      
      await Project.findByIdAndUpdate(project._id, { image: newUrl });
      
      console.log(`🔄 Updated: ${oldUrl} → ${newUrl}`);
      updatedCount++;
    }

    console.log(`✅ Migration complete! Updated ${updatedCount} projects.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

// Run migration
migrateToHttps();
