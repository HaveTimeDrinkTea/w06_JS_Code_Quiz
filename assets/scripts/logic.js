// Get HTML elements
var highScoresDivElQ = document.querySelector("#highScores");
var timerDivEl = document.getElementById("#timer");
var timeCountDownSpanEl= document.getElementById("#timeCountDown");

var startScreenDivElQ = document.querySelector("#startScreen");
var startButtonElQ = document.querySelector("#startButton");

var questionsDivElQ = document.querySelector("#questionsDiv");
var questionTitleElQ = document.querySelector("#questionTitle");
var questionChoicesDivElQ = document.querySelector("#questionChoicesDiv");
var answerMsgDivElQ = document.querySelector("#answerMsgDiv");
// var questionChoicesDivEl = document.getElementById("#questionChoicesDiv");

var endScreenDivEl = document.getElementById("#endScreen");
var finalScoreSpanEl = document.getElementById("#finalScore")

var feedbackDivEl = document.getElementById("#feedback");


// Start the Quiz

startButtonElQ.addEventListener("click", function(event) {
    renderQuestion();
}
);



// PW rendering the questions

var numQuestionReq = 3;
var numQuestionMax = questionsArray.length;
var numQuestionCount = 0;
var chosenQuestion = [];
var quizActive = true;


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
    } else {
        //- end the quiz
        console.log("finish!!!!");
        quizActive = false;
        return;
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
};  

function checkAnswer(userAnswer, correctAnswer) {
    if ( (userAnswer === correctAnswer)) {
        console.log("correct!!!!! 🙆🏻‍♂️");
} else {
    console.log("wrong!!!!! 🙅🏻‍♂️");
};
}





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
