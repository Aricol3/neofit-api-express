// import { Router } from "express";
// import passport from "passport";
// import {
//     googleCallback,
//     appleCallback
// } from "../controllers/authController";
//
// const router = Router();
//
// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
// router.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);
//
// router.get("/apple", passport.authenticate("apple"));
// router.post("/apple/callback", passport.authenticate("apple", { session: false }), appleCallback);
//
// export default router;


import express from "express";
import {login, register, me} from "../controllers/authController";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", passport.authenticate("jwt", { session: false }), me);

export default router;
