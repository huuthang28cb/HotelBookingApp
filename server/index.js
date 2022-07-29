import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import router
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/user.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";

// cookie
import cookieParser from "cookie-parser";
// cors
import cors from "cors";

// app
const app = express();
// env evironment
dotenv.config({ path: 'server/.env' });

// Connect mongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Đã kết nối tới MongoDB 😍.");
    } catch (error) {
        console.log(error);
    }
};

// if mongoDB disconnected
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB mất kết nối 😢")
})

// middlewares
app.use(cors())  /* cors */
app.use(cookieParser()) /* cookie */
app.use(express.json()); /* use json */

// router
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Đã xảy ra lỗi😢";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,   // detail error
    });
});

// PORT
const PORT = process.env.PORT;
// create server
app.listen(PORT, () => {
    connect();
    console.log(`Listen server at port ${PORT}`);
})