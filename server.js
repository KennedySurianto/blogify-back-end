import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';

import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
