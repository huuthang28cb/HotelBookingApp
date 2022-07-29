import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// verify Token
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, "Bạn chưa đăng nhập!"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token không hợp lệ"));
        req.user = user;
        next();
    });
};

// verify user
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Bạn chưa đăng nhập!"));
        }
    });
};

// verify admin
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Bạn chưa đăng nhập!"));
        }
    });
};