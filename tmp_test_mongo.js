import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;

console.log('Testing connection to:', uri.split('@')[1]); // Log only the cluster part

async function test() {
    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('Connection successful!');
        await mongoose.disconnect();
    } catch (err) {
        console.error('Connection failed:', err);
    }
}

test();
