import User from "../models/User.js";

// UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        // Find id user and update
        const updatedUser = await User.findByIdAndUpdate(
            res.params.id,
            { $set: req.body },
            { new: true }
        );
        // return json
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Xóa người dùng thành công.");
    } catch (err) {
        next(err);
    }
}

// GET USER
export const getUser = async (req, res, next) => {
    try {
        // find user
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

// GET ALL USER
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).son(users);
    } catch (err) {
        next(err);
    }
};
