import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());



app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.get("/", (req, res) => {
    res.send("API is working");
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



// example route : http://localhost:4000/api/v1/users/register

export default app;// Cause i will use it in another file 