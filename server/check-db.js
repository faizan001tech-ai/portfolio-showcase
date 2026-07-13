require('dotenv').config();
const mongoose = require('mongoose');

async function checkDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully');
    
    const count = await mongoose.connection.db.collection('projects').countDocuments();
    console.log('Projects count:', count);
    
    if (count > 0) {
      const projects = await mongoose.connection.db.collection('projects').find({}).limit(5).toArray();
      console.log('Sample projects:', JSON.stringify(projects, null, 2));
    }
    
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

checkDB();
