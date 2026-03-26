import { Router } from "express";
import { createPost, getPosts, deletePost } from "../controllers/post.controller.js";
const router = Router();
router.route("/create").post(createPost);
router.route("/get").get(getPosts);
router.delete("/delete/:id", deletePost);
export default router; 