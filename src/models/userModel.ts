import bcrypt from "bcryptjs";
import mongoose, { Document, Model, Schema } from "mongoose";


export interface IUserProfile {
    gender: 'male' | 'female';
    age: number;
    height: number; // in cm
    weight: number; // in kg
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
    goal: 'lose' | 'maintain' | 'gain';
    caloriesNeeded?: number;
    macros?: {
        protein: number; // in grams
        fat: number;     // in grams
        carbs: number;   // in grams
    };
}

export interface IUser extends Document {
    email: string;
    password: string;
    profile?: IUserProfile;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const profileSchema = new mongoose.Schema({
    gender: { type: String, enum: ['male', 'female'], required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    activityLevel: {
        type: String,
        enum: ['sedentary', 'light', 'moderate', 'active', 'very-active'],
        required: true
    },
    goal: {
        type: String,
        enum: ['lose', 'maintain', 'gain'],
        required: true
    },
    caloriesNeeded: Number,
    macros: {
        protein: Number,
        fat: Number,
        carbs: Number
    }
}, { _id: false });

const userSchema: Schema<IUser> = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: profileSchema
});


userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
