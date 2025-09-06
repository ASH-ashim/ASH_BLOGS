import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import path from "path";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
// const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS setup for dev + prod
app.use(
  cors({
    origin: [process.env.CLIENT_URL, "https://ash-blogs.onrender.com"],
    credentials: true,
  })
);


app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);

// if (process.env.SERVE_FRONTEND === "true") {
//   app.use(express.static(path.join(__dirname, "/frontend/dist")));

//   app.get("*", (_, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
//   });
// }


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });
