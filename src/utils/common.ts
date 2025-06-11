import type {IUserProfile} from "../models/userModel.ts";


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

export const calculateCaloriesAndMacros = (profile: IUserProfile) => {
    const {gender, age, height, weight, activityLevel, goal} = profile;

    // Mifflin-St Jeor BMR formula
    const bmr = gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const activityMultipliers: Record<IUserProfile['activityLevel'], number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        'very-active': 1.9,
    };

    let calories = bmr * activityMultipliers[activityLevel];

    // Adjust based on goal
    if (goal === 'lose') calories -= 500;
    if (goal === 'gain') calories += 500;

    // Macros: 40% carbs, 30% protein, 30% fat
    const protein = (calories * 0.3) / 4;
    const fat = (calories * 0.3) / 9;
    const carbs = (calories * 0.4) / 4;

    return {
        caloriesNeeded: Math.round(calories),
        macros: {
            protein: Math.round(protein),
            fat: Math.round(fat),
            carbs: Math.round(carbs),
        }
    };
}
