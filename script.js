const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Preprocessor", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Tool Multi Language", correct: false },
            { text: "Hyper Text Markup Language", correct: false }
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Computer Style Sheet", correct: false },
            { text: "Cascading Style Sheet", correct: true },
            { text: "Colorful Style Sheet", correct: false },
            { text: "Common Style Sheet", correct: false }
        ]
    },
    {
        question: "What does PHP stand for?",
        answers: [
            { text: "Hypertext Preprocessor", correct: true },
            { text: "Hypertext Programming", correct: false },
            { text: "Hometext Preprocessor", correct: false },
            { text: "Hypertext Preprogramming", correct: false }
        ]
    },
    {
        question: "What does XML stand for?",
        answers: [
            { text: "eXTra Multi-Program Language", correct: false },
            { text: "eXecutable Multiple Language", correct: false },
            { text: "eXtensible Markup Language", correct: true },
            { text: "eXamine Multiple Language", correct: false }
        ]
    },
    {
        question: "What does SQL stand for?",
        answers: [
            { text: "Statement Question Language", correct: false },
            { text: "Stylesheet Query Language", correct: false },
            { text: "Stylish Question Language", correct: false },
            { text: "Structured Query Language", correct: true }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const messageElement = document.createElement("div"); // For displaying the awesome message
messageElement.id = "message";
messageElement.style.display = "none";
messageElement.classList.add("message");
document.querySelector(".quiz").appendChild(messageElement);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    messageElement.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function displayMessage(text) {
    messageElement.innerHTML = text;
    messageElement.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex === 3) {
        const messages = [
            "Great job! You’ve answered 3 questions correctly!",
            "Awesome! 3 questions down, keep going!",
            "Well done! You’ve nailed 3 questions!",
            "Keep it up! You’ve answered 3 questions!",
            "Nice work! You’ve completed 3 questions!"
        ];
        // Randomly display one of the congratulatory messages
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        displayMessage(randomMessage);
    }
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
