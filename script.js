'use strict';

// Selecting Elements
const player0Active = document.querySelector('.player--0');
const player1Active = document.querySelector('.player--1');
const player0Score = document.querySelector('#score--0');
const player1Score = document.querySelector('#score--1');
const currentPlayer0Score = document.querySelector('#current--0');
const currentPlayer1Score = document.querySelector('#current--1');
const diceImage = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// General Reset
diceImage.classList.add('hidden');
player0Score.textContent = 0;
player1Score.textContent = 0;

// States Element
let activePlayer = 0;
let scores = [0, 0];
let currentScore = 0;
let playing = true;

function generateRandomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function playAudio(audioFile) {
  new Audio(audioFile).play();
}

function switchActivePlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0Active.classList.toggle('player--active');
  player1Active.classList.toggle('player--active');
}

function holdGame() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playAudio(`Success.mp3`);
      diceImage.classList.add('hidden');
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchActivePlayer();
    }
  }
}

function setRandomImage() {
  if (playing) {
    const random = generateRandomNumber();
    diceImage.src = `dice-${random}.png`;
    diceImage.classList.remove('hidden');

    if (random > 1) {
      currentScore += random;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
}

rollDiceBtn.addEventListener('click', setRandomImage);

holdBtn.addEventListener('click', holdGame);

newGameBtn.addEventListener('click', function () {
  scores = [0, 0];
  player0Score.textContent = scores[0];
  player1Score.textContent = scores[1];
  currentScore = 0;
  playing = true;
  activePlayer = 0;
  player0Active.classList.remove('player--winner');
  player1Active.classList.remove('player--winner');
  player0Active.classList.add('player--active');
  player1Active.classList.remove('player--active');
  currentPlayer0Score.textContent = currentPlayer0Score.textContent = 0;
});
