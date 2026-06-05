const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) { console.warn('MONGODB_URI not set'); return; }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB error:', err.message);
  }
};
module.exports = connectDB;