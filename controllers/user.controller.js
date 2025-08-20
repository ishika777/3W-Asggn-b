import User from "../models/user.model.js";
import History from "../models/history.model.js";

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
            const historyList = await History.find().populate("from to").sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: users,
            history: historyList
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Add new user
export const addUser = async (req, res) => {
    try {
        const { name } = req.body;
        const newUser = new User({ name });
        await newUser.save();

        const users = await User.find().sort({ createdAt: -1 });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
