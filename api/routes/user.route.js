import express from "express";
import { test } from "../controllers/user.controller.js";

// إنشاء كائن router
const router = express.Router();

// تعريف نقطة النهاية '/test'
router.get("/test", test);

// تصدير الـ router ليتم استخدامه في ملفات أخرى
export default router;
