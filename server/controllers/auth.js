import User from "../models/User.js";
// Thư viện mã hóa mật khẩu
import bcrypt from "bcryptjs";
// import error handle
import { createError } from "../utils/error.js";
// import jwt
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res, next) => {
    try {
        // init bcrypt
        const salt = bcrypt.genSaltSync(10);
        // init hash password
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        // create new user
        await newUser.save();
        res.status(200).send("Tạo người dùng thành công");
    } catch (err) {
        next(err);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        // find user
        const user = await User.findOne({ username: req.body.username });
        // if does not user
        if (!user) return next(createError(404, "Người dùng không tại!"));

        // await compare password
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password, // enter password
            user.password   // password in db
        );

        // if not compare password
        if (!isPasswordCorrect) {
            return next(createError(400, "Tên đăng nhập hoặc mật khẩu không hợp lệ"));
        };

        // after login then have token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        // Set cookie token
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        next(err);
    }
};