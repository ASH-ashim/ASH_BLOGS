import express from 'express'
import dotenv from "dotenv"
import connectDb from './database/db.js';
import blogRoute from './routes/blog.route.js';
import userRoute from './routes/user.route.js';
import commentRoute from './routes/comment.route.js'
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from'path'

dotenv.config();
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "https://ashim-blogs.onrender.com",
    credentials: true
}));

const _dirName = path.resolve()
const PORT = process.env.PORT || 8000

app.use("/api/v1/user", userRoute); 
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comments", commentRoute);

app.use(express.static(path.join(_dirName, "/frontend/dist")))
// app.get("*", (_, resizeBy) => {
//     res.sendFile(path.resolve(_dirName, "frontend", "dist", "index.html"))
// })

app.listen(PORT, () => {
    connectDb();
    console.log(`Server started at port ${PORT}`);
})