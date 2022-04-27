var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

function nextSequence()
{

    // so now as we have written to increment then level in that document when we press the key
    //so do that in code
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + level);


  //// so in this part basically we define what we have basically to do
  //then in next steps we will write code on click or keypress just basic functionality
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    // now check how u can use jquery in animation and clicking effects 
    //like as seen in the jquery session we used various methods like 
    //fadein fadout and toggle to do betwwenn any of the animation effects

    //so

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //now here we want to play sound on each of the different color 
    //so here we use the basic javascript of making a new audio and 
    //selecting it for that specific color

    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();

    //calling the playSound function for undersatndability

    playSound(randomChosenColour);
}


//////next we will do functioning of buttons that if they got clicked 
//store the color of that clicked button in another array or 
//we dont have to store it inside console 
//because we are making a game so we have maintain decoram in the app

//so make an empty array for storing that colors of clicked buttons'



$(".btn").click(function()
{

    //this is used to select that id of the clicked button
    var userChosenColour = $(this).attr("id");

    //here it stores the value of the clicked button index in a sepearte array
    userClickedPattern.push(userChosenColour);
    ///adding sound to that button
    playSound(userChosenColour);

    // now adding animation to that button

    animante(userChosenColour);
 ////for checking only working prperly fine 
    console.log(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

//now if we have to play the sound then we can simply write as written above in the nextSequence 
//but to maintain the decoram and understandability we have to make a seperate function and put it int 
//the nextSequence();

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//so now firstly we have to add animation on clicking of the buttons as we have added sound 
//to those buttons and now the main work that is 
//remaining is working and animation 
//so lets do it 

function animante(currentColor)
{
    $("#" + currentColor).addClass("pressed");
    setTimeout(
        function()
        {
            $("#"+currentColor).removeClass("pressed");
        },100
    );
}


//now we are going to make the functioning of thesimon game by the code 

// so firstly we r maintaing a variable of started which is initailly equal to false

//then if it follows the code then we will do it true 
//then we will play our game 

// var started = false;

// var level = 0;

$(document).keypress(function()
{
    if(!started)
    {
       $("#level-title").text("Level" + level);
       nextSequence();
       started = true;
    }
});

//now we have to make the function in which we r writing the code 
//of the main functioning of the simon game 

function checkAnswer(currentLevel)
{
    //basic strategy

    //if the color that is randomly choosen by our laptop is equal to the 
    //color button clicked by the user 
    //then we can say that it is the same pattern formed by the user 
    //and then we can set the timeout to that function 
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            //if it is right then we have to call the nextSequence(); function after 1sec to make a delay in making the pattern 
            setTimeout(function()
            {
             nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");

        //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");
  
        //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("GAME OVER PRESS KEY TO START AGAIN");
    }
}