'use strict';

// Selecting Elements
const player1Active = document.querySelector('.player--0');
const player2Active = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const player0CurrentScore = document.querySelector('#current--0');
const player1CurrentScore = document.querySelector('#current--1');
const diceImage = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');

score0Element.textContent = 0;
score1Element.textContent = 0;
diceImage.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Active.classList.toggle('player--active');
  player2Active.classList.toggle('player--active');
}
function randomNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1Active.classList.toggle('player--active');
  player2Active.classList.toggle('player--active');
}
function setRandomImage() {
  if (playing) {
    let random = randomNumber();
    diceImage.src = `dice-${random}.png`;
    diceImage.classList.remove('hidden');
    let currentActivePlayer = document.getElementById(
      `current--${activePlayer}`
    );
    if (random > 1) {
      currentScore += random;
      currentActivePlayer.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}

rollDiceBtn.addEventListener('click', setRandomImage);
holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      diceImage.classList.add(`hidden`);

      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

function resetGame() {
  diceImage.classList.add('hidden');
  activePlayer = 0;
  scores = [0, 0];
  score0Element.textContent = scores[0];
  score1Element.textContent = scores[1];
  player2Active.classList.remove('player--active');
  player1Active.classList.add('player--active');
  player1Active.classList.remove('player--winner');
  player2Active.classList.remove('player--winner');
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
}

newGameBtn.addEventListener('click', resetGame);
