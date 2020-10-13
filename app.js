// game values
let  min = 1,
     max = 5,
     winningNum = getRandomNum(min, max),
     guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
        guessInput.value = ''; 

    }
});
// listen for guessBtn
guessBtn.addEventListener('click', function(e){
   let guess = parseInt(guessInput.value);

    // chack if won
    if(guess === winningNum){
        // game over WOn
        // setMessage(`${winningNum} is correct, You win!`, 'green')
        // guessInput.style.borderColor = 'green';
        // guessInput.disabled = true;
        gameOver(true, `${winningNum} is correct, You win!`);
        guessInput.value = '';
    }else{
        // wrong number
        guessesLeft -= 1; 
        if(guessesLeft === 0){ 
            // game over lost
         gameOver(false, `Game over! You lost, the correct answer is ${winningNum}!`)

        }else{
            // game continues answer wrong
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`)
        if(guessesLeft === 1){
            setMessage(`${guess} is not correct, ${guessesLeft} guess left`)
        }
        }
    }

    // validate input
    if(isNaN(guess) || guess < min|| guess > max){
        setMessage(`please enter a number between ${min} and ${max}`);
        guessesLeft = guessesLeft + 1;
    }
     e.preventDefault();
});

// set maessage function
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

// game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    guessInput.style.borderColor = color;
    message.style.color = color;
    guessInput.disabled = true;
    setMessage(msg)
    // guessInput.value = '';

    // play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'; 
}

// getWinningNum
function getRandomNum(min, max){
   return Math.floor(Math.random()*(max-min+1)+min);
}
