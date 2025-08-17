import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

type JwtPayload = { id: string; iat: number; exp: number };

declare global {
    namespace Express {
        interface Request {
            auth?: JwtPayload;
            user?: any;
        }
    }
}

export const verifyToken = (loadUser = false): RequestHandler => {
    return async (req, res, next) => {
        const authHeader = req.headers["authorization"];
        if (!authHeader?.startsWith("Bearer ")) {
            res.status(401).json({ error: "No token provided" });
            return;
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as JwtPayload;

            req.auth = decoded;

            if (loadUser) {
                const { default: User } = await import("../models/userModel.ts");
                const user = await User.findById(decoded.id).lean();
                if (!user) {
                    res.status(401).json({ error: "User not found" });
                    return;
                }
                req.user = user;
            }

            next();
        } catch (err) {
            res.status(403).json({ error: "Invalid or expired token" });
            return;
        }
    };
};
