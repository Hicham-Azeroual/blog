// api/routes/user.route.js
import express from "express";
import bcrypt from "bcryptjs"; // مكتبة لتشفير كلمات المرور
import User from "../models/user.module.js";
import { errorHandler } from "../utils/error.js";

const router = express.Router();

// إنشاء مستخدم جديد (Sign Up)
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // التحقق من أن البيانات غير فارغة
    if (!username || !email || !password) {
      return next(errorHandler(400, 'All fields are required')); // أضف return لتجنب تنفيذ التعليمات التالية
    }

    // التحقق إذا كان البريد الإلكتروني موجوداً بالفعل
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // حفظ المستخدم في قاعدة البيانات
    await newUser.save();

    // إرسال استجابة بنجاح
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
