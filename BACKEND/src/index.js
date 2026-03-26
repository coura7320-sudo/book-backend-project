import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    await connectDB();

    const port = process.env.PORT || 4000;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

  } catch (error) {
    console.error("Server error:", error);
    process.exit(1);
  }
};

startServer();