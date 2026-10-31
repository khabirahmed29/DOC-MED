const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not set");
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
};

module.exports = connectDB;
