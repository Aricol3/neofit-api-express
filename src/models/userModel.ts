import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    name?: string;
    provider: "google" | "apple";
    providerId: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String },
        provider: { type: String, enum: ["google", "apple"], required: true },
        providerId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
