/*
// ////////OUTLINE// /////////
PLAYER STARTS GAME-START GAME BUTTON
COMP 'SHUFFLES' CARDS ONTO PLAYING DECK-MATH.RANDOM
PLAYER IS ABLE TO CLICK CARD TO 'FLIP' OVER-LISTENER EVENT
IF CARD IS A MATCH THEN BOTH CARDS DISAPPEAR FROM PLAYING DECK-IF STATEMENST AND FUNCTIONS
IF CARDS AREN'T A MATCH THEN CARDS RETURN TO STARTING POSITIONS(FLIP BACK OVER)- IF STATEMENTS AND FUNCTIONS
*HARD LEVEL- ADD TIMER AND PLAYER ONLY HAS 1-2 MIN TO CLEAR THE PLAYING DECK-IF STATEMENTS AND FUNCTIONS
*/

// WELCOME MODAL//
// const modal = document.querySelector('#wel-modal');
// const openEl = document.querySelector('body > .open');
// const modalBtn = document.querySelector('#wel-modal > .modal_button');

// openEl.addEventListener('click', (evt) => {
//     modal.classList.add('show');
//     const text = document.createElement('p');
//     text.textContent = 'p';
//     modal.appendChild(text);
// })

// modalBtn.addEventListener('click', (evt) => {
//     modal.classList.remove('show') // will eventually use this button to start the game
// })


//CARD ARRAYS\\
const gameBoard = document.getElementById('game-board');
let cardArr = []
const cardEasy = ['char_imgs/aang', 'char_imgs/aang', 'char_imgs/katara', 'char_imgs/katara', 'char_imgs/sokka', 'char_imgs/sokka', 'char_imgs/toph', 'char_imgs/toph', 'char_imgs/momo', 'char_imgs/momo']
const cardMed = ['char_imgs/aang', 'char_imgs/aang', 'char_imgs/katara', 'char_imgs/katara', 'char_imgs/sokka', 'char_imgs/sokka', 'char_imgs/toph', 'char_imgs/toph', 'char_imgs/momo', 'char_imgs/momo', 'char_imgs/bumi', 'char_imgs/bumi', 'char_imgs/suki', 'char_imgs/suki', 'char_imgs/zuko','char_imgs/zuko'];
const cardHard = ['char_imgs/aang', 'char_imgs/aang', 'char_imgs/katara', 'char_imgs/katara', 'char_imgs/sokka', 'char_imgs/sokka', 'char_imgs/toph', 'char_imgs/toph', 'char_imgs/momo', 'char_imgs/momo', 'char_imgs/bumi', 'char_imgs/bumi', 'char_imgs/suki', 'char_imgs/suki', 'char_imgs/zuko', 'char_imgs/zuko', 'char_imgs/iroh', 'char_imgs/iroh', 'char_imgs/azula','char_imgs/azula'];

let clickedArr = [];
let itemArr = [];
let itemClass = [];
let cardMatches = 0;
let matchesNeeded;

//RANDOMIZING THE CARD DISPLAY//

function shuffleArr(array) {
    for (let i = 0; i < array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j] = array[j], array[i]];
    }
}


//SET UP GAME\\

