import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

import {generateDietOverviewPrompt} from "../utils/openaiClient.ts";
import {summarizeMealsDay, summarizeNutritionDay} from "../utils/common.ts";


export const generateDietOverviewForDay = async (date: string, meals: any[], water: number) => {
    // const meals = {
    //     Breakfast: [
    //         {
    //             id: "1",
    //             baseFood: {
    //                 _id: "bf1",
    //                 barcode: "0001",
    //                 name: "Oats",
    //                 description: "Rolled oats cooked with milk",
    //                 servingSizes: [{ nutritionMultiplier: 1, id: "ss1", value: 50, unit: "grams", index: 1 }],
    //                 calories: 190,
    //                 totalFat: 3.5,
    //                 saturatedFat: 0.5,
    //                 totalCarbohydrates: 33,
    //                 sugar: 1,
    //                 protein: 6,
    //                 sodium: 0.01,
    //                 fiber: 5,
    //                 public: true,
    //                 deleted: false,
    //                 countryCode: "US",
    //             },
    //             description: "Rolled oats with milk",
    //             name: "Oats",
    //             servingSizes: [{ nutritionMultiplier: 1, id: "ss1", value: 50, unit: "grams", index: 1 }],
    //             servingSize: { nutritionMultiplier: 1, id: "ss1", value: 50, unit: "grams", index: 1 },
    //             numberOfServings: 2,
    //             meal: "Breakfast",
    //             calories: 700,
    //             totalCarbohydrates: 66,
    //             totalFat: 7,
    //             protein: 12,
    //             saturatedFat: 1,
    //             sugar: 2,
    //             fiber: 10,
    //             sodium: 0.02,
    //         },
    //         {
    //             id: "2",
    //             baseFood: {
    //                 _id: "bf2",
    //                 barcode: "0002",
    //                 name: "Boiled eggs",
    //                 description: "Large eggs, boiled",
    //                 servingSizes: [{ nutritionMultiplier: 1, id: "ss2", value: 50, unit: "grams", index: 1 }],
    //                 calories: 78,
    //                 totalFat: 5.3,
    //                 saturatedFat: 1.6,
    //                 totalCarbohydrates: 0.6,
    //                 sugar: 0.5,
    //                 protein: 6,
    //                 sodium: 0.06,
    //                 fiber: 0,
    //                 public: true,
    //                 deleted: false,
    //                 countryCode: "US",
    //             },
    //             description: "Large boiled eggs",
    //             name: "Boiled eggs",
    //             servingSizes: [{ nutritionMultiplier: 1, id: "ss2", value: 50, unit: "grams", index: 1 }],
    //             servingSize: { nutritionMultiplier: 1, id: "ss2", value: 50, unit: "grams", index: 1 },
    //             numberOfServings: 2,
    //             meal: "Breakfast",
    //             calories: 700,
    //             totalCarbohydrates: 1.2,
    //             totalFat: 10.6,
    //             protein: 12,
    //             saturatedFat: 3.2,
    //             sugar: 1,
    //             fiber: 0,
    //             sodium: 0.12,
    //         }
    //     ],
    //
    //     Lunch: [
    //         {
    //             id: "3",
    //             baseFood: {
    //                 _id: "bf3",
    //                 barcode: "0003",
    //                 name: "Grilled chicken breast",
    //                 description: "Skinless, boneless chicken breast grilled",
    //                 servingSizes: [{ nutritionMultiplier: 1, id: "ss3", value: 150, unit: "grams", index: 1 }],
    //                 calories: 165,
    //                 totalFat: 3.6,
    //                 saturatedFat: 1,
    //                 totalCarbohydrates: 0,
    //                 sugar: 0,
    //                 protein: 31,
    //                 sodium: 0.07,
    //                 fiber: 0,
    //                 public: true,
    //                 deleted: false,
    //                 countryCode: "US",
    //             },
    //             description: "Grilled chicken breast",
    //             name: "Chicken breast",
    //             servingSizes: [{ nutritionMultiplier: 1, id: "ss3", value: 150, unit: "grams", index: 1 }],
    //             servingSize: { nutritionMultiplier: 1, id: "ss3", value: 150, unit: "grams", index: 1 },
    //             numberOfServings: 1,
    //             meal: "Lunch",
    //             calories: 165,
    //             totalCarbohydrates: 0,
    //             totalFat: 3.6,
    //             protein: 31,
    //             saturatedFat: 1,
    //             sugar: 0,
    //             fiber: 0,
    //             sodium: 0.07,
    //         },
    //         {
    //             id: "4",
    //             baseFood: {
    //                 _id: "bf4",
    //                 barcode: "0004",
    //                 name: "Steamed broccoli",
    //                 description: "Fresh broccoli, steamed",
    //                 servingSizes: [{ nutritionMultiplier: 1, id: "ss4", value: 100, unit: "grams", index: 1 }],
    //                 calories: 35,
    //                 totalFat: 0.4,
    //                 saturatedFat: 0,
    //                 totalCarbohydrates: 7,
    //                 sugar: 1.5,
    //                 protein: 3,
    //                 sodium: 0.03,
    //                 fiber: 2.5,
    //                 public: true,
    //                 deleted: false,
    //                 countryCode: "US",
    //             },
    //             description: "Steamed broccoli",
    //             name: "Broccoli",
    //             servingSizes: [{ nutritionMultiplier: 1, id: "ss4", value: 100, unit: "grams", index: 1 }],
    //             servingSize: { nutritionMultiplier: 1, id: "ss4", value: 100, unit: "grams", index: 1 },
    //             numberOfServings: 1,
    //             meal: "Lunch",
    //             calories: 35,
    //             totalCarbohydrates: 7,
    //             totalFat: 0.4,
    //             protein: 3,
    //             saturatedFat: 0,
    //             sugar: 1.5,
    //             fiber: 2.5,
    //             sodium: 0.03,
    //         }
    //     ],
    //
    //     Dinner: [
    //         {
    //             id: "5",
    //             baseFood: {
    //                 _id: "bf5",
    //                 barcode: "0005",
    //                 name: "Baked salmon",
    //                 description: "Salmon fillet, baked",
    //                 servingSizes: [{ nutritionMultiplier: 1, id: "ss5", value: 150, unit: "grams", index: 1 }],
    //                 calories: 280,
    //                 totalFat: 18,
    //                 saturatedFat: 3,
    //                 totalCarbohydrates: 0,
    //                 sugar: 0,
    //                 protein: 25,
    //                 sodium: 0.08,
    //                 fiber: 0,
    //                 public: true,
    //                 deleted: false,
    //                 countryCode: "US",
    //             },
    //             description: "Baked salmon",
    //             name: "Salmon",
    //             servingSizes: [{ nutritionMultiplier: 1, id: "ss5", value: 150, unit: "grams", index: 1 }],
    //             servingSize: { nutritionMultiplier: 1, id: "ss5", value: 150, unit: "grams", index: 1 },
    //             numberOfServings: 1,
    //             meal: "Dinner",
    //             calories: 280,
    //             totalCarbohydrates: 0,
    //             totalFat: 18,
    //             protein: 25,
    //             saturatedFat: 3,
    //             sugar: 0,
    //             fiber: 0,
    //             sodium: 0.08,
    //         },
    //         {
    //             id: "6",
    //             baseFood: {
    //                 _id: "bf6",
    //                 barcode: "0006",
    //                 name: "Quinoa",
    //                 description: "Cooked quinoa",
    //                 servingSizes: [{ nutritionMultiplier: 1, id: "ss6", value: 100, unit: "grams", index: 1 }],
    //                 calories: 800,
    //                 totalFat: 2,
    //                 saturatedFat: 0.3,
    //                 totalCarbohydrates: 21,
    //                 sugar: 0.9,
    //                 protein: 4.4,
    //                 sodium: 0.01,
    //                 fiber: 2.8,
    //                 public: true,
    //                 deleted: false,
    //                 countryCode: "US",
    //             },
    //             description: "Cooked quinoa",
    //             name: "Quinoa",
    //             servingSizes: [{ nutritionMultiplier: 1, id: "ss6", value: 100, unit: "grams", index: 1 }],
    //             servingSize: { nutritionMultiplier: 1, id: "ss6", value: 100, unit: "grams", index: 1 },
    //             numberOfServings: 1,
    //             meal: "Dinner",
    //             calories: 1000,
    //             totalCarbohydrates: 21,
    //             totalFat: 2,
    //             protein: 4.4,
    //             saturatedFat: 0.3,
    //             sugar: 0.9,
    //             fiber: 2.8,
    //             sodium: 0.01,
    //         }
    //     ],
    //
    //     Snacks: [
    //         {
    //             id: "7",
    //             baseFood: {
    //                 _id: "bf7",
    //                 barcode: "0007",
    //                 name: "Greek yogurt",
    //                 description: "Plain, low-fat Greek yogurt",
    //                 servingSizes: [{ nutritionMultiplier: 1, id: "ss7", value: 150, unit: "grams", index: 1 }],
    //                 calories: 100,
    //                 totalFat: 0.7,
    //                 saturatedFat: 0.3,
    //                 totalCarbohydrates: 4,
    //                 sugar: 4,
    //                 protein: 17,
    //                 sodium: 0.05,
    //                 fiber: 0,
    //                 public: true,
    //                 deleted: false,
    //                 countryCode: "US",
    //             },
    //             description: "Plain Greek yogurt",
    //             name: "Greek yogurt",
    //             servingSizes: [{ nutritionMultiplier: 1, id: "ss7", value: 150, unit: "grams", index: 1 }],
    //             servingSize: { nutritionMultiplier: 1, id: "ss7", value: 150, unit: "grams", index: 1 },
    //             numberOfServings: 1,
    //             meal: "Snacks",
    //             calories: 500,
    //             totalCarbohydrates: 4,
    //             totalFat: 0.7,
    //             protein: 17,
    //             saturatedFat: 0.3,
    //             sugar: 4,
    //             fiber: 0,
    //             sodium: 0.05,
    //         }
    //     ],
    //
    //     Snack: [],
    // };

    const summaryMeals = summarizeMealsDay(meals);
    const summaryNutrition = summarizeNutritionDay(meals);
    const prompt = generateDietOverviewPrompt(summaryMeals, summaryNutrition, water);

    console.log("PROMPT:", meals);
    console.log("MEALS:", summaryMeals);
    console.log("NUTRITION:", summaryNutrition);

    const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
    });

    let content = completion.choices[0].message.content!;

    if (content.startsWith("```")) {
        content = content.replace(/```json|```/g, "").trim();
    }

    console.log(content);

    try {
        return JSON.parse(content);
    } catch (e) {
        console.error("Failed to parse JSON response:", e);
        throw new Error("Invalid JSON format from AI response.");
    }
};
