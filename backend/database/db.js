import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("Mongo URI from env:", process.env.MONGODB_URI); // 👈 check
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
};

export default connectDB;
