import express from 'express';

const app = express();
app.use(express.json());
import userRoutes from "./routes/user.route.js";



app.use("/api/v1/users", userRoutes);



// example route : http://localhost:4000/api/v1/users/register

export default app;// Cause i will use it in another file 