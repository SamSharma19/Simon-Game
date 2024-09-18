var buttons = ['red', "blue", "green", "yellow"];
var pattern = [];
var userclicked = [];

//to start the gamne
var started = false;

//level of the game
var level = 0;

//checking if game is over or not
var gameover = 0;



//detecting key press to start the game
$(document).keypress(function() {
    if (!started) {
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
});

function nextSequence() {

    level++;
    //Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttons[randomNumber];
    pattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour); 
}

//selecting audio
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//adding event listener to all elements
$(".btn").on('click' , function() {
    var userChosenColour = $(this).attr("id");
    userclicked.push(userChosenColour);
    playSound(userChosenColour);
    $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    checkanswer(userclicked.length-1);  //calling check answer after user has clicked
});

function checkanswer(currlevel) {
     
    //if the answer matches the sequence user chose
    if(pattern[currlevel] === userclicked[currlevel])
    {
      //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
      if (userclicked.length === pattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
         userclicked = [];
      }

    } else {

        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 2000);
  
        //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        level = 0;
        started = false;
        pattern = [];
        userclicked = [];
    }
}








