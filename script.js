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
let easyBtnEl = document.getElementById('easy');
easyBtnEl.addEventListener('click', (evt) => {
    // difficulty = 'easy';
    // cardBkFace = document.getElementById('card-easy');
    // diffMode();
    // setGame()
    console.log('ive been clicked but im a easy butt')
});

class Game {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('clicks');

    }
    startGame() {
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        this.shuffleCards();
        }
    flipCard(card) {
        if (this.canFlip(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visable');
            console.log('ah, you clicked me');

            //if statement to check for a match

        }
    }
// Card Shuffle- Fisher-Yates shuffle\\
    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randInd = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randInd].style.order = i;
            this.cardsArray[i].style.order = randInd;
        }
    }


    canFlip(card) {
        return true;
        // return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

}

// function play() {
//     let cards = Array.from(document.getElementsByClassName('card'));
//     let game = new Game(100, cards);
//     game.startGame();

//     cards.forEach(card => {
//         card.addEventListener('click', (evt) =>
//             game.flipCard(card))
//         console.log('flippin cards')
//     })
// }
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}


function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new Game(100, cards);

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

