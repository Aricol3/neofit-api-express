import { generateJwt } from "../services/jwtService.ts";

export const googleCallback = async (req, res) => {
    const user = req.user;
    const token = generateJwt(user);
    // Redirect back to Tauri with token (via custom protocol)
    res.redirect(`neofit://auth-success?token=${token}`);
};

export const appleCallback = async (req, res) => {
    const user = req.user;
    const token = generateJwt(user);
    res.redirect(`neofit://auth-success?token=${token}`);
};
