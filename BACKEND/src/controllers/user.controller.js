import { User } from "../models/user.models.js";

export const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }
        const user = await User.create({
            username,
            password,
            email: email.toLowerCase(),
            loggedIn: false
        });
        res.status(201).json({ message: "User created successfully", user: { id: user._id, email: user.email, username: user.username } });
    } catch (error) {
        console.log("Error registering user:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid email or password" });

        res.status(200).json({ message: "Login successful", user: { _id: user._id, email: user.email, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        user.loggedIn = false;
        await user.save();
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export default {
    registerUser,
    loginUser,
    logoutUser
}