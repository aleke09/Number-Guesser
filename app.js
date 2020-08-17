// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessLeft = 3;

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

    //   assign UI value for min and max

    minNum.textContent = min;
    maxNum.textContent = max;
    
    // play again event listener
    game.addEventListener('mousedown', function(e){
        if (e.target.className === 'play-again'){
            window.location.reload();
        }
    });

    // listen for guess btn
    guessBtn.addEventListener('click', function(){
        let guess = parseInt(guessInput.value);
        // check if won
        if(guess === winningNum){
            gameOver(true, `${winningNum} is correct YOU WIN`);
        }
        else{
            guessLeft -= 1;

            if(guessLeft === 0){
                // game over lost

                gameOver(false, `YOU LOST, The correct answer is ${winningNum}`);
            }
            else{
                // game continue answer wrong
                setMessage(`${guess} is incorrect, ${guessLeft} guesses left`, 'red');
                guessInput.style.borderColor = 'red';
                // clear input
                guessInput.value = '';
            }

        }
        if(isNaN(guess) || guess < min || guess > max){
            setMessage(`please enter a number between ${min} and ${max}`, 'red');
            guessLeft++
            // if guessLeft is zero
            if(guessLeft === 0){
                // game over lost
                gameOver(false, `YOU LOST, The correct answer is ${winningNum}`);
            }
        };


    });

    // game over
    function gameOver(won, msg){
        let color;
        won === true ? color = 'green' : color = 'red';
        // dissable input
        guessInput.disabled = true;
        guessInput.style.borderColor = color;
        message.style.color = color;
        setMessage(msg);

        // play again
            guessBtn.value = 'PLAY AGAIN';
            guessBtn.className += 'play-again';

    }

    // get random winning number
    function getRandomNum(min, max){
        return Math.floor(Math.random() * (max-min+1)+min);
    };
    
    // set message
    function setMessage(msg, color){
        message.textContent = msg;
        message.style.color = color;
    }
