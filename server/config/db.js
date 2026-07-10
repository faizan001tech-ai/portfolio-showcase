const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);

    // If SRV fails, suggest standard connection
    if (error.message.includes('querySrv')) {
      console.log('\n--- DNS Fix ---');
      console.log('Your DNS cannot resolve MongoDB Atlas SRV records.');
      console.log('Fix: Change your DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)');
      console.log('Or: Use the standard connection string in .env (uncomment the second MONGODB_URI)\n');
    }

    process.exit(1);
  }
};

module.exports = connectDB;
