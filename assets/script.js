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

function EndGame() {
    submitHighScore()
    questionContainerElement.classList.add("hide")
    clearInterval(timer);
}

function submitHighScore() {
    formElement.classList.remove("hide")
    timerElement.classList.add("hide")
    secondElement.classList.add("hide")
}

submitButtonElement.addEventListener('click', highScore)
/*
var saveHighScore = {
    nameInput: nameImput.value.trim(),
    correctCounter: correctCounter.value
};*/

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

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
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



highScorebtnEl.addEventListener("click", highScorePage)


function resetGame() {
    window.localStorage.clear();
    playerScore.textContent = JSON.parse(localStorage.getItem("highScoreList"));
}

// Attaches event listener to button
resetButtonElement.addEventListener("click", resetGame);



/*
localStorage.setItem("studentGrade", JSON.stringify(studentGrade));
renderMessage();

});

function renderMessage() {
  var lastGrade = JSON.parse(localStorage.getItem("studentGrade"));
  if (lastGrade !== null) {
    document.querySelector(".message").textContent = lastGrade.student +
    " received a/an " + lastGrade.grade
  }
}
*/





