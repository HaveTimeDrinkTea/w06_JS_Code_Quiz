// Get HTML elements
var highScoresDivElQ = document.querySelector("#highScores");
var timerDivEl = document.getElementById("#timer");
var timeCountDownSpanEl= document.getElementById("#timeCountDown");

var startScreenDivElQ = document.querySelector("#startScreen");
var startButtonEl = document.getElementById("#startButton");

var questionsDivElQ = document.querySelector("#questionsDiv");
var questionTitleElQ = document.querySelector("#questionTitle");
var questionChoicesDivElQ = document.querySelector("#questionChoicesDiv");
var answerMsgDivElQ = document.querySelector("#answerMsgDiv");
// var questionChoicesDivEl = document.getElementById("#questionChoicesDiv");

var endScreenDivEl = document.getElementById("#endScreen");
var finalScoreSpanEl = document.getElementById("#finalScore")

var feedbackDivEl = document.getElementById("#feedback");

// PW rendering the questions

var numQuestion = 3;
var chosenQuestionsArray = [];
var questionIndex = 0 ;




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

var userAnswer;
var correctAnswer;

function renderQuestions() {
    // Get the Question Data set: 
    createQuizArray(numQuestion, questionsArray);
    console.log(chosenQuestionsArray);

    // make the relevant div to be visible or hidden
    highScoresDivElQ.setAttribute("class","hide");
    startScreenDivElQ.setAttribute("class","hide");
    questionsDivElQ.setAttribute("class","visible");
    
    answerMsgDivElQ.innerHTML = "";

    // present the question and options:
    // chosenQuestionsArray.forEach( (currentQuestion, i) => {
    //     answerMsgDivElQ.textContent = "";
    //     userAnswer = "";
    //     correctAnswer = "";
    //     console.log("i:", i)
    //     questionTitleElQ.innerHTML = "Question " + i + ":<br><br>" + chosenQuestionsArray[i].question;
    //     correctAnswer = chosenQuestionsArray[i].answer;
    //     console.log("Correct Answer:", correctAnswer);
    //     questionChoicesDivElQ.innerHTML = "<ol><li id='a'>"
    //         + chosenQuestionsArray[i].option.a + "</li><li id='b'>" 
    //         + chosenQuestionsArray[i].option.b + "</li><li id='c'>" 
    //         + chosenQuestionsArray[i].option.c + "</li><li id='d'>" 
    //         + chosenQuestionsArray[i].option.d +"</li></ol>";
    //     if (userAnswer === "") {
    //         questionChoicesDivElQ.addEventListener("click", function(event) {
    //             if(event.target && event.target.nodeName === "LI") {
    //                 console.log("I'm here!");
    //                 userAnswer = event.target.id;
    //                 console.log("user answer:", userAnswer);
    //                 return;        
    //             }
    //         });
    //     };    
    // });

    if (questionIndex >= chosenQuestionsArray.length) { 
        endQuiz(); 
        return; 
    };
    answerMsgDivElQ.textContent = "";
    correctAnswer = "";
    userAnswer = "";

    for (i = 0; i < chosenQuestionsArray.length; i++ ) {
        console.log("i:", i)
        questionTitleElQ.innerHTML = "Question " + i + ":<br><br>" + chosenQuestionsArray[i].question;
        correctAnswer = chosenQuestionsArray[i].answer;
        console.log("Correct Answer:", correctAnswer);
        questionChoicesDivElQ.innerHTML = "<ol><li id='a'>"
            + chosenQuestionsArray[i].option.a + "</li><li id='b'>" 
            + chosenQuestionsArray[i].option.b + "</li><li id='c'>" 
            + chosenQuestionsArray[i].option.c + "</li><li id='d'>" 
            + chosenQuestionsArray[i].option.d +"</li></ol>";

            questionChoicesDivElQ.addEventListener("click", function(event) {
                if(event.target && event.target.nodeName === "LI") {
                    console.log("I'm here!");
                    userAnswer = event.target.id;
                    console.log("user answer:", userAnswer);
                    return;        
                }});    
    };
}
    

    // checkAnswer(userAnswer, correctAnswer);    
        if (userAnswer === correctAnswer) {
            console.log("correct!!!!!");
    } else {
        console.log("wrong!!!!!");
    };
};
console.log(chosenQuestionsArray);
renderQuestions();

function checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
        console.log("right!");
        answerMsgDivElQ.innerHTML = "Correct! 🙆🏻‍♂️";
    } else 
    {
        console.log("wrong!");
        answerMsgDivElQ.innerHTML = "Wrong! 🙅🏻‍♂️";
    };


}
