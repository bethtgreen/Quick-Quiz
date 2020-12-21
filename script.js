var questions = [
    {
        question: "What is the rarest M&M color?", 
        choices:["blue", "brown", "green", "yellow"],
        correct: "brown"
    },
    {
        question: "Which of these candies is vegan?", 
        choices:["Airheads", "Twix", "Kit-Kat", "Candy Corn"],
        correct: "Airheads"
    }

];
//global variables
var questionEl = document.getElementById("question");
var startButton = document.getElementById("start");
var questionContainer = document.getElementById("question-container");
var answerButtons = document.getElementById("answer-buttons");
var correct = [];
var index = 0;
var time = 100;
var timerId;
var timerEl = document.getElementById("timer");
var submitButton = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
//functions
function buildQuestionCard() {
    timerId = setInterval(clockTick, 1000)
    answerButtons.innerHTML = "";
    var currentQuestion = questions[index]
    questionEl.textContent = currentQuestion.question;

    currentQuestion.choices.forEach(choice => {
        var button = document.createElement("button");
        button.textContent = choice;
        button.setAttribute("value", choice);

        button.onclick = questionClick;
        answerButtons.appendChild(button);
    });
}
function clockTick(){
time--;
timerEl.textContent = time;
if (time <= 0) {
    endGame();
}

}

function startQuiz() {
    var startEl = document.getElementById("start-container");
    startEl.setAttribute("class", "hide");
    questionContainer.removeAttribute("class", "hide");
    buildQuestionCard()
}
function questionClick(){
    console.log(this.value)
    if (this.value !== questions[index].correct){
        console.log("wrong");
        // take time off timer 
        time -= 15;
        //check for 0 on timer

        if (time < 0) {
            time = 0 
        }
        timerEl.textContent = time;
    } 
    else {
        console.log("correct");
        // add question to correct array 
        correct.push(questions[index].correct)
    }
    index++; 
    if (index === questions.length){
    endGame();
    } else {
        buildQuestionCard();

    }
    // move on to next question
} 
function endGame(){
    clearInterval(timerId);
    questionContainer.setAttribute ("class", "hide");
    var endScreen = document.getElementById("end-container");
    endScreen.removeAttribute("class", "hide");
}
function saveHighScore(){
var initials = initialsEl.value.trim();
console.log(initials);
var score = correct.length * time;
console.log(score);
var newScore = {
    score, initials
}
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
console.log(highscores);

highscores.push(newScore);
localStorage.setItem("highscores", JSON.stringify(highscores));
console.log(localStorage);
}
//event listeners
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", saveHighScore);
