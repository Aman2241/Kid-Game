/**
 * Function to generate hundreds of dynamic math questions and mix them with static ones.
 */

// Math Generator
const generateMathQuestions = (count) => {
    const operations = ['+', '-'];
    const questions = [];

    for (let i = 0; i < count; i++) {
        const isAddition = operations[Math.floor(Math.random() * operations.length)] === '+';

        let a, b, answer;

        if (isAddition) {
            a = Math.floor(Math.random() * 20) + 1; // 1 to 20
            b = Math.floor(Math.random() * 20) + 1; // 1 to 20
            answer = a + b;
        } else {
            a = Math.floor(Math.random() * 20) + 10; // 10 to 29
            b = Math.floor(Math.random() * 10) + 1; // 1 to 10
            // Ensure positive result for kids
            if (b > a) {
                const temp = a;
                a = b;
                b = temp;
            }
            answer = a - b;
        }

        const questionText = `What is ${a} ${isAddition ? '+' : '-'} ${b}?`;

        // Generate 3 wrong options close to the real answer
        const options = new Set();
        options.add(answer.toString());

        while (options.size < 4) {
            const offset = Math.floor(Math.random() * 7) - 3; // -3 to +3
            const wrongAnswer = answer + offset;
            if (wrongAnswer !== answer && wrongAnswer >= 0) {
                options.add(wrongAnswer.toString());
            }
        }

        // Shuffle options
        const shuffledOptions = Array.from(options).sort(() => 0.5 - Math.random());

        questions.push({
            category: "Math",
            text: questionText,
            options: shuffledOptions,
            correctAnswer: answer.toString()
        });
    }

    return questions;
};

// Expanded Planets and General Science
const planetsQuestions = [
    { category: "Planets", text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswer: "Mars" },
    { category: "Planets", text: "What planet do we live on?", options: ["Mars", "Earth", "Saturn", "Neptune"], correctAnswer: "Earth" },
    { category: "Planets", text: "What is the biggest planet in our solar system?", options: ["Jupiter", "Venus", "Earth", "Uranus"], correctAnswer: "Jupiter" },
    { category: "Planets", text: "Which planet has the most visible rings?", options: ["Saturn", "Mars", "Pluto", "Mercury"], correctAnswer: "Saturn" },
    { category: "Planets", text: "What star gives us light and heat?", options: ["Moon", "Sun", "Mars", "Saturn"], correctAnswer: "Sun" },
    { category: "Planets", text: "Is the sun a planet or a star?", options: ["Planet", "Star", "Moon", "Asteroid"], correctAnswer: "Star" },
    { category: "Planets", text: "Which planet is closest to the Sun?", options: ["Venus", "Mars", "Mercury", "Earth"], correctAnswer: "Mercury" },
    { category: "Planets", text: "Which is the hottest planet?", options: ["Mars", "Venus", "Mercury", "Jupiter"], correctAnswer: "Venus" },
    { category: "Planets", text: "What force keeps us on the ground?", options: ["Magnetism", "Gravity", "Wind", "Magic"], correctAnswer: "Gravity" },
    { category: "Planets", text: "What travels around the Earth?", options: ["The Moon", "The Sun", "Mars", "Comets"], correctAnswer: "The Moon" }
];

const geographyQuestions = [
    { category: "Geography", text: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correctAnswer: "Pacific" },
    { category: "Geography", text: "What is the tallest mountain in the world?", options: ["Mt. Everest", "K2", "Mt. Fuji", "Kilimanjaro"], correctAnswer: "Mt. Everest" },
    { category: "Geography", text: "Which country has the Pyramids of Giza?", options: ["Mexico", "Egypt", "China", "India"], correctAnswer: "Egypt" },
    { category: "Geography", text: "What is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correctAnswer: "Nile" },
    { category: "Geography", text: "Which continent is known as the 'Land Down Under'?", options: ["Europe", "Australia", "Africa", "Asia"], correctAnswer: "Australia" },
    { category: "Geography", text: "Where is the Eiffel Tower located?", options: ["London", "Rome", "Paris", "Berlin"], correctAnswer: "Paris" },
    { category: "Geography", text: "What is the largest desert in the world?", options: ["Sahara", "Gobi", "Kalahari", "Arabian"], correctAnswer: "Sahara" },
    { category: "Geography", text: "What do you call a piece of land surrounded by water?", options: ["Mountain", "Island", "Valley", "Desert"], correctAnswer: "Island" },
    { category: "Geography", text: "Which country is famous for kangaroos?", options: ["New Zealand", "South Africa", "Australia", "Brazil"], correctAnswer: "Australia" },
    { category: "Geography", text: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correctAnswer: "Tokyo" }
];

const trafficQuestions = [
    { category: "Traffic Lights", text: "What does the Red traffic light mean?", options: ["Go", "Stop", "Yield", "Slow Down"], correctAnswer: "Stop" },
    { category: "Traffic Lights", text: "What does the Green traffic light mean?", options: ["Go", "Stop", "Wait", "Turn Around"], correctAnswer: "Go" },
    { category: "Traffic Lights", text: "What does the Yellow traffic light mean?", options: ["Go fast", "Prepare to stop", "Honk horn", "Reverse"], correctAnswer: "Prepare to stop" },
    { category: "Traffic Lights", text: "Where should you walk across the street?", options: ["Anywhere", "Crosswalk", "Middle of road", "Highway"], correctAnswer: "Crosswalk" },
    { category: "Traffic Lights", text: "Who helps children cross the street near schools?", options: ["Crossing Guard", "Teacher", "Janitor", "Bus Driver"], correctAnswer: "Crossing Guard" },
    { category: "Traffic Lights", text: "What shape is a stop sign?", options: ["Circle", "Square", "Triangle", "Octagon"], correctAnswer: "Octagon" },
    { category: "Traffic Lights", text: "What should you wear when riding a bicycle?", options: ["Hat", "Helmet", "Sunglasses", "Scarf"], correctAnswer: "Helmet" },
    { category: "Traffic Lights", text: "What do you do before crossing the street?", options: ["Run fast", "Look left and right", "Close eyes", "Jump"], correctAnswer: "Look left and right" },
    { category: "Traffic Lights", text: "Should you play in the street?", options: ["Sometimes", "Never", "Always", "Only in summer"], correctAnswer: "Never" },
    { category: "Traffic Lights", text: "What color is a school bus?", options: ["Red", "Blue", "Yellow", "Green"], correctAnswer: "Yellow" }
];

const animalQuestions = [
    {
        category: "Animals",
        text: "Which animal is this?",
        image: "/animals/animal_lion_1771654746524.png",
        options: ["Tiger", "Bear", "Lion", "Leopard"],
        correctAnswer: "Lion"
    },
    {
        category: "Animals",
        text: "What animal is shown here?",
        image: "/animals/animal_elephant_1771654761627.png",
        options: ["Rhino", "Hippo", "Elephant", "Giraffe"],
        correctAnswer: "Elephant"
    },
    {
        category: "Animals",
        text: "Can you guess this animal?",
        image: "/animals/animal_monkey_1771654779157.png",
        options: ["Ape", "Gorilla", "Monkey", "Chimpanzee"],
        correctAnswer: "Monkey"
    },
    {
        category: "Animals",
        text: "Who is this furry friend?",
        image: "/animals/animal_dog_1771654799376.png",
        options: ["Cat", "Dog", "Wolf", "Fox"],
        correctAnswer: "Dog"
    },
    { category: "Animals", text: "Which is the tallest animal?", options: ["Elephant", "Giraffe", "Zebra", "Lion"], correctAnswer: "Giraffe" },
    { category: "Animals", text: "What animal says 'Moo'?", options: ["Dog", "Cat", "Cow", "Sheep"], correctAnswer: "Cow" },
    { category: "Animals", text: "What do caterpillars turn into?", options: ["Beetles", "Butterflies", "Birds", "Spiders"], correctAnswer: "Butterflies" },
    { category: "Animals", text: "Which animal is the king of the jungle?", options: ["Elephant", "Monkey", "Lion", "Bear"], correctAnswer: "Lion" },
    { category: "Animals", text: "What do cows effectively drink?", options: ["Milk", "Water", "Juice", "Tea"], correctAnswer: "Water" },
    { category: "Animals", text: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Leopard"], correctAnswer: "Cheetah" }
];

// Generate 480 math questions to add to our fixed questions, making it 500+
const generatedMath = generateMathQuestions(480);

export const questions = [
    ...generatedMath,
    ...planetsQuestions,
    ...geographyQuestions,
    ...trafficQuestions,
    ...animalQuestions
];
