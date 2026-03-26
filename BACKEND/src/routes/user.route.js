import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.get("/", (req, res) => {
    res.send("User route is working");
});


export default router;
