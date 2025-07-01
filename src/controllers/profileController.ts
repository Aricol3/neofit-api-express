import { Request, Response } from "express";
import User from "../models/userModel";
import {calculateCaloriesAndMacros} from "../utils/common.ts";

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ error: "User not found" });

        res.json({ profile: user.profile });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user._id;
        const profileData = req.body;

        const { caloriesNeeded, macros } = calculateCaloriesAndMacros(profileData);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profile: { ...profileData, caloriesNeeded, macros } },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.json({ profile: updatedUser.profile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
