import { Router } from "express";
import passport from "passport";
import {
    googleCallback,
    appleCallback
} from "../controllers/authController";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

router.get("/apple", passport.authenticate("apple"));
router.post("/apple/callback", passport.authenticate("apple", { session: false }), appleCallback);

export default router;
