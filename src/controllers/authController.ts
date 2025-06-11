// import { generateJwt } from "../services/jwtService.ts";
//
// export const googleCallback = async (req, res) => {
//     const user = req.user;
//     const token = generateJwt(user);
//     res.redirect(`neofit://auth-success?token=${token}`);
// };
//
// export const appleCallback = async (req, res) => {
//     const user = req.user;
//     const token = generateJwt(user);
//     res.redirect(`neofit://auth-success?token=${token}`);
// };


import User from "../models/userModel.ts";
import jwt from "jsonwebtoken";

const createAccessToken = (id: string) => {
    return jwt.sign({id}, process.env.JWT_SECRET!, {expiresIn: "60d"});
};

export const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({error: "Email already exists"});

        const user = await User.create({email, password});

        const accessToken = createAccessToken(user._id);

        res.json({accessToken, user: {id: user._id, email: user.email, profileComplete: false}});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user || !(await user.comparePassword(password)))
            return res.status(400).json({error: "Invalid credentials"});

        const accessToken = createAccessToken(user._id);

        res.json({
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                profileComplete: !!user.profile
            }
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


export const me = (req, res) => {
    const {_id, email} = req.user;
    res.json({id: _id, email});
};

