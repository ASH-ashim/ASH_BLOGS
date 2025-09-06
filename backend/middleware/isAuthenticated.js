import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        // Make sure this matches what you sign in your JWT
        req.id = decoded.userId; 

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Authentication failed"
        });
    }
};
