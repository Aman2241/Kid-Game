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

// Expanded Science / General Knowledge Questions
const scienceQuestions = [
    ...Array(20).fill({
        category: "Science",
        text: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    }),
    { category: "Science", text: "What do plants need to make food?", options: ["Pizza", "Sunlight", "Darkness", "Soda"], correctAnswer: "Sunlight" },
    { category: "Science", text: "How many legs does a spider have?", options: ["6", "8", "10", "4"], correctAnswer: "8" },
    { category: "Science", text: "What do bees make?", options: ["Milk", "Honey", "Juice", "Water"], correctAnswer: "Honey" },
    { category: "Science", text: "Which is the tallest animal?", options: ["Elephant", "Giraffe", "Zebra", "Lion"], correctAnswer: "Giraffe" },
    { category: "Science", text: "What comes down but never goes up?", options: ["Rain", "Bird", "Balloon", "Sun"], correctAnswer: "Rain" },
    { category: "Science", text: "What star gives us light and heat?", options: ["Moon", "Sun", "Mars", "Saturn"], correctAnswer: "Sun" },
    { category: "Science", text: "How many colors are in a rainbow?", options: ["5", "6", "7", "8"], correctAnswer: "7" },
    { category: "Science", text: "What animal says 'Moo'?", options: ["Dog", "Cat", "Cow", "Sheep"], correctAnswer: "Cow" },
    { category: "Science", text: "What do caterpillars turn into?", options: ["Beetles", "Butterflies", "Birds", "Spiders"], correctAnswer: "Butterflies" },
    { category: "Science", text: "What gas do we breathe to live?", options: ["Carbon", "Oxygen", "Helium", "Nitrogen"], correctAnswer: "Oxygen" },
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
    }
];

// Generate 480 math questions to add to our fixed questions, making it 500+
const generatedMath = generateMathQuestions(480);

export const questions = [
    ...generatedMath,
    ...scienceQuestions,
    ...animalQuestions,
    { category: "Science", text: "Which animal is the king of the jungle?", options: ["Elephant", "Monkey", "Lion", "Bear"], correctAnswer: "Lion" },
    { category: "Science", text: "What do cows effectively drink?", options: ["Milk", "Water", "Juice", "Tea"], correctAnswer: "Water" },
    { category: "Science", text: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], correctAnswer: "Pacific" },
    { category: "Science", text: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Leopard"], correctAnswer: "Cheetah" },
    { category: "Science", text: "What color is a school bus?", options: ["Red", "Blue", "Yellow", "Green"], correctAnswer: "Yellow" }
];
