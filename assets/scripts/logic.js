// Get HTML elements
var highScoresDivElQ = document.querySelector("#highScores");
var timerDivElQ = document.querySelector("#timer");
var timeCountDownSpanElQ= document.querySelector("#timeCountDown");
var timerPenaltyMsgSpanElQ= document.querySelector("#penaltyMsg");

var startScreenDivElQ = document.querySelector("#startScreen");
var startButtonElQ = document.querySelector("#startButton");

var endScreenDivElQ = document.querySelector("#endScreen");
var restartButtonElQ = document.querySelector("#restartButton");
var userScoreMsgSpanElQ = document.querySelector("#userScoreMsg");

var questionsDivElQ = document.querySelector("#questionsDiv");
var questionTitleElQ = document.querySelector("#questionTitle");
var questionChoicesDivElQ = document.querySelector("#questionChoicesDiv");
var answerMsgDivElQ = document.querySelector("#answerMsgDiv");

var initialsInputElQ = document.querySelector("#initials");
var userSubmitBtnElQ = document.querySelector("#submitUser");
var feedbackDivElQ = document.querySelector("#feedback");
var highScoreMsgSpanElQ = document.querySelector("#highScoreMsg");



// Set timer

var timer;
var timerCount;
var quizActive = true;

// set quiz related variables
// var numQuestionMax = questionsArray.length;
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


// initialization

function initQuiz() {
    quizActive = true;
    questionsToChooseArray = Array.from(questionsArray);
    numQuestionCount = 0;
    chosenQuestion = [];
    userScoreCurr = 0;
    numQuestionReq = 3;
    questionSecAllowed = 5;
    timerCount = questionSecAllowed * numQuestionReq; 
    userAnswer = "";
    correctAnswer = "";
}




function startTimer() {
    timerDivElQ.setAttribute("class", "timer");
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        // console.log("timerCount",timerCount)
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
    initQuiz()
    renderQuestion();
    startTimer();
}
);

restartButtonElQ.addEventListener("click", function(event) {
    initQuiz();
    renderQuestion();
    startTimer();
}
);


// Rendering the questions
//- create a new array to hold all the questions first and then once the question is picked by getQuizQuestion() it will be removed from this array so that repeated questions will not be shown

// Get the question first. Making sure there are no repeats
function getQuizQuestion() {
    console.log("questionsToChooseArray length:", questionsToChooseArray.length);

    let randomIndex = Math.floor(Math.random() * questionsToChooseArray.length);

    console.log("randomIndex", randomIndex);
    chosenQuestion = [];
    chosenQuestion.push(questionsToChooseArray[randomIndex]);
    console.log("chosenQuestion:",chosenQuestion);   
    // remove the chosen question from the array of questions
    if (questionsToChooseArray.length > 0) {
        questionsToChooseArray.splice(randomIndex,1);
    };
    console.log("questionsToChooseArray:",questionsToChooseArray);
    console.log("questions left:",questionsToChooseArray.length);
    numQuestionCount++;
};
//- end of function questionsToChooseArray()

// render the question.
function renderQuestion() {

    if (numQuestionCount < numQuestionReq) {
    // Get the Question Data set: 
    getQuizQuestion();

    // make the relevant div to be visible or hidden
    highScoresDivElQ.setAttribute("class","hide");
    startScreenDivElQ.setAttribute("class","hide");
    timerPenaltyMsgSpanElQ.setAttribute("class","hide");
    endScreenDivElQ.setAttribute("class","hide");
    feedbackDivElQ.setAttribute("class","hide");

    questionsDivElQ.setAttribute("class","visible");
    questionChoicesDivElQ.addEventListener("click", activeQuiz);
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

function activeQuiz(event) {
    if(event.target && event.target.nodeName === "LI") {
        console.log("I'm here!");
        userAnswer = event.target.id;
        console.log("user answer:", userAnswer);
        checkAnswer();
        renderQuestion();
        return;
    }
}


function checkAnswer() {
    console.log("checkAns== userAnswer is", userAnswer,"vs correctAnswer is", correctAnswer);
    if ( (userAnswer === correctAnswer)) {
        answerMsgDivElQ.innerHTML = "<i class='fa-solid fa-face-smile-halo'></i> Correct!!!!! 🙆🏻‍♂️";
        console.log("correct!!!!! 🙆🏻‍♂️");
        userScoreCurr ++;
        console.log("userScore:", userScoreCurr);
} else {
    answerMsgDivElQ.innerHTML = "<i class='fa-regular fa-face-woozy'></i> uh oh! Wrong answer!!!!! 🙅🏻‍♂️";
    timerCount = timerCount -2; // time reduced by 2s if answer is wrong
    penaltyCount ++;
    secondsDeducted = penaltyCount * wrongAnsTimeDeduct;

    timerPenaltyMsgSpanElQ.setAttribute("class","visible");
    timerPenaltyMsgSpanElQ.innerHTML = "Penalty: " + penaltyCount + "<br>Total Seconds Deducted: " + secondsDeducted;

    console.log("🙅🏻‍♂️ uh oh! Wrong answer!!!!! 🙅🏻‍♂️");
    console.log("userScore:", userScoreCurr);
};
}

function endQuiz() {
        // - numQuestionCount > numQuestionReq
        //- end the quiz
        console.log("finish!!!!");
        quizActive = false;

        console.log("quizActive", quizActive);
        console.log("questionsToChooseArray length:",questionsToChooseArray.length);
        highScoresDivElQ.setAttribute("class","scores");
        endScreenDivElQ.setAttribute("class","visible");

        //- set user score messages
        console.log("userScore:",userScoreCurr);
        console.log("numQuestionReq:",numQuestionReq);

        if (userScoreCurr === numQuestionReq) {
            userScoreMsgSpanElQ.innerHTML = "<i class='fa-solid fa-trophy-star'></i>Very Well done! You have a perfect score of " + userScoreCurr + " out of " + numQuestionReq +"!";
        } else if ((userScoreCurr > 0) && (userScoreCurr < numQuestionReq)) {
            userScoreMsgSpanElQ.innerHTML = "<i class='fa-solid fa-face-unamused'></i> Close but no cigar! Your score is " + userScoreCurr + ". <br> Aim for perfect score next time! <br> <i class='fa-solid fa-person-digging'></i> You can do it!";
        } else {
            userScoreMsgSpanElQ.innerHTML = "<i class='fa-solid fa-face-grimace'></i> Oh dear! Your score is " + userScoreCurr + ". <br> Please try harder! <i class='fa-solid fa-dumbbell'></i> You can make it!";
        };
        questionsDivElQ.setAttribute("class","hide");
        questionChoicesDivElQ.removeEventListener("click", activeQuiz);
        return;
};



    userSubmitBtnElQ.addEventListener("click", function(event) {
        console.log("im' here!!!! after clicking submit");
        userInitials = initialsInputElQ.value;
        console.log("userInitials:",userInitials)
        prepHighScore();
        return;
        }
    )
;




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
    console.log("here!:", userStatsStored)
    console.log("prevMinScore:", prevMinScore);
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



initQuiz();

