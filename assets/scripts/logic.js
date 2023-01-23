// Get HTML elements
var highScoresDivElQ = document.querySelector("#highScores");
var timerDivElQ = document.querySelector("#timer");
var timeCountDownSpanElQ= document.querySelector("#timeCountDown");

var startScreenDivElQ = document.querySelector("#startScreen");
var startButtonElQ = document.querySelector("#startButton");

var endScreenDivElQ = document.querySelector("#endScreen");
var restartButtonElQ = document.querySelector("#restartButton");
var userScoreMsgSpanElQ = document.querySelector("#userScoreMsg");

var questionsDivElQ = document.querySelector("#questionsDiv");
var questionTitleElQ = document.querySelector("#questionTitle");
var questionChoicesDivElQ = document.querySelector("#questionChoicesDiv");
var answerMsgDivElQ = document.querySelector("#answerMsgDiv");
// var questionChoicesDivEl = document.getElementById("#questionChoicesDiv");

var endScreenDivEl = document.getElementById("#endScreen");
var finalScoreSpanEl = document.getElementById("#finalScore")

var feedbackDivEl = document.getElementById("#feedback");

//- initialize
var quizActive = true;
var numQuestionReq = 3;

function init() {
    quizActive = true;
    userScoreMsg = "";
};

// Set timer

var timer;
var timerCount;

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        console.log("timerCount",timerCount)
        timeCountDownSpanElQ.textContent = ": " + timerCount + "s left";
        if (timerCount >= 0) {
        // Tests if win condition is met
            if (!(quizActive) && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                timeCountDownSpanElQ.textContent = ": " + timerCount + "s left";

            };
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            timeCountDownSpanElQ.textContent = " is up!";
            quizActive = false;
            endQuiz();
        };
    }, 1000);
}


// Start or restart the Quiz

startButtonElQ.addEventListener("click", function(event) {
    quizActive = true;
    timerCount = 5 * numQuestionReq; // * 15s per question
    renderQuestion();
    startTimer();
}
);

restartButtonElQ.addEventListener("click", function(event) {
    quizActive = true;
    timerCount = 5 * numQuestionReq; // * 15s per  question
    renderQuestion();
    startTimer();
}
);


// PW rendering the questions


var numQuestionMax = questionsArray.length;
var numQuestionCount = 0;
var chosenQuestion = [];



//- create a new array to hold all the questions first and then once the question is picked by getQuizQuestion() it will be removed from this array szo that repeated questions will not be shown
var questionsToChooseArray = questionsArray;

function getQuizQuestion() {

    let randomIndex = Math.floor(Math.random() * questionsToChooseArray.length);

    console.log("randomIndex", randomIndex);

    chosenQuestion = [];
    chosenQuestion.push(questionsToChooseArray[randomIndex]);

    console.log("chosenQuestion:",chosenQuestion);   
    if (questionsToChooseArray.length > 0) {
        questionsToChooseArray.splice(randomIndex,1);
    };
    console.log("questionsToChooseArray:",questionsToChooseArray);

    numQuestionCount++;
};
//- end of function questionsToChooseArray()

var userAnswer;
var correctAnswer;
var userScoreMsg;

function renderQuestion() {

    if (numQuestionCount < numQuestionReq) {
    // Get the Question Data set: 
    getQuizQuestion();

    // make the relevant div to be visible or hidden
    highScoresDivElQ.setAttribute("class","hide");
    startScreenDivElQ.setAttribute("class","hide");
    questionsDivElQ.setAttribute("class","visible");
    
    answerMsgDivElQ.innerHTML = "";

    userAnswer = "";
    correctAnswer = "";
    console.log("Question:", numQuestionCount);

    questionTitleElQ.innerHTML = "Question " + numQuestionCount + ":<br><br>" + chosenQuestion[0].question;
    correctAnswer = chosenQuestion[0].answer;
    console.log("Correct Answer:", correctAnswer);

    questionChoicesDivElQ.innerHTML = "<ol><li id='a'>"
        + chosenQuestion[0].option.a + "</li><li id='b'>" 
        + chosenQuestion[0].option.b + "</li><li id='c'>" 
        + chosenQuestion[0].option.c + "</li><li id='d'>" 
        + chosenQuestion[0].option.d +"</li></ol>";

        console.log("numQuestionCount:",numQuestionCount);
        console.log("quizActive", quizActive);
    } else {
        endQuiz();
    };
};



//- end function renderQuestion
if (quizActive) {
questionChoicesDivElQ.addEventListener("click", function(event) {
    if(event.target && event.target.nodeName === "LI") {
        console.log("I'm here!");
        userAnswer = event.target.id;
        console.log("user answer:", userAnswer);
        checkAnswer();
        renderQuestion();
        return;
    }
})
// } else {
//     highScoresDivElQ.setAttribute("class","scores");
//     startScreenDivElQ.setAttribute("class","start");
//     questionsDivElQ.setAttribute("class","hide");
};  

var userScore = 0;

function checkAnswer() {
    console.log("checkAns== userAnswer is", userAnswer,"vs correctAnswer is", correctAnswer);
    if ( (userAnswer === correctAnswer)) {
        answerMsgDivElQ.innerHTML = "<i class='fa-solid fa-face-smile-halo'></i> Correct!!!!! 🙆🏻‍♂️";
        console.log("correct!!!!! 🙆🏻‍♂️");
        userScore ++;
        console.log("userScore:", userScore);
} else {
    answerMsgDivElQ.innerHTML = "<i class='fa-regular fa-face-woozy'></i> uh oh! Wrong answer!!!!! 🙅🏻‍♂️";
    timerCount = timerCount -2; // time reduced by 2s if answer is wrong
    console.log("🙅🏻‍♂️ uh oh! Wrong answer!!!!! 🙅🏻‍♂️");
    console.log("userScore:", userScore);
};
}

function endQuiz() {
        // - numQuestionCount > numQuestionReq
        //- end the quiz
        console.log("finish!!!!");
        quizActive = false;
        console.log("quizActive", quizActive);
        highScoresDivElQ.setAttribute("class","scores");
        endScreenDivElQ.setAttribute("class","visible");
        //- set user score messages
        console.log("userScore:",userScore);
        console.log("numQuestionReq:",numQuestionReq);

        if (userScore === numQuestionReq) {
            userScoreMsgSpanElQ.innerHTML = "Very Well done! You have a perfect score of " + userScore + " out of " + numQuestionReq +"!";
        } else if ((userScore > 0) && (userScore < numQuestionReq)) {
            userScoreMsgSpanElQ.innerHTML = "Close but no cigar! Your score is " + userScore + ". Aim for perfect score next time! You can do it!";
        } else {
            userScoreMsgSpanElQ.innerHTML = "Oh dear! Your score is " + userScore + ". Please try harder! You can make it!";
        };

        questionsDivElQ.setAttribute("class","hide");
        return;
};



// function checkAnswer(userAnswer, correctAnswer) {
//     if (userAnswer === correctAnswer) {
//         console.log("right!");
//         answerMsgDivElQ.innerHTML = "Correct! 🙆🏻‍♂️";
//     } else 
//     {
//         console.log("wrong!");
//         answerMsgDivElQ.innerHTML = "Wrong! 🙅🏻‍♂️";
//     };
// }
