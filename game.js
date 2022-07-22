var gamePattern = [];
var buttonColors =["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
var i = 0;

//Starts the game - detects keydown function to execute title change
$(document).keydown(function(){
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    };  
})


//Detects when the user clicks on one of the buttons and runs the next sequence
$(".btn").click(function() {
    //Identifies button clicked and adds to user's chosen pattern array
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
   
    //Animation of button and sound
    $("."+userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("."+userChosenColor).removeClass("pressed");
    },100);
    playSound(userChosenColor);
    
    //Checking Answer Function and passing current level, current level starts at 1 since the keydown adds level++.
    checkAnswer(userClickedPattern.length);

    //Debuggin
    console.log(userClickedPattern);
    console.log(gamePattern);


});

//plays sound when a color is passed to the function
function playSound(name){
    var playSound = new Audio("sounds/"+name+".mp3");
    playSound.play();
};

//button animation
function buttonAnimation(buttonPassed){
    $("."+buttonPassed).fadeOut(100).fadeIn(100);
}

//creates random number to feed
//pushes a new color into the sequence for the game's pattern
function nextSequence(){
userClickedPattern = [];
i = 0;
    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    setTimeout(playSoundAllLoop,500);
    // playSound(randomChosenColor);
    // buttonAnimation(randomChosenColor);
level++;
$("#level-title").text("Level "+level);
};

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel-1]===gamePattern[currentLevel-1]){
        console.log("Correct");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();        
    }

};

function startOver(){
level = 0;
gamePattern = [];
started = false;
}


// function playSoundAll(i){
//         setTimeout(playSound(gamePattern[i]),5000); //plays sound of button
//         setTimeout(buttonAnimation(gamePattern[i]),5000); //animates click of button
// }

function playSoundAllLoop(){
    setTimeout(function(){
        playSound(gamePattern[i]);
        buttonAnimation(gamePattern[i]);
        i++;
        if(i<gamePattern.length){
            playSoundAllLoop();
        }
    },500);
}

