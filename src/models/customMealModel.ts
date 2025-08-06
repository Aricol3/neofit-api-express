import mongoose, {Schema, Types} from "mongoose";
import {nutritionalContentsSchema} from "./foodModel.ts";

const customMealSchema = new Schema({
    user_id: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    food_items: [{
        food_id: { type: Types.ObjectId, ref: 'Food', required: true },
        serving_size_id: { type: Types.ObjectId, ref: 'ServingSize', required: true },
        amount: { type: Number, required: true }
    }],
    nutritional_contents: { type: nutritionalContentsSchema, required: true }
}, { timestamps: true });

export const CustomMeal = mongoose.model('CustomMeal', customMealSchema);
