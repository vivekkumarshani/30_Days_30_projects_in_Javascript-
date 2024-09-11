// Array of quiz questions, each containing a question string and an array of possible answers with a boolean indicating if it's correct.
const questions = [
    {
        question: "What is the capital of France?",
        answer: [
            {text: "Paris ", correct: true},  // Correct answer
            {text: "Berlin", correct: false},
            {text: "Madrid", correct: false},
            {text: "Rome", correct: false},
        ]
    },
    {
        question: "Who wrote the play Romeo and Juliet?",
        answer: [
            {text: "Charles Dickens", correct: false},
            {text: "Mark Twain", correct: false},
            {text: "William Shakespeare ", correct: true},  // Correct answer
            {text: "Jane Austen", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answer: [
            {text: "CO2", correct: false},
            {text: "H2SO4", correct: false},
            {text: "H2O ", correct: true},  // Correct answer
            {text: "NaCl", correct: false},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answer: [
            {text: "Mars" , correct: true},  // Correct answer
            {text: "Venus", correct: false},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false},
        ]
    },
    {
        question: "In which year did the Titanic sink?",
        answer: [
            {text: "1905", correct: false},
            {text: "1920", correct: false},
            {text: "1945", correct: false},
            {text: "1912" , correct: true},  // Correct answer
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answer: [
            {text: "Diamond ", correct: true},  // Correct answer
            {text: "Gold", correct: false},
            {text: "Iron", correct: false},
            {text: "Platinum", correct: false},
        ]
    },
    {
        question: "Which event occurs when a user clicks on an HTML element in JavaScript?",
        answer: [
            {text: "onmouseover", correct: false},
            {text: "onload", correct: false},
            {text: "onclick ", correct: true},  // Correct answer
            {text: "onsubmit", correct: false},
        ]
    },
    {
        question: "Which operator is used to assign a value to a variable in JavaScript?",
        answer: [
            {text: "==", correct: false},
            {text: "= ", correct: true},  // Correct answer
            {text: "===", correct: false},
            {text: ":", correct: false},
        ]
    },
    {
        question: "How do you find the length of an array in JavaScript?",
        answer: [
            {text: "array.size()", correct: false},
            {text: "array.length()", correct: false},
            {text: "array.count", correct: false},
            {text: "array.length ", correct: true},  // Correct answer
        ]
    },
    {
        question: "Which of the following is the correct way to declare a JavaScript array?",
        answer: [
            {text: `var colors = ["red", "green", "blue"];`, correct: true},  // Correct answer with additional text
            {text: `var colors = "red", "green", "blue";`, correct: false},
            {text: `var colors = (1:"red", 2:"green", 3:"blue");`, correct: false},
            {text: `var colors = "red", "green", "blue";`, correct: false},
        ]
    }
];

// Get the DOM elements where the question, answers, and next button will be displayed.
const questionElement = document.getElementById("question"); // References the question display area
const answerElement = document.querySelector(".answer-buttons"); // References the answer buttons container
const nextButton = document.getElementById("next-btn"); // References the next button

let currentQuestionIndex = 0; // Tracks the index of the current question.
let score = 0; // Tracks the user's score.

function startQuiz() {
  currentQuestionIndex = 0; // Reset the current question index to the start.
  score = 0; // Reset the score.
  nextButton.innerHTML = "Next"; // Set the text of the next button.
  showQuestion(); // Display the first question.
}

function showQuestion() {
  resetState(); // Clear any previous question's answers.
  
  let currentQuestion = questions[currentQuestionIndex]; // Get the current question from the questions array.
  let questionNo = currentQuestionIndex + 1; // Question number starts from 1.
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question; // Display the question.

  // For each answer, create a button and append it to the answer container.
  currentQuestion.answer.forEach(answer => {
    const button = document.createElement("button"); // Create a new button for each answer.
    button.innerHTML = answer.text; // Set the button text to the answer text.
    button.classList.add("btn"); // Add the btn class for styling.
    answerElement.appendChild(button); // Add the button to the answer container.
    
    // Check if the answer is correct and store it in the button's dataset.
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    
    // Add an event listener to handle the answer selection.
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  // Remove all child elements (answer buttons) from the answer container.
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target; // Get the button that was clicked.
  const isCorrect = selectedButton.dataset.correct === "true"; // Check if the clicked answer is correct.
  
  // If the answer is correct, add the correct class, otherwise add the incorrect class.
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++; // Increase the score for a correct answer.
  } else {
    selectedButton.classList.add("incorrect");
  }
  
  // Disable all buttons and highlight the correct answer.
  Array.from(answerElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // Disable all buttons after an answer is selected.
  });
  
  nextButton.style.display = "block"; // Show the next button.
}

function showScore() {
  resetState(); // Clear previous answers
  questionElement.innerHTML = `You score is ${score} out of the ${questions.length}!`; // Display the final score
  nextButton.innerHTML = "Play again"; // Change button text to allow restarting the quiz
  nextButton.style.display = "block"; // Ensure the next button is visible
}

function handleNextButton() {
  currentQuestionIndex++; // Move to the next question
  if (currentQuestionIndex < questions.length) {
    showQuestion(); // Display the next question
  } else {
    showScore(); // If no more questions, show the score
  }
}

// Event listener for the next button to either proceed to the next question or restart the quiz
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton(); // Go to the next question
  } else {
    startQuiz(); // Restart the quiz if all questions have been answered
  }
});

startQuiz(); // Start the quiz when the page loads.
