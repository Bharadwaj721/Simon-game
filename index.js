var buttonColours=["red","blue","green","yellow"]
var gamePattern=[]
var userClickedPattern=[]
var level=0
var isGameStarted=false
var lastIndex=-1
function nextSequence()
{
    level++
    lastIndex=-1
    userClickedPattern=[]
    $("h1").text("level "+level)
    var randomNumber=Math.floor((Math.random())*4);
    var randomlyChoosenColour=buttonColours[randomNumber];
    gamePattern.push(randomlyChoosenColour);
    animatePress(randomlyChoosenColour)
    playSound(randomlyChoosenColour)
}

$(".btn").click(function() {
     var userChoosenColour=$(this).attr("id");
     userClickedPattern.push(userChoosenColour);
     playSound(userChoosenColour)
     animatePress(userChoosenColour)
     lastIndex++
     checkAnswer(lastIndex)
});

function playSound(name)
{
    var audio=new Audio("./sounds/"+name+".mp3")
    audio.play();
}

function animatePress(currentColour)
{
    var pressedButton="#"+currentColour
    $(pressedButton).addClass("pressed")
    setTimeout(function(){
    $(pressedButton).removeClass("pressed")
    },100)
}

$(document).keydown(function(){
   if(isGameStarted == false)
   {
      $("h1").text("level "+level);
      isGameStarted = true;
      nextSequence();
   }
});

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel])  
    {
        if(currentLevel+1 == gamePattern.length)
        {
            setTimeout(function(){nextSequence()},1000)
        }
    }
    else 
    {
        var audio=new Audio("./sounds/wrong.mp3")
        audio.play()
        $("body").addClass("game-over")
        $("h1").text("Game over,press any key to restart")
        isGameStarted=false
        level=0
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200)
    }
}