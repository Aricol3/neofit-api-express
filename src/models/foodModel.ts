const mongoose = require('mongoose');

const servingSizeSchema = new mongoose.Schema({
    nutrition_multiplier: Number,
    id: String,
    value: Number,
    unit: String,
    index: Number,
});

const energySchema = new mongoose.Schema({
    value: Number,
    unit: String,
});

const nutritionalContentsSchema = new mongoose.Schema({
    grams: Number,
    energy: energySchema,
    protein: Number,
    fat: Number,
    saturated_fat: Number,
    carbohydrates: Number,
    net_carbs: Number,
    sugar: Number,
    sodium: Number,
    fiber: Number,
});

const foodSchema = new mongoose.Schema({
    description: String,
    brand_name: String,
    barcode: String,
    serving_sizes: [servingSizeSchema],
    verified: Boolean,
    nutritional_contents: nutritionalContentsSchema,
    type: { type: String, enum: ['food'] },
    user_id: String,
    public: Boolean,
    deleted: Boolean,
    country_code: String,
    version: String,
});

export const Food = mongoose.model('Food', foodSchema);
