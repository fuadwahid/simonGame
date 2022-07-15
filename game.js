
// 1. Create a variable that needed to create a sequence
// game pattern to store the pattern, user pattern to store the pattern that user click and button to call the color name
var gamePattern = [];
var userPattern = [];
var button = ['red', 'blue', 'yellow', 'green'];

// 2. Create a new sequence function to generate a random color ever sequence and store it to game pattern 
// also to increment the level and notify next color by using a fade in out

function newSequence() {
    //Skip part 🤗🙂🙂
    //6.Hello there😁
    level++; // Now we called this function again , the level will go up
    $('#level-title').text('Level ' + level);// and title change according to the level
    userPattern = [];// and we have to make sure that user pattern is empty again , because we want our user to memorize the
    //pattern from start until the last color that random generated

    //you can go back down from here 😄 , go to the click function because , after random color shown we will have to 
    //click right ?


    //Skip the explanation above , I will explain that later 😁
    var generateRandomNumber = Math.floor(Math.random() * button.length); // get a random number according to button length
    var randomColor = button[generateRandomNumber]; // get that number and put it in button array so we get the color 
    //and put it inside random color
    $('.' + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);//make a notification about new random color
    buttonSound(randomColor);//never forget the sound
    gamePattern.push(randomColor);//and push it inside a game pattern array

}

//3 . Make first keyboard encounter, to start a game we need to make a toggle by a key board
// so we make a boolean variable called started game to be state wheter the game is started or not
// and level in 0 because it's not increase yet

var level = 0;
var startedGame = false;

$('.start-btn').click(function (e) {
    if (startedGame == false) {
        newSequence();
        startedGame == true;
        $('.start-btn').text('Enjoy');
    }
});





// $(document).keydown(function (e) { //select the document
//     if (startedGame === false && e.key !== 'Escape') { //if the started game still false then...
//         newSequence(); // do a new sequence
//         startedGame = true;// and if they wanna touch the keyboard again then it will not affect anything because startedGame
//         //is already true :)
//     }
//     else if (startedGame === false && e.key === 'Escape') { //just my creativity 😁😀
//         alert('Get Out');
//     }

// });

//4 . so we are already doing a new sequence function , so we have a generated random color and we wanna follow the pattern

$('.btn').click(function () { // if the user click the .btn class then...
    var userChosenColor = this.id; // this btn id goes into userChosenColor variable
    userPattern.push(userChosenColor); // and we push it to user Pattern
    animatedPressed(userChosenColor); // and dont forget to animated it by send a userChosenColor to animatedPressed
    buttonSound(userChosenColor);//never forget the sound
    checkAnswer(userPattern.length - 1);// this is a tricky part .
    //We want to check the answer from user click and compare it to the gamePattern 
    //and Why -1 ? Because we wanna use array instead of real length of the array. Index start from 0 , remember ? 😊

    // 7. Hello again 
    // and after we have the new random number we will click based on the sequence
    // gamePattern['red','blue'] , say that game pattern is having this 2 color in array
    // so we will click the red first right? , so length of our userPattern will be 1 and we send 
    // it to the checkAnswer is 0 because 1-1 = 0 and it will check in if condition , and so forth untillll.......
    // go to If statement in the checkAnswer function 
});


//Boss fight
//5. Get the current level from the click method , if length of the userPattern array is 1 the we start to check the index
//from 0 
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) { // check the content of an array in spesific index / level
        console.log('Success');//make my heart calm 😅
        if (userPattern.length === gamePattern.length) {// hey here ,
            //This is use to check If we have already reach the length of the gamePattern array

            setTimeout(function () { //why we have to set 1 second before we called the function?
                newSequence(); //because it's delaying the new color to show up . so we have time to memorize the random sequence 
            }, 1000);
            //Now you have to go to the skip part above inside a new Sequence 😊
        }
    }

    // 8. And if it's not right then we have to start over and change some element 
    else {
        buttonSound('wrong'); //send a wrong string to buttonsound function
        $('body').addClass('game-over');//game over class added to the body
        setTimeout(function () {
            $('body').removeClass('game-over'); // and remove it after 200 ms
        }, 200);

        startOver();// start over the game
    }

}

//9. and we have it . We can do the code but we cant win the game 😂
function startOver() {
    $('h1').text('Game Over, Press Start Button Again');
    $('.start-btn').text('Start');
    level = 0;
    startedGame = false;
    gamePattern = [];
}



function animatedPressed(chosenColor) {
    $('.' + chosenColor).addClass('pressed');
    setTimeout(function () {
        $('.' + chosenColor).removeClass('pressed');
    }), 1000;
}

function buttonSound(colorSound) {
    var callSound = new Audio('sounds/' + colorSound + '.mp3');
    callSound.play();
}