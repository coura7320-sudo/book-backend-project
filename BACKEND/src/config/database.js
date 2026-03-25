import mongoose from "mongoose";//import mongoose to connect to the database
const connectDB =async ()=>{
    try {
const connectionInstance = await mongoose.connect
(`${process.env.MONGODB_URI}`)
console.log(`\n MongoDB connected!!!: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1)// it will exit the process with failure code
    }
}
export default connectDB;// for export the function to be used in other files
