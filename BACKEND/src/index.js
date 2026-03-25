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
        

        app.listen(process.env.PORT|| 8000, () => {
            console.log(`Server is running on port ${process.env.PORT }`);//it will connect on this port when i run it to my database
            
        })
    } catch (error) {
        console.log("MongoDB connection failed:", error);
        
    }
}
startServer();// server will start by now and it will connect to the database
