import { Post } from "../models/post.model.js";
import { User } from "../models/user.models.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
    try {
        const { title, content, author, image } = req.body;
        
        if (!title || !content || !author) {
            return res.status(400).json({ message: "All fields are required" });
        }

        
        if (!mongoose.Types.ObjectId.isValid(author)) {
            return res.status(400).json({ message: "Invalid author ID format. It must be a valid MongoDB ObjectId." });
        }

        
        const userExists = await User.findById(author);
        if (!userExists) {
            return res.status(404).json({ message: "Author not found" });
        }

        const post = await Post.create({
            title,
            content,
            author,
            image,
        });

        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ message: "Posts fetched successfully", posts });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid post ID format." });
        }

        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
export default {
    createPost,
    getPosts,
    deletePost
};