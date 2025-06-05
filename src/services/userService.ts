import User from "../models/userModel.ts";

export async function findOrCreateUser(profile: any) {
    const email = profile.emails?.[0]?.value || profile.email;
    const provider = profile.provider;
    const providerId = profile.id;

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            email,
            name: profile.displayName || profile.name?.givenName || null,
            provider,
            providerId
        });
    }

    return user;
}
