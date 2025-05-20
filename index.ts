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

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});