import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const meals = {
    "2025-06-03": {
        Breakfast: [
            {
                id: "1",
                name: "Oatmeal with Banana and Almond Butter",
                description: "Whole oats cooked with banana and topped with almond butter",
                numberOfServings: 1,
                meal: "Breakfast",
                servingSize: { value: 250, unit: "grams", nutritionMultiplier: 1 },
                calories: 350,
                totalFat: 12,
                saturatedFat: 1.5,
                totalCarbohydrates: 50,
                sugar: 14,
                fiber: 6,
                protein: 10,
                sodium: 0.2
            }
        ],
        Lunch: [
            {
                id: "2",
                name: "Grilled Chicken Salad",
                description: "Chicken breast, mixed greens, cherry tomatoes, olive oil vinaigrette",
                numberOfServings: 1,
                meal: "Lunch",
                servingSize: { value: 300, unit: "grams", nutritionMultiplier: 1 },
                calories: 450,
                totalFat: 20,
                saturatedFat: 3,
                totalCarbohydrates: 10,
                sugar: 4,
                fiber: 4,
                protein: 40,
                sodium: 0.5
            }
        ],
        Dinner: [
            {
                id: "3",
                name: "Salmon with Quinoa and Broccoli",
                description: "Grilled salmon fillet with steamed broccoli and quinoa",
                numberOfServings: 1,
                meal: "Dinner",
                servingSize: { value: 350, unit: "grams", nutritionMultiplier: 1 },
                calories: 600,
                totalFat: 28,
                saturatedFat: 5,
                totalCarbohydrates: 30,
                sugar: 3,
                fiber: 5,
                protein: 45,
                sodium: 0.6
            }
        ],
        Snacks: [
            {
                id: "4",
                name: "Greek Yogurt with Berries",
                description: "Plain Greek yogurt with blueberries and honey",
                numberOfServings: 1,
                meal: "Snacks",
                servingSize: { value: 200, unit: "grams", nutritionMultiplier: 1 },
                calories: 200,
                totalFat: 5,
                saturatedFat: 3,
                totalCarbohydrates: 20,
                sugar: 15,
                fiber: 2,
                protein: 15,
                sodium: 0.1
            }
        ]
    }
};

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

const generateDietPrompt = (summary, date) => `
Person info: male, age 21, height 183cm, moderate activity
Give feedback on the following person's diet for ${date}. Here is the nutritional summary for the day:

- Calories: ${summary.calories} kcal  
- Protein: ${summary.protein} g  
- Total Fat: ${summary.totalFat} g (Saturated Fat: ${summary.saturatedFat} g)  
- Carbohydrates: ${summary.totalCarbohydrates} g (Sugar: ${summary.sugar} g, Fiber: ${summary.fiber} g)  
- Sodium: ${summary.sodium} g

Please evaluate the diet and provide:
1. An overall healthiness score (Poor, Fair, Good, Excellent)
2. Notable strengths (e.g., high in fiber)
3. Health concerns (e.g., too much saturated fat)
4. Suggestions for improvement
Keep the tone friendly and practical.
`;


async function getDietFeedback(): Promise<{
}> {
    const allMeals = Object.values(meals["2025-06-03"]).flat();
    const summary = summarizeDay(allMeals);
    const prompt = generateDietPrompt(summary, "2025-06-03");

    console.log(summary)

    const completion = await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
    });

    return completion.choices[0].message.content!;
}


(async () => {
    getDietFeedback().then(console.log);
})();
