// Define the valid username and password for the admin
const validAdmin = {
    username: 'Bilasio',
    password: '12345678..'
};

// Array to store trivia questions
const triviaQuestions = [];

// Initialize the app
function initApp() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);

    const questionForm = document.getElementById('postQuestionForm');
    questionForm.addEventListener('submit', handlePostQuestion);

    const generateTriviaButton = document.getElementById('generateTrivia');
    generateTriviaButton.addEventListener('click', generateTrivia);

    const deleteAllButton = document.getElementById('deleteAllQuestions');
    deleteAllButton.addEventListener('click', deleteAllQuestions);
}

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (isValidAdmin(username, password)) {
        loginSuccess();
    } else {
        showErrorMessage(errorMessage);
    }
}

// Check if entered credentials are correct
function isValidAdmin(username, password) {
    return username === validAdmin.username && password === validAdmin.password;
}

// Login success: hide the login form and show the admin section
function loginSuccess() {
    alert('Login successful!');

    document.getElementById('loginFormContainer').style.display = 'none';
    document.getElementById('adminSection').style.display = 'block';
}

// Show error message if login fails
function showErrorMessage(errorMessage) {
    errorMessage.style.display = 'block';
}

// Handle posting a trivia question
function handlePostQuestion(e) {
    e.preventDefault();

    const question = document.getElementById('question').value;
    const choices = [
        document.getElementById('choice1').value,
        document.getElementById('choice2').value,
        document.getElementById('choice3').value,
        document.getElementById('choice4').value
    ];

    const correctAnswer = getCorrectAnswer();

    // Check if the user has selected a correct answer
    if (!correctAnswer) {
        alert('You must select a correct answer before proceeding!');
        return; // Stop further processing
    }

    // If the form is valid, post the question
    if (isFormValid(question, choices, correctAnswer)) {
        postQuestion(question, choices, correctAnswer);
        resetForm();
        displayPostedQuestions();
    } else {
        alert('Please fill in all fields and select a correct answer!');
    }
}

// Get the correct answer based on the selected radio button
function getCorrectAnswer() {
    const selectedAnswer = document.querySelector('input[name="correctAnswer"]:checked');
    return selectedAnswer ? selectedAnswer.value : null; // Return null if no answer is selected
}

// Check if the form is valid
function isFormValid(question, choices, correctAnswer) {
    return question && choices.every(choice => choice) && correctAnswer;
}

// Post a new trivia question
function postQuestion(question, choices, correctAnswer) {
    triviaQuestions.push({ question, choices, correctAnswer });
}

// Reset the form fields
function resetForm() {
    document.getElementById('question').value = '';
    document.getElementById('choice1').value = '';
    document.getElementById('choice2').value = '';
    document.getElementById('choice3').value = '';
    document.getElementById('choice4').value = '';

    const allChoices = document.querySelectorAll('input[name="correctAnswer"]');
    allChoices.forEach(choice => {
        choice.checked = false; // Uncheck all radio buttons
    });
}

// Display the list of posted trivia questions
function displayPostedQuestions() {
    const questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = ''; // Clear existing list

    triviaQuestions.forEach((q, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <strong>Q:</strong> ${q.question}<br>
        <strong>Choices:</strong><br>
        1. ${q.choices[0]}<br>
        2. ${q.choices[1]}<br>
        3. ${q.choices[2]}<br>
        4. ${q.choices[3]}<br>
        <strong>Correct Answer:</strong> ${q.choices[q.correctAnswer - 1]}<br>
        <button onclick="deleteQuestion(${index})">Delete Question</button>
        <hr>
      `;
        questionsList.appendChild(listItem);
    });
}

// Delete a specific question by index
function deleteQuestion(index) {
    triviaQuestions.splice(index, 1);
    displayPostedQuestions();
}

// Generate a trivia with 10 random questions
function generateTrivia() {
    if (triviaQuestions.length < 10) {
        alert('You need at least 10 questions to generate a trivia.');
        return;
    }

    const randomQuestions = getRandomQuestions(10);

    // Store the generated random questions in localStorage
    localStorage.setItem('generatedTrivia', JSON.stringify(randomQuestions));

    // Redirect to quizes.html to display the generated trivia
    window.location.href = 'quizes.html';
}

// Get a set of 10 random questions without duplicates
function getRandomQuestions(count) {
    const shuffledQuestions = shuffleArray([...triviaQuestions]); // Clone and shuffle the questions
    return shuffledQuestions.slice(0, count); // Select the first 'count' questions
}

// Fisher-Yates (Knuth) Shuffle algorithm for shuffling array efficiently
function shuffleArray(array) {
    let currentIndex = array.length,
        randomIndex, temporaryValue;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Delete all questions
function deleteAllQuestions() {
    triviaQuestions.length = 0;
    displayPostedQuestions();
}

initApp();