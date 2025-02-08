const questions = [{
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "Who wrote 'Hamlet'?",
        choices: ["Shakespeare", "Dickens", "Hemingway", "Austen"],
        correct: 0
    },
    {
        question: "Which language is primarily spoken in Brazil?",
        choices: ["Spanish", "Portuguese", "French", "English"],
        correct: 1
    },
    {
        question: "What is the tallest mountain in the world?",
        choices: ["K2", "Mount Everest", "Mount Kilimanjaro", "Mount Fuji"],
        correct: 1
    },
    {
        question: "Who is the author of '1984'?",
        choices: ["George Orwell", "Aldous Huxley", "J.K. Rowling", "F. Scott Fitzgerald"],
        correct: 0
    },
    {
        question: "What is the chemical symbol for gold?",
        choices: ["Au", "Ag", "Pb", "Fe"],
        correct: 0
    },
    {
        question: "In which year did World War II end?",
        choices: ["1939", "1941", "1945", "1950"],
        correct: 2
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const choice1Label = document.getElementById('choice1-label');
const choice2Label = document.getElementById('choice2-label');
const choice3Label = document.getElementById('choice3-label');
const choice4Label = document.getElementById('choice4-label');
const nextBtn = document.getElementById('next-btn');
const scoreContainer = document.getElementById('score-container');
const scoreDisplay = document.getElementById('score');
const promptMessage = document.createElement('p'); // Create a new paragraph for the prompt message
document.getElementById('quiz-form').appendChild(promptMessage); // Append it to the quiz form

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerText = currentQuestion.question;
    choice1Label.innerText = currentQuestion.choices[0];
    choice2Label.innerText = currentQuestion.choices[1];
    choice3Label.innerText = currentQuestion.choices[2];
    choice4Label.innerText = currentQuestion.choices[3];
    promptMessage.innerText = ''; // Clear the prompt message whenever a new question is loaded
}

function checkAnswer() {
    const choices = document.getElementsByName('choice');
    for (let i = 0; i < choices.length; i++) {
        if (choices[i].checked && parseInt(choices[i].value) === questions[currentQuestionIndex].correct) {
            score++;
        }
    }
}

nextBtn.addEventListener('click', () => {
    // Check if the user has selected a choice
    const choices = document.getElementsByName('choice');
    let selected = false;

    for (let choice of choices) {
        if (choice.checked) {
            selected = true;
            break;
        }
    }

    // If no choice is selected, prompt the user within the page
    if (!selected) {
        promptMessage.innerText = 'Please select a choice before proceeding to the next question.';
        promptMessage.style.color = 'red'; // Optional: Change color to red for better visibility
    } else {
        // If a choice is selected, check the answer and move to the next question
        checkAnswer();

        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion();
            document.getElementById('quiz-form').reset();
        } else {
            document.getElementById('quiz-form').style.display = 'none';
            scoreContainer.style.display = 'block';
            scoreDisplay.innerText = score;
        }
    }
});

loadQuestion();