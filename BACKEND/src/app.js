import express from 'express';

const app = express();
app.use(express.json());
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";



app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);



// example route : http://localhost:4000/api/v1/users/register

export default app;// Cause i will use it in another file 