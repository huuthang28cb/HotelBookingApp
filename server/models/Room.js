import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
    {
        // Tên phòng || Tiêu đề
        title: {
            type: String,
            required: true,
        },
        // Giá
        price: {
            type: Number,
            required: true,
        },
        // Số người tối đa
        maxPeople: {
            type: Number,
            required: true,
        },
        // Mô tả
        desc: {
            type: String,
            required: true,
        },
        // số phòng, unavailableDates: Ngày không có sẵn
        roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    },
    // Thời gian tạo
    { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);