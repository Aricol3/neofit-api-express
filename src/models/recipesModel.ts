import mongoose, {Schema, Types} from "mongoose";

const recipeSchema = new Schema({
    user_id: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [{
        food_id: { type: Types.ObjectId, ref: 'Food', required: true },
        serving_size_id: { type: Types.ObjectId, ref: 'ServingSize', required: true },
        amount: { type: Number, required: true }
    }],
    instructions: { type: String, required: true },
    tags: { type: [String], default: [] }, // e.g., ['vegetarian', 'quick']
    public: { type: Boolean, default: true }
}, { timestamps: true });

export const Recipe = mongoose.model('Recipe', recipeSchema);
