// define variables
const highScoresTableOLElQ = document.querySelector("#highScoresTable");

const highScoresTitleEllQ = document.querySelector("#highScoreTitle");

const clearButtonElQ = document.querySelector("#clear");
const reStartButtonElQ = document.querySelector("#reStartButton");


var userStatsStored = JSON.parse(localStorage.getItem("userStats"));
var highScoresTableData = []; 


// present the league table

if (userStatsStored === null) {
    highScoresTableOLElQ.innerHTML = "<br>There are no user statistics in the league table (yet). <br><br>Why don't you be the first hero by taking the quiz?<br> <br>";
    clearButtonElQ.setAttribute("class","hide");
    highScoresTitleEllQ.setAttribute("class","hide");

} else {
    for (let i = 0; i < userStatsStored.length; i++) {
            let pointsText = "points";
            if (userStatsStored[i].userScore < 1) {  
                pointsText = "point"; 
            }; 
            highScoresTableData = highScoresTableData + "<li>" + (userStatsStored[i].userInitials).toUpperCase() + " --- [" + userStatsStored[i].userScore + " " + pointsText + "]" + "</li>";
        };
        
    highScoresTitleEllQ.setAttribute("class","visibleInline");
    
    highScoresTitleEllQ.innerHTML = "Top Scorers";
    highScoresTableOLElQ.innerHTML = highScoresTableData;

};

// event listener for the clear score button

function clearHighScores() {
    window.localStorage.removeItem("userStats");
    highScoresTableOLElQ.innerHTML = "All the high score stats has been cleared! <br><br> Now you can conquer this quiz all over again!";
    clearButtonElQ.setAttribute("class","hide");
}


clearButtonElQ.addEventListener("click", function(event) {
    clearHighScores();
}
);














