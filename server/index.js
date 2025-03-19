import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

connectDb(); // connecting DB

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // allow us to parse incoming request: req.body
app.use(cookieParser()); // parse incomming cookie
app.use('/api', authRoutes);

app.listen(PORT, () => {
    console.log("server is up and running", PORT);
})