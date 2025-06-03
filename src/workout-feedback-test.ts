import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const workoutJSON = {
    "2025-05-19": [  // Push
        {
            "exercise": "Bench Press",
            "sets": [
                { "type": "Warmup", "reps": 10, "weight": 50 },
                { "type": "Working", "reps": 8, "weight": 80 },
                { "type": "Working", "reps": 6, "weight": 85 }
            ]
        },
        {
            "exercise": "Overhead Press",
            "sets": [
                { "type": "Working", "reps": 8, "weight": 45 },
                { "type": "Working", "reps": 6, "weight": 50 }
            ]
        },
        {
            "exercise": "Dumbbell Lateral Raise",
            "sets": [
                { "type": "Working", "reps": 12, "weight": 15 },
                { "type": "Working", "reps": 12, "weight": 15 }
            ]
        },
        {
            "exercise": "Triceps Dips",
            "sets": [
                { "type": "Bodyweight", "reps": 10 },
                { "type": "Bodyweight", "reps": 10 }
            ]
        }
    ],
    "2025-05-20": [  // Pull
        {
            "exercise": "Deadlift",
            "sets": [
                { "type": "Warmup", "reps": 5, "weight": 60 },
                { "type": "Working", "reps": 5, "weight": 100 },
                { "type": "Working", "reps": 3, "weight": 110 }
            ]
        },
        {
            "exercise": "Barbell Row",
            "sets": [
                { "type": "Working", "reps": 8, "weight": 60 },
                { "type": "Working", "reps": 6, "weight": 65 }
            ]
        },
        {
            "exercise": "Lat Pulldown",
            "sets": [
                { "type": "Working", "reps": 10, "weight": 55 },
                { "type": "Working", "reps": 10, "weight": 60 }
            ]
        },
        {
            "exercise": "Bicep Curl",
            "sets": [
                { "type": "Working", "reps": 12, "weight": 25 },
                { "type": "Working", "reps": 10, "weight": 25 }
            ]
        }
    ],
    "2025-05-21": [  // Legs
        {
            "exercise": "Squat",
            "sets": [
                { "type": "Warmup", "reps": 8, "weight": 40 },
                { "type": "Working", "reps": 5, "weight": 80 },
                { "type": "Working", "reps": 5, "weight": 85 }
            ]
        },
        {
            "exercise": "Leg Press",
            "sets": [
                { "type": "Working", "reps": 10, "weight": 180 },
                { "type": "Working", "reps": 8, "weight": 200 }
            ]
        },
        {
            "exercise": "Leg Curl Machine",
            "sets": [
                { "type": "Working", "reps": 12, "weight": 50 },
                { "type": "Working", "reps": 10, "weight": 55 }
            ]
        },
        {
            "exercise": "Calf Raise",
            "sets": [
                { "type": "Working", "reps": 15, "weight": 40 },
                { "type": "Working", "reps": 15, "weight": 40 }
            ]
        }
    ]
}

const workout = `
2025-05-19
Exercise: Bench Press
Sets:
Warmup, reps 10, weight 50 kg
Warmup, reps 8, weight 65 kg
Working, reps 8, weight 80 kg
Working, reps 6, weight 85 kg
Working, reps 6, weight 85 kg

Exercise: Incline Dumbbell Press
Sets:
Warmup, reps 12, weight 18 kg
Working, reps 10, weight 24 kg
Working, reps 8, weight 26 kg
Working, reps 8, weight 26 kg

Exercise: Triceps Pushdown
Sets:
Warmup, reps 15, weight 25 kg
Working, reps 12, weight 35 kg
Working, reps 12, weight 35 kg
Working, reps 10, weight 40 kg

2025-05-20
Exercise: Deadlift
Sets:
Warmup, reps 8, weight 60 kg
Warmup, reps 5, weight 90 kg
Working, reps 5, weight 120 kg
Working, reps 3, weight 130 kg
Working, reps 3, weight 130 kg

Exercise: Barbell Row
Sets:
Warmup, reps 10, weight 40 kg
Working, reps 8, weight 60 kg
Working, reps 8, weight 65 kg
Working, reps 6, weight 65 kg

Exercise: Lat Pulldown
Sets:
Warmup, reps 12, weight 30 kg
Working, reps 10, weight 45 kg
Working, reps 10, weight 50 kg
Working, reps 8, weight 50 kg

2025-05-21
Exercise: Squat
Sets:
Warmup, reps 10, weight 40 kg
Warmup, reps 8, weight 60 kg
Working, reps 8, weight 90 kg
Working, reps 6, weight 100 kg
Working, reps 6, weight 100 kg

Exercise: Leg Press
Sets:
Warmup, reps 12, weight 100 kg
Working, reps 10, weight 140 kg
Working, reps 10, weight 150 kg
Working, reps 8, weight 160 kg

Exercise: Seated Leg Curl
Sets:
Warmup, reps 15, weight 25 kg
Working, reps 12, weight 35 kg
Working, reps 12, weight 35 kg
Working, reps 10, weight 40 kg

2025-05-22
Exercise: Overhead Press
Sets:
Warmup, reps 10, weight 30 kg
Warmup, reps 8, weight 40 kg
Working, reps 8, weight 50 kg
Working, reps 6, weight 55 kg
Working, reps 6, weight 55 kg

Exercise: Dumbbell Lateral Raise
Sets:
Warmup, reps 15, weight 6 kg
Working, reps 12, weight 8 kg
Working, reps 12, weight 10 kg
Working, reps 10, weight 10 kg

Exercise: Triceps Dips
Sets:
Working, reps 12, weight 0 kg
Working, reps 10, weight 0 kg
Working, reps 10, weight 0 kg

2025-05-23
Exercise: Pull-ups
Sets:
Warmup, reps 8, weight 0 kg
Working, reps 6, weight 0 kg
Working, reps 6, weight 0 kg
Working, reps 5, weight 0 kg

Exercise: Seated Cable Row
Sets:
Warmup, reps 12, weight 30 kg
Working, reps 10, weight 45 kg
Working, reps 10, weight 50 kg
Working, reps 8, weight 55 kg

Exercise: Hammer Curl
Sets:
Warmup, reps 15, weight 8 kg
Working, reps 12, weight 10 kg
Working, reps 10, weight 12 kg
Working, reps 10, weight 12 kg

2025-05-25
Exercise: Front Squat
Sets:
Warmup, reps 10, weight 30 kg
Warmup, reps 8, weight 50 kg
Working, reps 6, weight 70 kg
Working, reps 6, weight 75 kg
Working, reps 6, weight 75 kg

Exercise: Romanian Deadlift
Sets:
Warmup, reps 12, weight 40 kg
Working, reps 10, weight 60 kg
Working, reps 8, weight 70 kg
Working, reps 8, weight 70 kg

Exercise: Calf Raise
Sets:
Warmup, reps 20, weight 0 kg
Working, reps 15, weight 20 kg
Working, reps 15, weight 25 kg
Working, reps 15, weight 25 kg
`


const currentWeekWorkout = `
2025-05-19
• Bench Press  
  – Warm-up: 10×50 kg, 8×65 kg  
  – Working: 8×80 kg, 6×85 kg, 6×85 kg  
• Incline Dumbbell Press  
  – Warm-up: 12×18 kg  
  – Working: 10×24 kg, 8×26 kg, 8×26 kg  
• Triceps Pushdown  
  – Warm-up: 15×25 kg  
  – Working: 12×35 kg, 12×35 kg, 10×40 kg  

2025-05-20
• Deadlift  
  – Warm-up: 8×60 kg, 5×90 kg  
  – Working: 5×120 kg, 3×130 kg, 3×130 kg  
• Barbell Row  
  – Warm-up: 10×40 kg  
  – Working: 8×60 kg, 8×65 kg, 6×65 kg  
• Lat Pulldown  
  – Warm-up: 12×30 kg  
  – Working: 10×45 kg, 10×50 kg, 8×50 kg  

2025-05-21
• Squat  
  – Warm-up: 10×40 kg, 8×60 kg  
  – Working: 8×90 kg, 6×100 kg, 6×100 kg  
• Leg Press  
  – Warm-up: 12×100 kg  
  – Working: 10×140 kg, 10×150 kg, 8×160 kg  
• Seated Leg Curl  
  – Warm-up: 15×25 kg  
  – Working: 12×35 kg, 12×35 kg, 10×40 kg  

2025-05-22
• Overhead Press  
  – Warm-up: 10×30 kg, 8×40 kg  
  – Working: 8×50 kg, 6×55 kg, 6×55 kg  
• Dumbbell Lateral Raise  
  – Warm-up: 15×6 kg  
  – Working: 12×8 kg, 12×10 kg, 10×10 kg  
• Triceps Dips  
  – Working: 12×bodyweight, 10×bodyweight, 10×bodyweight  

2025-05-23
• Pull-ups  
  – Warm-up: 8×bodyweight  
  – Working: 6×bodyweight, 6×bodyweight, 5×bodyweight  
• Seated Cable Row  
  – Warm-up: 12×30 kg  
  – Working: 10×45 kg, 10×50 kg, 8×55 kg  
• Hammer Curl  
  – Warm-up: 15×8 kg  
  – Working: 12×10 kg, 10×12 kg, 10×12 kg  

2025-05-25
• Front Squat  
  – Warm-up: 10×30 kg, 8×50 kg  
  – Working: 6×70 kg, 6×75 kg, 6×75 kg  
• Romanian Deadlift  
  – Warm-up: 12×40 kg  
  – Working: 10×60 kg, 8×70 kg, 8×70 kg  
• Calf Raise  
  – Warm-up: 20×bodyweight  
  – Working: 15×20 kg, 15×25 kg, 15×25 kg  
`

const previousWeekWorkout = `
2025-05-12
• Bench Press  
  – Warm-up: 10×48 kg, 8×62 kg  
  – Working: 8×78 kg, 6×82 kg, 6×82 kg  
• Incline Dumbbell Press  
  – Warm-up: 12×16 kg  
  – Working: 10×22 kg, 8×24 kg, 8×24 kg  
• Triceps Pushdown  
  – Warm-up: 15×20 kg  
  – Working: 12×32 kg, 12×32 kg, 10×37 kg  

2025-05-13
• Deadlift  
  – Warm-up: 8×55 kg, 5×85 kg  
  – Working: 5×115 kg, 3×125 kg, 3×125 kg  
• Barbell Row  
  – Warm-up: 10×38 kg  
  – Working: 8×58 kg, 8×60 kg, 6×60 kg  
• Lat Pulldown  
  – Warm-up: 12×28 kg  
  – Working: 10×43 kg, 10×48 kg, 8×48 kg  

2025-05-14
• Squat  
  – Warm-up: 10×38 kg, 8×58 kg  
  – Working: 8×88 kg, 6×95 kg, 6×95 kg  
• Leg Press  
  – Warm-up: 12×95 kg  
  – Working: 10×135 kg, 10×145 kg, 8×155 kg  
• Seated Leg Curl  
  – Warm-up: 15×22 kg  
  – Working: 12×32 kg, 12×32 kg, 10×38 kg  

2025-05-15
• Overhead Press  
  – Warm-up: 10×28 kg, 8×38 kg  
  – Working: 8×48 kg, 6×52 kg, 6×52 kg  
• Dumbbell Lateral Raise  
  – Warm-up: 15×5 kg  
  – Working: 12×7 kg, 12×9 kg, 10×9 kg  
• Triceps Dips  
  – Working: 12×bodyweight, 10×bodyweight, 10×bodyweight  

2025-05-16
• Pull-ups  
  – Warm-up: 8×bodyweight  
  – Working: 6×bodyweight, 6×bodyweight, 5×bodyweight  
• Seated Cable Row  
  – Warm-up: 12×28 kg  
  – Working: 10×43 kg, 10×48 kg, 8×53 kg  
• Hammer Curl  
  – Warm-up: 15×7 kg  
  – Working: 12×9 kg, 10×11 kg, 10×11 kg  

2025-05-18
• Front Squat  
  – Warm-up: 10×28 kg, 8×48 kg  
  – Working: 6×68 kg, 6×73 kg, 6×73 kg  
• Romanian Deadlift  
  – Warm-up: 12×38 kg  
  – Working: 10×58 kg, 8×68 kg, 8×68 kg  
• Calf Raise  
  – Warm-up: 20×bodyweight  
  – Working: 15×18 kg, 15×23 kg, 15×23 kg  
`

function buildGptPrompt() {
    return `
I’m a Male 21-year-old, intermediate lifter training for strength and muscle gain.

My current estimated one-rep maxes are:
• Bench press: 100 kg  
• Deadlift: 160 kg  
• Squat: 140 kg  
• Overhead press: 60 kg  

Here is my workout for 2025-05-19 through 2025-05-25:
${currentWeekWorkout}

PREVIOUS SESSION (2025-05-12 through 05-18):
${previousWeekWorkout}

GOALS:
1. Maintain a weekly progression on main lifts.  
2. Increase overall pressing and pulling volume without stalling form.  
3. Optimize recovery and avoid excessive fatigue.  

Please analyze and give me:
1. **Volume & Intensity Check**  
2. **Progression Strategy**  
3. **Technique & Exercise Selection Feedback**  
4. **Recovery & Fatigue Management Advice**  
5. **Progress Tracking vs Last Week (05-12 to 05-18)**  
6. **Additional Tips**  

`;
}

async function getWorkoutFeedback() {
    const prompt = buildGptPrompt();
    // console.log(prompt);

    const response = await openai.chat.completions.create({
        model: "o4-mini",
        messages: [
            {
                role: "system",
                content: "You are a fitness coach reviewing a user's weekly workout log. Your job is to give helpful, friendly, and encouraging feedback based on their training."
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });

    return response.choices[0].message.content;
}

getWorkoutFeedback().then(console.log).catch(console.error);