import mongoose from "mongoose";

// تعريف المخطط (Schema)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,  // الحقل يجب أن يكون موجودًا
    unique: true,    // قيمة فريدة لكل مستخدم
  },
  email: {
    type: String,
    required: true,  // الحقل يجب أن يكون موجودًا
    unique: true,    // قيمة فريدة لكل بريد إلكتروني
  },
  password: {
    type: String,
    required: true,  // الحقل يجب أن يكون موجودًا
  },
  profilePicture:{
    type:String,
    default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
}, { timestamps: true });  // إضافة التوقيت بشكل صحيح

// إنشاء النموذج (Model) باستخدام المخطط
const User = mongoose.model('User', userSchema);

// تصدير النموذج ليتم استخدامه في أماكن أخرى في التطبيق
export default User;
