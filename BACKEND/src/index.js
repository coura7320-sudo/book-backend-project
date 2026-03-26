import app from "./app.js";
import dotenv from "dotenv";// dotenv is a dependency it help us to extract the variable
import connectDB from "./config/database.js";


dotenv.config({
    path: './.env'
});

const startServer= async()=>{
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR",error);
                throw error;
        });
        

        const port = parseInt(process.env.PORT, 10) || 8000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        }).on("error", (err) => {
            if (err.code === "EADDRINUSE") {
                console.error(`Port ${port} is already in use.`);
            } else {
                console.error("Server error:", err);
            }
            process.exit(1);
        });
    } catch (error) {
        console.log("MongoDB connection failed:", error);
        
    }
}
startServer();// server will start by now and it will connect to the database
