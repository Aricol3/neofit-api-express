import mongoose, {Schema, Types} from "mongoose";

const foodLogSchema = new Schema({
    user_id: { type: Types.ObjectId, ref: 'User', required: true },
    food_id: { type: Types.ObjectId, ref: 'Food', required: true },
    serving_size_id: { type: Types.ObjectId, ref: 'ServingSize', required: true },
    amount: { type: Number, required: true },
    meal_type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
    date: { type: Date, required: true },
    notes: { type: String, default: '' },
    custom_meal: { type: Boolean, default: false }
}, { timestamps: true });

foodLogSchema.index({ user_id: 1, date: 1 });

export const FoodLog = mongoose.model('FoodLog', foodLogSchema);
