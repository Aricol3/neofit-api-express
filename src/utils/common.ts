

export const summarizeMealsDay = (meals) => {
    return Object.fromEntries(
        Object.entries(meals).map(([mealName, entries]) => {
            const processedEntries = entries.map((entry: any) => {
                const totalServingValue = (entry.servingSize?.value || 0) * (entry.numberOfServings || 1);

                return {
                    description: entry.description,
                    name: entry.name,
                    totalServingGrams: totalServingValue,
                    calories: entry.calories,
                };
            });
            return [mealName, processedEntries];
        })
    );
}

export const summarizeNutritionDay = (meals: any) => {
    return Object.values(meals).reduce(
        (summary, mealEntries) => {
            mealEntries.forEach((entry) => {
                summary.calories += entry.calories;
                summary.protein += entry.protein;
                summary.totalFat += entry.totalFat;
                summary.saturatedFat += entry.saturatedFat;
                summary.totalCarbohydrates += entry.totalCarbohydrates;
                summary.sugar += entry.sugar;
                summary.fiber += entry.fiber;
                summary.sodium += entry.sodium;
            });
            return summary;
        },
        {
            calories: 0,
            protein: 0,
            totalFat: 0,
            saturatedFat: 0,
            totalCarbohydrates: 0,
            sugar: 0,
            fiber: 0,
            sodium: 0,
        }
    );
};