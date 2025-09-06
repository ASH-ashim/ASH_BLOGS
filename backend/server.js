import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import blogRoute from "./routes/blog.route.js";
import userRoute from "./routes/user.route.js";
import commentRoute from "./routes/comment.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());

// CORS — allow your frontend (local + deployed)
app.use(
    cors({
    origin: [
      "http://localhost:5173", // local dev
      process.env.CLIENT_URL   // set in Vercel env (e.g. https://your-frontend.vercel.app)
    ],
    credentials: true,
    })
);

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comments", commentRoute);

// connect DB at cold start
let isDbConnected = false;
async function initDb() {
    if (!isDbConnected) {
    await connectDb();
    isDbConnected = true;
    console.log("MongoDB connected");
    }
}
initDb();

export default app;
