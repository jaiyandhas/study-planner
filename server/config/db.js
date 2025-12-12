import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGODB_URL ? process.env.MONGODB_URL.trim() : '';
  if (!uri) {
    console.error('MONGODB_URL is not set. Skipping MongoDB connection.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error && error.message ? error.message : error);
    // Do not exit process here; allow the server to start so you can see errors and continue debugging.
  }
}