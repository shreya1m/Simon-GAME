
var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level=0;

$(document).keypress(function () //game starts when you click any key from keyboard  ...this is STEP-1
{
  
    if (started==false) {
    
    $("#level-title").text("Level"+level);//this line is optional if in future u get confused so let me tell you level 0 happens but staraight after level 0 there is nextsequence function call where we are increasing level that is why it happens so fast we can not see the change of level from 0 to 1 we directly see leve1. you can even comment out or remove this line...removing this will have no affect.
    nextSequence();
    started = true;
    
    }
});


//user chosen color i.e for collecting user choise i.e whether user press the same way the game pattern is.
$(".btn").click(function()//then after executing full keypress event when user click any button then this function get triggered i.e it is STEP-2
{
var userChosenColor=$(this).attr("id");//selecting selected button or buttons using this and giving the selected button id to userChosenColor("like-red,yellow,etc") after 1round it contains more than one colours like array of colors[red,green] bcoz all the buttons clicked will come in userchoiseColor and after 1round it will be more than 1 colors so baiscally any array of colors will form.
userClickedPattern.push(userChosenColor);

playSound(userChosenColor);

animatePress(userChosenColor);

checkAnswer(userClickedPattern.length-1);
}
);

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) //i.e gamePattern[3]==userClickedPattern[3] this is for first time i.e first time it will be 3 index of both gamePattern and userPattern.
    {

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } 
    else {
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");   

       $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
  

        //2. Call startOver() if the user gets the sequence wrong.
        startOver();
    }


    

}



function nextSequence()
{
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomColorChosen=buttonColors[randomNumber];
    

    gamePattern.push( randomColorChosen);
    $("#"+randomColorChosen).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColorChosen);
    
}

function playSound(name)
{
var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

//function animatePress(currentColor)
//{
 // $("#"+currentColor).addClass("pressed").delay(100).removeClass("pressed");

//}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }
  
//1. Create a new function called startOver().
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }
  