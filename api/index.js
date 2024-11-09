import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();
dotenv.config()
// MongoDB connection URL
const mongoURI = process.env.MONGO;

// Connect to MongoDB using mongoose
mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");

    // Start the Express server only after MongoDB connection is successful
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
  });
