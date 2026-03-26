import mongoose from "mongoose";//import mongoose to connect to the database
const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI?.trim();
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        console.log(`Connecting to MongoDB...`);
        const connectionInstance = await mongoose.connect(uri);
        console.log(`\n MongoDB connected!!!: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1)
    }
}
export default connectDB;// for export the function to be used in other files
