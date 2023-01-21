// Get HTML elements
var scoresDivEl = document.getElementById("#scores");
var scoresDivEl = document.getElementById("#");
var timerDivEl = document.getElementById("#timer");
var timeCountDownSpanEl= document.getElementById("#timeCountDown");

var startScreenDivElQ = document.querySelector("#startScreen");
var startButtonEl = document.getElementById("#startButton");

var questionsDivElQ = document.querySelector("#questionsDiv");
var questionTitleElQ = document.querySelector("#questionTitle");
var questionChoicesEl = document.getElementById("#questionChoicesDiv");

var endScreenDivEl = document.getElementById("#endScreen");
var finalScoreSpanEl = document.getElementById("#finalScore")

var feedbackDivEl = document.getElementById("#feedback");

// PW rendering the questions

var numQuestion = 3;
var chosenQuestionsArray = [];

function createQuizArray(numQuestion, questionsArray) {
    //- create new array to hold questions, once a question is selected randomly it will be removed from the array. This is to ensure the same question is not chosen twice.

    let questionsToChooseArray = questionsArray;
    if (numQuestion < 3) { numQuestion = 3;};

    for (var i = 0; i < numQuestion; i++) {

        let randomIndex = Math.floor(Math.random() * questionsToChooseArray.length);
        chosenQuestionsArray.push(questionsToChooseArray[randomIndex]);
    };
    
    if (questionsToChooseArray > 0) {
        questionsToChooseArray.slice(i,1);
    };
};


function renderQuestions() {
    // Get the Question Data set: 
    createQuizArray(numQuestion, questionsArray);
    console.log(chosenQuestionsArray);

    startScreenDivElQ.setAttribute("class","hide");
    questionsDivElQ.setAttribute("class","visible");
    

    for (i = 0; i < chosenQuestionsArray.length; i++ ) {
        questionTitleElQ.textContent = chosenQuestionsArray[i];
    };
};

renderQuestions();
