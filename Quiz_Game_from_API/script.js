const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Fetch questions from the API
async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple');
    const data = await response.json();
    console.log(data)
    questions = data.results.map(q => ({
        question: q.question,
        answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5), // Shuffle answers
        correct: q.correct_answer
    }));
    startQuiz();
}

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none"; // Hide the next button initially
    showQuestion();
}

// Show a question and its answers
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer));
        answerElement.appendChild(button);
    });

    nextButton.style.display = "none"; // Hide the next button until an answer is selected
}

// Reset state by clearing previous answers
function resetState() {
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}

// Handle answer selection
function selectAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;

    if (isCorrect) {
        score++;
    }

    Array.from(answerElement.children).forEach(button => {
        const answer = button.innerHTML;
        button.disabled = true; // Disable all buttons after an answer is selected
        if (answer === currentQuestion.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    nextButton.style.display = "block"; // Show the next button after an answer is selected
}

// Handle the next button click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Show the final score
function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        fetchQuestions(); // Restart the quiz by fetching new questions
    }
});

// Start by fetching questions
fetchQuestions();
