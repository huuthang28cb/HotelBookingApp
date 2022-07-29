import mongoose from "mongoose";
// Schema
const UserSchema = new mongoose.Schema(
    {
        // Tên tài khoản
        username: {
            type: String,
            required: true,
            unique: true,
        },
        // Email
        email: {
            type: String,
            required: true,
            unique: true,
        },
        // Quốc gia
        country: {
            type: String,
            required: true,
        },
        // Ảnh
        img: {
            type: String,
        },
        // Thành phố
        city: {
            type: String,
            required: true,
        },
        // Số điện thoại
        phone: {
            type: String,
            required: true,
        },
        // Mật khẩu
        password: {
            type: String,
            required: true,
        },
        // Có là admin hay là user
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    // Thời giant tạo user
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);