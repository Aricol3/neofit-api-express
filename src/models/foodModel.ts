import mongoose, {Schema, Types} from 'mongoose';

// ---------- Subschemas ----------

// Energy (calories) schema
const energySchema = new Schema({
    value: {type: Number, required: true},
    unit: {type: String, required: true}
}, {_id: false});

// Serving size schema
const servingSizeSchema = new Schema({
    nutrition_multiplier: {type: Number, required: true},
    value: {type: Number, required: true},
    unit: {type: String, required: true},
    index: {type: Number},
    default: {type: Boolean, default: false}
}, {_id: true});

// Nutritional contents schema
export const nutritionalContentsSchema = new Schema({
    energy: {type: energySchema, required: true},

    // Required Macros
    protein: {type: Number},
    fat: {type: Number},
    carbohydrates: {type: Number},

    // Optional Fat Subtypes
    saturated_fat: {type: Number},
    polyunsaturated_fat: {type: Number},
    monounsaturated_fat: {type: Number},
    trans_fat: {type: Number},

    // Optional Micros and Add-ons
    cholesterol: {type: Number},
    sodium: {type: Number},
    potassium: {type: Number},

    fiber: {type: Number},
    sugar: {type: Number},
    added_sugars: {type: Number},
    sugar_alcohols: {type: Number},

    // Vitamins & Minerals
    vitamin_a: {type: Number},
    vitamin_c: {type: Number},
    vitamin_d: {type: Number},
    calcium: {type: Number},
    iron: {type: Number}

}, {_id: false});

// ---------- Main Food Schema ----------

const foodSchema = new Schema({
    barcode: {type: String, index: true},
    description: {type: String, required: true},
    brand_name: {type: String, required: true},
    serving_sizes: {type: [servingSizeSchema], default: []},
    verified: {type: Boolean, default: false},
    nutritional_contents: {type: nutritionalContentsSchema, required: true},
    type: {type: String, enum: ['food'], default: 'food'},
    user_id: {type: Types.ObjectId, ref: 'User', required: false}, // null for system foods
    public: {type: Boolean, default: true},
    deleted: {type: Boolean, default: false},
    country_code: {type: String, default: 'US'},
    version: {type: String, default: '1'},
    tags: {type: [String], default: []},           // e.g., ['gluten_free', 'paleo']
    health_labels: {type: [String], default: []}   // e.g., ['dairy_free']
}, {
    timestamps: true
});

foodSchema.index({user_id: 1, public: 1});

foodSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
});

export const Food = mongoose.model('Food', foodSchema);
