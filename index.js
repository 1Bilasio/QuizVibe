const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Set up Express app
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting to MongoDB:", err));

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the QuizVibe API');
});

// Routes for authentication
app.post('/signup', (req, res) => {
    // Handle user signup logic
    const { username, email, password } = req.body;
    // Hash the password and save user in the database
});

app.post('/login', (req, res) => {
    // Handle login logic
    const { email, password } = req.body;
    // Authenticate the user and issue a JWT token
});

// Routes for quiz and leaderboard
app.get('/quiz', (req, res) => {
    // Fetch and return a quiz question
});

app.get('/leaderboard', (req, res) => {
    // Fetch and return the leaderboard data
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});