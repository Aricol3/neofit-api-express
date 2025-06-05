import jwt from "jsonwebtoken";

export function generateJwt(user: any) {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}
