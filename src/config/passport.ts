// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import AppleStrategy from "passport-apple";
// import { findOrCreateUser } from "../services/userProvidersService.ts";
//
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     callbackURL: "http://localhost:3001/auth/google/callback",
// }, async (accessToken, refreshToken, profile, done) => {
//     const user = await findOrCreateUser(profile);
//     done(null, user);
// }));
//
// passport.use(new AppleStrategy({
//     clientID: process.env.APPLE_CLIENT_ID!,
//     teamID: process.env.APPLE_TEAM_ID!,
//     keyID: process.env.APPLE_KEY_ID!,
//     privateKeyString: process.env.APPLE_PRIVATE_KEY!,
//     callbackURL: "http://localhost:3001/auth/apple/callback",
// }, async (accessToken, refreshToken, idToken, profile, done) => {
//     const user = await findOrCreateUser(profile);
//     done(null, user);
// }));


import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import User from "../models/userModel.ts";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) return done(null, user);
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);
