import { Router } from "express";
import {updateProfile} from "../controllers/profileController.ts";
import passport from "passport";

const router = Router();

router.post(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    updateProfile
);

export default router;
