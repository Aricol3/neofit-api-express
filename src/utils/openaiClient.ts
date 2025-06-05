export const generateDietOverviewPrompt = (meals, nutrition, water) => `
You are a nutrition coach evaluating a user's daily diet.

**User Info**:  
- Gender: male  
- Age: 21  
- Height: 183 cm  
- Weight: 85 kg
- Activity Level: moderate  
- Goal: muscle gain
- Water intake (ml): ${water}
- Target calories (kcal): 3300
- Target water intake (ml): 3000

---

**Nutritional Summary**:  
- Calories: ${nutrition.calories} kcal  
- Protein: ${nutrition.protein} g  
- Total Fat: ${nutrition.totalFat} g (Saturated Fat: ${nutrition.saturatedFat} g)  
- Carbohydrates: ${nutrition.totalCarbohydrates} g (Sugar: ${nutrition.sugar} g, Fiber: ${nutrition.fiber} g)  
- Sodium: ${nutrition.sodium} g

---

**Meals Logged**:  
${Object.entries(meals)
    .map(
        ([meal, items]) =>
            `- ${meal}:\n${items
                .map(
                    (item) =>
                        `  • ${item.name} (${item.totalServingGrams}g) - ${item.calories} kcal`
                )
                .join("\n")}`
    )
    .join("\n")}

---

**Instructions**:  
Based on the nutritional summary and meal log:
1. Provide an **Overall Healthiness Score**: One of ["Poor", "Fair", "Good", "Excellent"]  
2. List **Notable Strengths**
3. Mention **Health Concerns**
4. Offer **Suggestions for Improvement** (practical, specific)

Keep it short, only important items per category (3-5).

Keep the tone friendly and practical.

Respond in **JSON format** with the following structure:

\`\`\`json
{
  "score": "Fair",                // One of: Poor, Fair, Good, Excellent
  "strengths": [string],          // Array of strengths
  "concerns": [string],           // Array of concerns
  "suggestions": [string]         // Practical advice
}
\`\`\`
`;
