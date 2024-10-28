import express from "express";
import Blog from "../models/Blog.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /blogs - Create a new blog post
router.post("/", authenticateToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const author = req.user.userId; // Get user ID from the authenticated token

    try {
        const newBlog = new Blog({
            title,
            content,
            author,
        });

        await newBlog.save();
        res.status(201).json({ message: "Blog post created successfully", blog: newBlog });
    } catch (error) {
        res.status(500).json({ error: "Error creating blog post" });
    }
});

// GET /blogs - Retrieve all blog posts
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching blog posts" });
    }
});

export default router;
