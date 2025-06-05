import {Food} from "../models/foodModel.ts";
import {generateDietOverview, generateDietOverviewForDay} from "../services/foodService.ts";


export const createFood = async (req, res) => {
    try {
        const {
            barcode,
            brand_name,
            description,
            serving_sizes,
            nutritional_contents,
            type,
            public: isPublic,
            deleted,
            country_code,
        } = req.body;

        const food = new Food({
            barcode,
            brand_name,
            description,
            serving_sizes,
            nutritional_contents,
            type,
            public: isPublic,
            deleted,
            country_code,
        });

        console.log(food)

        const savedFood = await food.save();

        res.status(201).json({
            message: "Food item created successfully",
            food: savedFood,
        });
    } catch (error) {
        console.error("Error creating food item:", error);
        res.status(500).json({error: "Failed to create food item"});
    }
}


export const getFoodByBarcode = async (req, res) => {
    try {
        const {barcode} = req.query;
        console.log(barcode)

        if (!barcode || typeof barcode !== "string") {
            return res.status(400).json({error: "Valid barcode is required"});
        }

        const foodItem = await Food.findOne({barcode});
        console.log(foodItem)

        if (!foodItem) {
            return res.status(404).json({error: "Food item not found"});
        }

        res.status(200).json({
            message: "Food item retrieved successfully",
            food: foodItem,
        });
    } catch (error) {
        console.error("Error retrieving food item:", error);
        res.status(500).json({error: "Failed to retrieve food item"});
    }
}

export const getDietOverviewForDay = async (req, res) => {
    try {
        const { date, meals, water } = req.body;
        // console.log("MEALS",date,meals)
        const feedback = await generateDietOverviewForDay(date, meals, water);
        res.status(200).json(feedback);
    } catch (err) {
        console.error("Error generating diet overview:", err);
        res.status(500).json({ error: "Failed to generate diet overview" });
    }
};