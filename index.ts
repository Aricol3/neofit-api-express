import express from "express";
import * as mongoose from "mongoose";
import {Food} from "./src/models/foodModel.ts";
import * as bodyParser from "body-parser";
import type {Request} from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect("mongodb://localhost/neofit")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.use(bodyParser.json());
app.use(cors<Request>());

app.get("/", (req, res) => {
    res.json({message: "Hello Neofit!"});
});

app.post("/food", async (req, res) => {
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
});

app.get("/food", async (req, res) => {
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
});

app.post("/food/overview", async (req, res) => {
    try {
        const { date, meals } = req.body;

        if (!date || !meals || typeof meals !== "object") {
            return res.status(400).json({ error: "Invalid payload. 'date' and 'meals' are required." });
        }

        const summarizeDay = (meals) => {
            return meals.reduce((summary, meal) => {
                summary.calories += meal.calories;
                summary.protein += meal.protein;
                summary.totalFat += meal.totalFat;
                summary.saturatedFat += meal.saturatedFat;
                summary.totalCarbohydrates += meal.totalCarbohydrates;
                summary.sugar += meal.sugar;
                summary.fiber += meal.fiber;
                summary.sodium += meal.sodium;
                return summary;
            }, {
                calories: 0,
                protein: 0,
                totalFat: 0,
                saturatedFat: 0,
                totalCarbohydrates: 0,
                sugar: 0,
                fiber: 0,
                sodium: 0
            });
        };
        const prompt = generateDietPrompt(summary, date);

        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
        });

        const feedback = completion.choices[0].message.content;

        res.status(200).json({ feedback });
    } catch (error) {
        console.error("Error generating diet feedback:", error);
        res.status(500).json({ error: "Failed to generate diet feedback" });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});