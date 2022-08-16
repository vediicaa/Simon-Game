var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var started=false;
var level=0;
$(".btn").click(function() {
  var userChosenColour= $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  console.log(userClickedPattern);
  console.log(userClickedPattern.length);
checkAnswer(userClickedPattern.length-1);
});

$("#level-title").text("Press Any Key To Start");
$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level"+ level);
    nextSequence();
    started=true;
  }
});
function nextSequence()
{
  level=level+1;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.random();
  randomNumber=randomNumber*4;
  randomNumber=Math.floor(randomNumber);
   userClickedPattern=[];
  var randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

$("#"+randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
var audio=new Audio('sounds/'+randomChosenColour+".mp3");
audio.play();
}
function playSound(name)
{
  var audio=new Audio('sounds/'+name+".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  console.log(currentColour);
  playSound(currentColour)
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentLevel)
{
  console.log(currentLevel);
  console.log(gamePattern[currentLevel]);
  console.log(userClickedPattern[currentLevel]);
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
   console.log("Success");
   if (userClickedPattern.length === gamePattern.length){
   setTimeout(nextSequence(),1000);}
 }
  else
  {
   console.log("Fail");
   var audio=new Audio('sounds/wrong.mp3');
   audio.play();
   $("*").addClass("game-over");
   setTimeout(function () {
     $("*").removeClass("game-over");
   }, 200);
   $("h1").text("GAME OVER, Press ANY Key to Restart");
   startOver();
}
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
