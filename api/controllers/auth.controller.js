// api/routes/user.route.js
import express from 'express';
import bcrypt from 'bcryptjs'; // مكتبة لتشفير كلمات المرور
import User from '../models/user.module.js';

const router = express.Router();

// إنشاء مستخدم جديد (Sign Up)
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // التحقق من أن البيانات غير فارغة
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // التحقق إذا كان البريد الإلكتروني موجوداً بالفعل
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
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
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
