// Get HTML elements
const highScoresDivElQ = document.querySelector("#highScores");
const timerDivElQ = document.querySelector("#timer");
const timeCountDownSpanElQ= document.querySelector("#timeCountDown");
const timerPenaltyMsgSpanElQ= document.querySelector("#penaltyMsg");

const startScreenDivElQ = document.querySelector("#startScreen");
const startButtonElQ = document.querySelector("#startButton");

const endScreenDivElQ = document.querySelector("#endScreen");
const restartButtonElQ = document.querySelector("#restartButton");
const backButtonElQ = document.querySelector("#backButton");
const userScoreMsgSpanElQ = document.querySelector("#userScoreMsg");

const questionsDivElQ = document.querySelector("#questionsDiv");
const questionTitleElQ = document.querySelector("#questionTitle");
const questionChoicesDivElQ = document.querySelector("#questionChoicesDiv");
const answerMsgDivElQ = document.querySelector("#answerMsgDiv");

const initialsInputElQ = document.querySelector("#initials");
const userSubmitBtnElQ = document.querySelector("#submitUser");
const feedbackDivElQ = document.querySelector("#feedback");
const highScoreMsgSpanElQ = document.querySelector("#highScoreMsg");



// Set timer

var timer;
var timerCount;
var quizActive = true;

// set quiz related variables
var numQuestionReq;
var numQuestionCount;
var chosenQuestion;
var questionsToChooseArray;
var questionSecAllowed; // 5 secs per question

// Scores and penalty
var userScoreCurr = 0;
var penaltyCount = 0;
var secondsDeducted = 0;
var wrongAnsTimeDeduct = 2; 

// Array to hold user stats in the local storage
var userStatsArray;

// get the restart game flag from local storage. This is set by the highScores.html. If flag is true then run the quiz immediately 


// initialization

function initQuiz() {
    quizActive = true;
    questionsToChooseArray = Array.from(questionsArray);
    numQuestionCount = 0;
    chosenQuestion = [];
    userScoreCurr = 0;
    numQuestionReq = 3;
    questionSecAllowed = 6;
    timerCount = questionSecAllowed * numQuestionReq; 
    userAnswer = "";
    correctAnswer = "";
    penaltyCount = 0;
    secondsDeducted = 0;
    timerDivElQ.setAttribute("class", "hide");
    timerPenaltyMsgSpanElQ.innerHTML = "";
    timeCountDownSpanElQ.textContent = "";
}

// initialize the page on load
initQuiz();

//- Create timer function

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        timerCount--;

        timeCountDownSpanElQ.textContent = "Time: " + timerCount + "s left";
        if (timerCount >= 0) {
        // Tests if win condition is met
            if (!(quizActive) && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                timeCountDownSpanElQ.textContent = "Time: " + timerCount + "s left";
            };
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            timeCountDownSpanElQ.textContent = "Time is up!";
            quizActive = false;
            endQuiz();
        };
    }, 1000);
    timerDivElQ.setAttribute("class", "timer");
}



// Start or restart the Quiz with event listeners

startButtonElQ.addEventListener("click", function(event) {
    initQuiz();
    startTimer();
    renderQuestion();
}
);

restartButtonElQ.addEventListener("click", function(event) {
    initQuiz();
    startTimer();
    renderQuestion();
});

backButtonElQ.addEventListener("click", function(event) {
    highScoresDivElQ.setAttribute("class","visible");
    startScreenDivElQ.setAttribute("class","visible");
    timerDivElQ.setAttribute("class","hide");
    questionsDivElQ.setAttribute("class","hide");
    endScreenDivElQ.setAttribute("class","hide");
});


// Rendering the questions
//- create a new array to hold all the questions first and then once the question is picked by getQuizQuestion() it will be removed from this array so that repeated questions will not be shown

// Step 1: Get the question first. Making sure there are no repeats
function getQuizQuestion() {

    let randomIndex = Math.floor(Math.random() * questionsToChooseArray.length);

    chosenQuestion = [];
    chosenQuestion.push(questionsToChooseArray[randomIndex]);

    // remove the chosen question from the array of questions
    if (questionsToChooseArray.length > 0) {
        questionsToChooseArray.splice(randomIndex,1);
    };

    numQuestionCount++;
};
//- end of function questionsToChooseArray()

// Step 2: render the question onto webpage
function renderQuestion() {

    if (numQuestionCount < numQuestionReq) {
    // Get the Question Data set: 
    getQuizQuestion();

    // make the relevant div to be visible or hidden
    highScoresDivElQ.setAttribute("class","hide");
    startScreenDivElQ.setAttribute("class","hide");
    timerPenaltyMsgSpanElQ.setAttribute("class","visible");
    endScreenDivElQ.setAttribute("class","hide");
    feedbackDivElQ.setAttribute("class","hide");
    questionsDivElQ.setAttribute("class","visible");
    questionChoicesDivElQ.addEventListener("click", activeQuiz);
    answerMsgDivElQ.innerHTML = "";

    userAnswer = "";
    correctAnswer = "";

    questionTitleElQ.innerHTML = "Question " + numQuestionCount + ":<br><br>" + chosenQuestion[0].question;
    correctAnswer = chosenQuestion[0].answer;

    questionChoicesDivElQ.innerHTML = "<ol><li id='a'>"
        + chosenQuestion[0].option.a + "</li><li id='b'>" 
        + chosenQuestion[0].option.b + "</li><li id='c'>" 
        + chosenQuestion[0].option.c + "</li><li id='d'>" 
        + chosenQuestion[0].option.d +"</li></ol>";

    } else {
        endQuiz();
    };
};

//- end of function renderQuestion

//- function to attach to the event listener on options of the MCQ so that user click can be registered and processed.

function activeQuiz(event) {
    if(event.target && event.target.nodeName === "LI") {
        userAnswer = event.target.id;
        checkAnswer();
        renderQuestion();
        return;
    }
}

// function to verify user's answer input
// apply penalty if answer is wrong

const audioCorrect = new Audio("../assets/sfx/correct.wav");
const audioWrong = new Audio("../assets/sfx/incorrect.wav");

function checkAnswer() {
    if ( (userAnswer === correctAnswer)) {
        audioCorrect.play();
        answerMsgDivElQ.innerHTML = "<i class='fa-solid fa-face-smile-halo'></i> Correct!!!!! 🙆🏻‍♂️";
        userScoreCurr ++;
    } else {
        audioWrong.play();
        answerMsgDivElQ.innerHTML = "<i class='fa-regular fa-face-woozy'></i> uh oh! Wrong answer!!!!! 🙅🏻‍♂️";
        timerCount = timerCount - wrongAnsTimeDeduct; // time reduced by 3s if answer is wrong
        penaltyCount ++;
        secondsDeducted = penaltyCount * wrongAnsTimeDeduct;       
        timerPenaltyMsgSpanElQ.setAttribute("class","visible");
        timerPenaltyMsgSpanElQ.innerHTML = "Penalty: " + penaltyCount + "<br>Total Seconds Deducted: " + secondsDeducted;
    };
}

//- function for when quiz ends so that scores can be shown etc
function endQuiz() {
    
    quizActive = false;
    
    // reveal the scores and messages 
    highScoresDivElQ.setAttribute("class","scores");
    endScreenDivElQ.setAttribute("class","visible");

    // hide the MCQ quiz area and remove listener on the mcq options.
    questionsDivElQ.setAttribute("class","hide");
    questionChoicesDivElQ.removeEventListener("click", activeQuiz);
    
    //- set user score messages
    if (userScoreCurr === numQuestionReq) {
        userScoreMsgSpanElQ.innerHTML = "<i class='fa-regular fa-face-grin'></i> Well done! You have a perfect score of " + userScoreCurr + " out of " + numQuestionReq +"!";
    } else if ((userScoreCurr > 0) && (userScoreCurr < numQuestionReq)) {
        userScoreMsgSpanElQ.innerHTML = "<i class='fa-regular fa-face-meh'></i> Close but no cigar! Your score is " + userScoreCurr + ". <br> Aim for perfect score next time! <br> <i class='fa-solid fa-person-digging'></i> You can do it!";
    } else {
        userScoreMsgSpanElQ.innerHTML = "<i class='fa-solid fa-face-grimace'></i> Oh dear! Your score is " + userScoreCurr + ". <br> Please try harder! <i class='fa-solid fa-dumbbell'></i> You can make it!";
    };
    
    // add listener to the user submit button for high scores
    userSubmitBtnElQ.addEventListener("click", function(event) {
        userInitials = initialsInputElQ.value;
        prepHighScore();
        return;
    });

    return;
};

// updating High Scores in local storage

const maxHighScoresUsers = 3; // number of user stats to be stored
var userStatsStored;
var userStats;
var prevMinScore;
var userInitials; 

function sortUserStats() {
    userStatsStored.sort((s1, s2) => (s1.userScore < s2.userScore) ? 1 : (s1.userScore > s2.userScore) ? -1 :0);
}


function prepHighScore() {

    userStatsStored = JSON.parse(localStorage.getItem("userStats"));

    if (userStatsStored === null) {
        userStatsStored = [];
        prevMinScore = 0;
    } else {
        sortUserStats();
        prevMinScore = userStatsStored[userStatsStored.length - 1].userScore;
    };

// Updates win count on screen and sets win count to client storage 

    if (userStatsStored.length < maxHighScoresUsers) {
        // just insert the current user
        // sort the array and then put into local storage
        // respond with a message

        userStatsStored.push(
            {
            userInitials: userInitials,
            userScore: userScoreCurr,
            currentScore : true,
            }
        );

        sortUserStats();
        localStorage.setItem("userStats", JSON.stringify(userStatsStored));
        feedbackDivElQ.setAttribute("class","visible");
        highScoreMsgSpanElQ.innerHTML = "You are in the league table!";
    
    } else {
        // check if the score is good enough to be inserted into the high scores
        // respond with a message
        if (userScoreCurr > prevMinScore) {
            //removed last element with the lowest score
            userStatsStored.pop(); 
            // insert latest score
            userStatsStored.push(
                {
                userInitials: userInitials,
                userScore: userScoreCurr,
                currentScore : true,
                }
            );

            sortUserStats();
            localStorage.setItem("userStats", JSON.stringify(userStatsStored));
            feedbackDivElQ.setAttribute("class","visible");
            highScoreMsgSpanElQ.innerHTML = "You are in the league table!";
        } else {
            // sorry not good enough to be in high scores league table
            feedbackDivElQ.setAttribute("class","visible");
            highScoreMsgSpanElQ.innerHTML = "Sorry! Your score is not high enough to enter the league table.";
        };
    };
}




