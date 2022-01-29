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
        setTimeout(() => {
            this.shuffleCards(this.cardsArray);
            this.counter = this.startCounter();
            this.busy = false;
        }, 500)
        this.hideCards();

        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }

    //Timer function\\

    startCounter() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0) {
                this.gameOver();// create game over function
            }
        }, 1000);
    }


    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visable');
        });
    }


    // card flip function\\
    flipCard(card) {
        if (this.canFlip(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visable');
            console.log('ah, you clicked me');

            if (this.cardToCheck) {
                this.checkCardMatch(card);
            } else {
                this.cardToCheck = card;
            }

        }
    }
    // Checking to see if the player can flip the card
    canFlip(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;

        // return true
    }

    //check if cards match\\

    checkCardMatch(card) {
        if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
        } else {
            this.cardMisMatch(card, this.cardToCheck);
        }
        this.cardToCheck = null;

    }

    getCardType(card) {
        return card.getElementsByClassName('front-face')[0].src;
    }


    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        if (this.matchedCards.length === this.cardsArray.length) {
            this.winning();
            //remove from board
        }
        // console.log(this.matchedCards)
        console.log('you got a match')
    }


    cardMisMatch(card1, card2) {
        this.busy = true
        setTimeout(() => {
            card1.classList.remove('visable');
            card2.classList.remove('visable');
            this.busy = false;
        }, 1000);
        console.log('this is not the card you are looking for')
    }




    // Game Over Function\\
    gameOver() {
        clearInterval(this.counter);
        document.getElementById('game-over-text').classList.add('visable');
    }

    // Winner Function\\
    winning() {
        clearInterval(this.counter);
        document.getElementById('win-over-text').classList.add('visable');
    }



    // Card Shuffle- Fisher-Yates shuffle\\
    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randInd = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randInd].style.order = i;
            this.cardsArray[i].style.order = randInd;
        }
    }



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
            // game.startGame();
        });
    });
    // cards.forEach(card => {
    //     card.addEventListener('click', () => {
    //         game.flipCard(card);
    //     });
    // });

    //button functions\\
    // get the colors of the back of the cards to change when a diff is selected
    let easyBtnEl = document.getElementById('easy');
    easyBtnEl.addEventListener('click', (evt) => {
        changeCardBacks('easy')
        let easyGame = new Game(100, cards);
        easyGame.startGame()

        cards.forEach(card => {
            card.addEventListener('click', () => {
                easyGame.flipCard(card);
            });
        });

        console.log('ive been clicked but im a easy butt')
    });

    let medBtnEl = document.getElementById('medium');
    medBtnEl.addEventListener('click', (evt) => {
        changeCardBacks('medium')
        let medGame = new Game(50, cards);
        medGame.startGame()

        cards.forEach(card => {
            card.addEventListener('click', () => {
                medGame.flipCard(card);
            });
        });

        console.log('ive been clicked but im a medium butt')
    });

    let hrdBtnEl = document.getElementById('hard');
    hrdBtnEl.addEventListener('click', (evt) => {
        changeCardBacks('hard')
        let hardGame = new Game(25, cards);
        hardGame.startGame()

        cards.forEach(card => {
            card.addEventListener('click', () => {
                hardGame.flipCard(card);
            });
        });

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