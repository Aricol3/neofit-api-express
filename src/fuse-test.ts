import Fuse from 'fuse.js';

const exerciseDictionary: Record<string, string[]> = {
    // --- Bench Press Variants ---
    "Barbell Bench Press": ["bench", "benchpress", "bp", "barbell bench", "flat bench", "bench press"],
    "Incline Barbell Bench Press": ["incline bench", "incline bench press", "incline barbell bench"],
    "Decline Barbell Bench Press": ["decline bench", "decline bench press", "decline barbell bench"],
    "Close-Grip Bench Press": ["close grip bench", "close grip bench press", "cgbp"],
    "Paused Bench Press": ["paused bench", "paused bench press"],
    "Floor Press": ["floor bench", "floor press"],
    "Board Press": ["board bench", "board press"],
    "Dumbbell Bench Press": ["db bench", "dumbbell bench", "dumbell bench", "db bench press"],

    // --- Deadlift Variants ---
    "Conventional Deadlift": ["deadlift", "dl", "conventional deadlift", "dlift"],
    "Sumo Deadlift": ["sumo deadlift", "sumo dl"],
    "Romanian Deadlift": ["romanian deadlift", "rdl"],
    "Stiff-Leg Deadlift": ["stiff leg deadlift", "sldl"],
    "Deficit Deadlift": ["deficit deadlift", "deficit dl"],
    "Snatch-Grip Deadlift": ["snatch grip deadlift", "snatch dl"],
    "Trap Bar Deadlift": ["trap bar deadlift", "hex bar deadlift", "trap dl"],

    // --- Pull Variants ---
    "Pull-Up": ["pullup", "pull-ups", "pull ups", "pu", "pull-up"],
    "Chin-Up": ["chinup", "chin-ups", "chin up", "chin-up"],
    "Lat Pulldown": ["lat pulldown", "lat pull down", "pulldown"],

    // --- Rows ---
    "Barbell Row": ["bb row", "barbell row", "bent over row"],
    "Dumbbell Row": ["db row", "dumbbell row", "one arm row"],
    "Cable Row": ["cable row", "seated row", "machine row"],

    // --- Squat Variants ---
    "Barbell Back Squat": ["squat", "back squat", "bb squat", "barbell squat"],
    "Front Squat": ["front squat", "bb front squat"],
    "Box Squat": ["box squat"],
    "Pause Squat": ["paused squat", "pause squat"],
    "Zercher Squat": ["zercher"],
    "Goblet Squat": ["goblet", "goblet squat"],

    // --- Overhead Press Variants ---
    "Overhead Press": ["ohp", "shoulder press", "overhead press", "military press"],
    "Push Press": ["push press"],
    "Seated Dumbbell Press": ["seated press", "seated dumbbell press", "db shoulder press"],

    // --- Olympic Lifts ---
    "Power Clean": ["power clean", "clean"],
    "Power Snatch": ["power snatch", "snatch"],
    "Clean and Jerk": ["clean and jerk", "c&j"],

    // --- Arm Exercises ---
    "Barbell Curl": ["barbell curl", "bb curl"],
    "Dumbbell Curl": ["dumbbell curl", "db curl"],
    "Hammer Curl": ["hammer curl", "neutral grip curl"],
    "Triceps Pushdown": ["triceps pushdown", "cable pushdown", "pushdowns"],
    "Skull Crushers": ["skullcrushers", "skull crushers", "lying triceps extension"],

    // --- Leg Accessory ---
    "Leg Press": ["leg press"],
    "Lunges": ["lunge", "lunges"],
    "Leg Extension": ["leg extension", "quad extension"],
    "Leg Curl": ["leg curl", "hamstring curl", "lying leg curl"],

    // --- Calves & Core ---
    "Calf Raise": ["calf raise", "calves"],
    "Plank": ["plank"],
    "Hanging Leg Raise": ["hanging leg raise", "hlr"],
    "Sit-Up": ["situp", "sit-ups", "sit ups"]
};

const fuzzyList = Object.entries(exerciseDictionary).flatMap(([canonical, variants]) =>
    variants.map(variant => ({variant, canonical}))
);

const fuse = new Fuse(fuzzyList, {
    keys: ['variant'],
    threshold: 0.3,
    includeScore: true
});

function normalizeExercise(input: string) {
    const results = fuse.search(input.trim().toLowerCase());
    if (results.length && results[0].score! <= 0.3) {
        const topMatch = results[0];
        console.log(`Matched "${input}" → "${topMatch.item.canonical}" (score: ${topMatch.score?.toFixed(4)})`);
        return topMatch.item.canonical;
    } else {
        console.log(`No match found for ${input}`);
        return null;
    }
}

function getTopCandidates(input: string, topN = 5) {
    const results = fuse.search(input.trim().toLowerCase());
    results.sort((a, b) => (a.score ?? 1) - (b.score ?? 1));
    const topCandidates = results.slice(0, topN);
    return topCandidates.map(r => ({
        canonical: r.item.canonical,
        variant: r.item.variant,
        score: r.score,
    }));
}

const testInputs = [
    "benchpress",
    "bp",
    "deadlift",
    "conventional deadlift",
    "pullups",
    "rdl",
    "romanian deadlift",
    "sumo deadlift",
    "dlift",
    "Dumbell Bench",
    "Dumbbell Bench",
    "Decline Barbell Bench Press",
    "floor press",
    "close grip bench press",
    "incline bench press",
    "cable bench",
    "board press",
    "paused bench press"
];

testInputs.forEach(input => {
    normalizeExercise(input);
    const candidates = getTopCandidates(input, 3);
    console.log("Top candidates:", candidates);
});
