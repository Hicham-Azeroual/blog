import express from "express";
import { test, updateUser,deleteUser,signout } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

// إنشاء كائن router
const router = express.Router();

// تعريف نقطة النهاية '/test'
router.get("/test", test);
router.put("/update/:userId",verifyToken,updateUser);
router.delete("/delete/:userId",verifyToken,deleteUser);
router.post('/signout',signout);

// تصدير الـ router ليتم استخدامه في ملفات أخرى
export default router;
