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
    }
    //start game function\\
    startGame() {
        this.cardToCheck = null;
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards(this.cardsArray);
            this.counter = this.startCounter();
            this.busy = false;
        }, 500)

        this.timer.innerText = this.timeRemaining;
    }

    //Timer function\\

    startCounter() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0) {
                this.gameOver();
            }
        }, 1000);
    }
    // Card Shuffle- Fisher-Yates shuffle\\
    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randInd = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randInd].style.order = i;
            this.cardsArray[i].style.order = randInd;
        }
    }




    // card flip function\\
    flipCard(card) {
        if (this.canFlip(card)) {
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
    removeCards() {
        this.matchedCards.forEach(card => {
            card.classList.add('matched');
        });
    }
    //check if cards match\\

    checkCardMatch(card) {
        if (this.getCardFront(card) === this.getCardFront(this.cardToCheck)) {
            this.cardMatch(card, this.cardToCheck);
            setTimeout(() => {
                this.removeCards()
            }, 900)

        } else {
            this.cardMisMatch(card, this.cardToCheck);
        }

        this.cardToCheck = null;

    }

    getCardFront(card) {
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
        }, 800);
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




}

// Setting up the board\\
function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    changeCardBacks('')

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (evt) => {
            evt.target.classList.remove("visable");
            if (evt.target.classList.contains('play-again')) {
                window.location.reload()
            }

            dispModal();

        });
    });

    function dispModal() {
        const modal = document.getElementById('wel-modal');
        const openEl = document.querySelector('body > .open');
        const modalBtn = document.querySelector('.modal_button');
        modal.style.display = ('block');


        modalBtn.addEventListener('click', (evt) => {
            modal.style.display = 'none';
            console.log('remove me') // will eventually use this button to start the game

            openEl.addEventListener('click', (evt) => {
                modal.classList.add('show');

                console.log('try me')
            })


        })
    }


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
        let hardGame = new Game(35, cards);
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
            backFace = 'char_imgs/water_tribe.png'
            document.getElementById('medium').disabled = true;
            document.getElementById('hard').disabled = true;
        } else if (difficulty === 'medium') {
            backFace = 'char_imgs/earth_king.jpg'
            document.getElementById('easy').disabled = true;
            document.getElementById('hard').disabled = true;
        } else if (difficulty === 'hard') {
            backFace = 'char_imgs/fire_nation.png'
            document.getElementById('medium').disabled = true;
            document.getElementById('easy').disabled = true;
        } else {
            backFace = 'char_imgs/air_nomad.png'
        }
        let cardBacks = Array.from(document.getElementsByClassName('back-face'));
        cardBacks.forEach(back => {
            back.setAttribute('src', backFace)
        })
    }

}
ready();


/** RESOURCES
 * MDN
 * W3SCHOOLS
 * https://www.youtube.com/watch?v=28VfzEiJgy4
 * https://www.youtube.com/watch?v=3uuQ3g92oPQ
 */

//THINGS TO DO\\
/*
done-Finish the buttons- add event listeners  that will change the timer and the card back colors
done-Create the timer
done-create the matching function -sepererate function for if not a match?
done-call for the game over and winning overlays
done-fix modal and add it to the ready function
 */

//WISH LIST FOR LATER\\
/* HAVE aPPA FLY ACROSS THE BOARD WHEN A NEW GAME STARTS
ADD SOUND TO THE GAME
POSSIBLY HAVE HARD MODE RESHUFFLE AFTER EVERY MATCH */