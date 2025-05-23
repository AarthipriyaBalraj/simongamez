var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$("h1").on("keypress click touchstart", function (){
    if(!started){
        $("#level-title").text("Level" +" "+ level);
        nextSequence();
        started=true;
    }
});
$(document).on("keypress", function (){
    if(!started){
        $("#level-title").text("Level" +" "+ level);
        nextSequence();
        started=true;
        }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }else{
        console.log("failure");
        var audio=new Audio("wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level"+" " +level);
    var randomnumber =Math.floor(Math.random()*4);
    var randomChosenColour =buttonColours[randomnumber];
    gamePattern.push(randomChosenColour); 
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function playSound(name){
    var audio=new Audio(name + ".mp3");
    audio.play();
};
function animatePress(currentColour){
        $("#"+currentColour).addClass("pressed");
        setTimeout(function() {
            $("#"+currentColour).removeClass("pressed");
        }, 100);
};
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}