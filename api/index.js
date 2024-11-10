import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();
app.use(express.json());

// تحميل الإعدادات من ملف .env
dotenv.config();

// MongoDB connection URL
const mongoURI = process.env.MONGO;

// الاتصال بـ MongoDB باستخدام Mongoose
mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected");

    // بدء الخادم بعد الاتصال الناجح بـ MongoDB
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.log("MongoDB connection error:", err);
  });

// ربط المسارات
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
