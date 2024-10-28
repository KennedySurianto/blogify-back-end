import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Expecting "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token (user ID) to the request object
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};

export default authenticateToken;
