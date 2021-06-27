//Global Variables 
var startButton = document.getElementById('start-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById("question")
var answerButtonsElement = document.getElementById('answer-Buttons')
var correctCounter = 0;
var totalCorrectAnswers
var formElement = document.getElementById('form-container')
var submitButtonElement = document.getElementById('submit-btn')
var highscoreElement = document.getElementById('high-score-card')
var playerScore = document.getElementById('response')
var nameInput = document.querySelector("#username");
var shuffledQuestions, currentQuestionIndex
var timerElement = document.querySelector(".timer-count");
var timer;
var timerCount;
var highScorebtnEl = document.getElementById('highScorebtn')
var resetButtonElement = document.getElementById('resetBtn')
var response
var secondElement = document.getElementById('seconds')



//Quiz Questions and Answers
var questions = [
    {
        question: "In the state of Georgia, it’s illegal to eat what with a fork?",
        answers: [
            { text: "Spaghetti", correct: false },
            { text: "Chips", correct: false },
            { text: "Soup", correct: false },
            { text: "Fried Chicken", correct: true }]
    },

    {
        question: "What is measured in Mickeys?",
        answers: [
            { text: "The speed of a computer mouse", correct: true },
            { text: "Speed of a Cat", correct: false },
            { text: "Speed of a Mouse", correct: false },
            { text: "Speed of a Dog", correct: false }]
    },

    {
        question: "What is Trojan horse malware?",
        answers: [
            { text: "When a horse is delivered to our home", correct: false },
            { text: "Disguised as legitimate software to steal your sensitive data etc", correct: true },
            { text: "Spartacus", correct: false },
            { text: "A wooden horse used by the Greeks", correct: false }]
    },

    {
        question: "When was the first computer invented?",
        answers: [
            { text: "1943", correct: true },
            { text: "1845", correct: false },
            { text: "2001", correct: false },
            { text: "1878", correct: false }]
    },

    {
        question: "Po-ta-toes. Boil ‘em. Mash ‘em. Stick ‘em in a ____________.”",
        answers: [
            { text: "Pot", correct: false },
            { text: "Pie", correct: false },
            { text: "My mouth", correct: false },
            { text: "Stew", correct: true }]
    },
]

// Attach event listener to start button to call startGame function on click
startButton.addEventListener('click', startGame)

//start game function randomises the questions variable, hides elements and adds elements. Also calls start timer and next question functions
function startGame() {
    startButton.classList.add("hide")
    highscoreElement.classList.add("hide")
    resetButtonElement.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    correctCounter = 0
    questionContainerElement.classList.remove("hide")
    secondElement.classList.remove("hide")
    startTimer()
    timerElement.classList.remove("hide")
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//show question function renders questions and answers to the page as well as counts correct questions
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//select answer function targets the users answer and adds to the correct counter as well as takes 5 seconds if incorrect answer is seleted 
function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    if (correct) {
        correctCounter++;
        localStorage.setItem("correctCount", correctCounter);
    }
    if (currentQuestionIndex < 4) {
        currentQuestionIndex++
        setNextQuestion()
    } else {
        EndGame()
    }
    if (!correct && timerCount > 5) {
        timerCount = timerCount - 5;
        timerElement.textContent = timerCount
    }
    if (!correct && timerCount <= 5) {
        EndGame()
    }
}

//End Game function calls submit high score and stops timer
function EndGame() {
    submitHighScore()
    questionContainerElement.classList.add("hide")
    clearInterval(timer);
}

//submit high score function hides and shows elements
function submitHighScore() {
    formElement.classList.remove("hide")
    timerElement.classList.add("hide")
    secondElement.classList.add("hide")
}

// Attach event listener to highScore button
submitButtonElement.addEventListener('click', highScore)

//high score function saves user input and renders to the page
function highScore(event) {
    // Prevent default action
    event.preventDefault();
    formElement.classList.add("hide")
    highscoreElement.classList.remove("hide")
    var highScoreArray = JSON.parse(localStorage.getItem("highScoreList"));
    if (highScoreArray == null) {
        highScoreArray = []
    }
    response = ' Player: ' + nameInput.value + ' Score: ' + correctCounter;
    highScoreArray.push(response)
    console.log(highScoreArray)
    localStorage.setItem("highScoreList", JSON.stringify(highScoreArray));
    startButton.classList.remove("hide")
    playerScore.textContent = JSON.parse(localStorage.getItem("highScoreList"));
}

// The setTimer function starts and stops the timer 
function startTimer() {
    // Sets timer
    timerCount = 30;
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount <= 0) {
            // Clears interval
            clearInterval(timer);
            EndGame();
        }
    }, 1000);
}

// The high score page function hides and shows elements as well as rendering the high score board 
function highScorePage() {
    EndGame()
    playerScore.textContent = JSON.parse(localStorage.getItem("highScoreList"));
    startButton.classList.remove("hide")
    questionContainerElement.classList.add("hide")
    timerElement.classList.add("hide")
    formElement.classList.add("hide")
    highscoreElement.classList.remove("hide")
    resetButtonElement.classList.remove("hide")
}

// Attach event listener to high Score button
highScorebtnEl.addEventListener("click", highScorePage)

// The reset game page function clears the high score button
function resetHighScore() {
    window.localStorage.clear();
    playerScore.textContent = JSON.parse(localStorage.getItem("highScoreList"));
}

// Attaches event listener to button
resetButtonElement.addEventListener("click", resetHighScore);