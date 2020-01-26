// alert("connected");'
var gamePattern=[];
var userClickedPattern=[];
var buttonColours =["red","blue","green","yellow"];
var started=false;
var level=0;




$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$( ".btn" ).click(function(){
    // alert("clicked");
    var userChosenColour =$(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
      console.log("wrong");
      setTimeout(function(){ startOver(); }, 2000);

    }

}

function nextSequence(){
    
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber=Math.floor(Math.random()*4); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// console.log(userClickedPattern);


function playSound(name){
  var audio = new Audio("sounds/" + name+ ".mp3");
    audio.play();
}

function animatePress(currentColor)
{
    $("#"+currentColor).click(function(){
        $(this).addClass("pressed");
    });
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function startOver(){
    location.reload(true);

}