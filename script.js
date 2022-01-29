/*
// ////////OUTLINE// /////////
PLAYER STARTS GAME-START GAME BUTTON
COMP 'SHUFFLES' CARDS ONTO PLAYING DECK-MATH.RANDOM
PLAYER IS ABLE TO CLICK CARD TO 'FLIP' OVER-LISTENER EVENT
IF CARD IS A MATCH THEN BOTH CARDS DISAPPEAR FROM PLAYING DECK-IF STATEMENST AND FUNCTIONS
IF CARDS AREN'T A MATCH THEN CARDS RETURN TO STARTING POSITIONS(FLIP BACK OVER)- IF STATEMENTS AND FUNCTIONS
*HARD LEVEL- ADD TIMER AND PLAYER ONLY HAS 1-2 MIN TO CLEAR THE PLAYING DECK-IF STATEMENTS AND FUNCTIONS
*/

// checking that the JS is working


class Game {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('clicks');


    }
    //start game function\\
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        this.shuffleCards();
        this.counter = this.counter();
    }

    // card flip function\\
    flipCard(card) {
        if (this.canFlip(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visable');
            console.log('ah, you clicked me');

            //if statement to check for a match

        }
    }

    //Timer function\\

    // counter() {
    //     return setInterval(() => {
    //         this.timeRemaining--;
    //         this.timer.innerText = this.timeRemaining;
    //         if (this.timeRemaining === 0) {
    //             this.gameOver();// create game over function
    //         }
    //     })
    // }

    //game over\\
    gameOver() {
        clearInterval()
    }
    //check if cards match\\




    // Card Shuffle- Fisher-Yates shuffle\\
    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randInd = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randInd].style.order = i;
            this.cardsArray[i].style.order = randInd;
        }
    }

    // Checking to see if the player can flip the card
    canFlip(card) {
        return true;
        // return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

}
//button functions\\
// get the colors of the back of the cards to change when a diff is selected
let easyBtnEl = document.getElementById('easy');
easyBtnEl.addEventListener('click', (evt) => {
    changeCardBacks('easy')

    console.log('ive been clicked but im a easy butt')
});

let medBtnEl = document.getElementById('medium');
medBtnEl.addEventListener('click', (evt) => {
    changeCardBacks('medium')
    console.log('ive been clicked but im a medium butt')
});

let hrdBtnEl = document.getElementById('hard');
hrdBtnEl.addEventListener('click', (evt) => {
    changeCardBacks('hard')
    console.log('ive been clicked but im a hard butt')
});

// Setting the card back base on difficulty\\
function changeCardBacks(difficulty) {
    let backFace
    if (difficulty === 'easy') {
        backFace = '/char_imgs/water_tribe.png'
    } else if (difficulty === 'medium') {
        backFace = '/char_imgs/earth_king.jpg'
    } else if (difficulty === 'hard') {
        backFace = '/char_imgs/fire_nation.png'
    } else {
        backFace = '/char_imgs/air_nomad.png'
    }
    let cardBacks = Array.from(document.getElementsByClassName('back-face'));
    cardBacks.forEach(back => {
        back.setAttribute('src', backFace)
    })
}

// Setting up the board\\
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Game(100, cards);
    changeCardBacks('')

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove("visable");
            game.startGame();
        });
    });
    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}

ready();



//THINGS TO DO\\
/*
Finish the buttons- add event listeners  that will change the timer and the card back colors
Create the timer
create the matching function -sepererate functio for if not a match?
call for the game over and winning overlays
fix modal and add it to the ready function
 */