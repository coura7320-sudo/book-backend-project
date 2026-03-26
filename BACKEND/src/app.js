import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

const app = express();
app.use(cors({ origin: 'http://localhost:5174', credentials: true }));
app.use(express.json());



app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);



// example route : http://localhost:4000/api/v1/users/register

export default app;// Cause i will use it in another file 