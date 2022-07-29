import mongoose from "mongoose";
const HotelSchema = new mongoose.Schema({
    // Tên khách sạn
    name: {
        type: String,
        required: true,
    },
    // Loại khách sạn
    type: {
        type: String,
        required: true,
    },
    // Thành phố
    city: {
        type: String,
        required: true,
    },
    // Địa chỉ
    address: {
        type: String,
        required: true,
    },
    // Khoảng cách
    distance: {
        type: String,
        required: true,
    },
    // Hình ảnh
    photos: {
        type: [String],
    },
    // Tiêu đề
    title: {
        type: String,
        required: true,
    },
    // Mô tả
    desc: {
        type: String,
        required: true,
    },
    // Xếp hạng
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    // Phòng
    rooms: {
        type: [String],
    },
    // Giá rẻ nhất
    cheapestPrice: {
        type: Number,
        required: true,
    },
    // Đặc sắc
    featured: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Hotel", HotelSchema)