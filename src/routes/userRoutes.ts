import { Router } from "express";
import {getProfile, updateProfile} from "../controllers/profileController.ts";
import passport from "passport";

const router = Router();

router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    getProfile
);
router.post(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    updateProfile
);

export default router;
