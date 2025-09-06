import express from 'express'
import dotenv from "dotenv"
import connectDb from './database/db.js';
import blogRoute from './routes/blog.route.js';
import userRoute from './routes/user.route.js';
import commentRoute from './routes/comment.route.js'
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


const PORT = process.env.PORT || 8000;

app.use("/api/v1/user", userRoute); 
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comments", commentRoute);



// app.listen(PORT, () => {
//     connectDb();
//     console.log(`Server started at port: ${PORT}`);
// });

export default app;
