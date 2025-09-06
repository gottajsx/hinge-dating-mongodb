const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://stephanelarance75:saqOLQxHuCJmM5al@cluster0.aihxbwv.mongodb.net/hingeDating?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

module.exports = connectDB;
