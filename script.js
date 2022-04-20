"use-strict";

//selecting element
const dice = document.querySelector(".dice");
const countDown = document.querySelector(".footer span");
const buttons = document.querySelectorAll(".content_btn button");
const showSelected = document.querySelector(".header_selected span");
const message = document.querySelector(".footer h2");
const playBtn = document.querySelector(".play_btn");

const scoreBoard = document.querySelector(".score span");
const highScoreBoard = document.querySelector(".high_score span");

//declaring variables
let score;
let count;
let diceNumber;
let startGame;
let selectedNumber;
let gameInterval;
let disabled;

let highScore = 0;

//Buttons disabled enabled handler
const disableEnableButtonHandler = function () {
  for (const btn of buttons) {
    if (disabled === true) {
      btn.setAttribute("disabled", "");
    } else {
      btn.removeAttribute("disabled");
    }
  }
};

// Reset active button handler
const resetActiveBtnHandler = function () {
  for (const btn of buttons) {
    if (btn.style.backgroundColor === "red")
      btn.style.backgroundColor = "black";
    btn.style.borderLeft = "4px solid red";
  }
};

// Reset game Handler
const resetGame = () => {
  score = 0;
  count = 5;
  diceNumber = 1;
  startGame = false;
  selectedNumber = 0;
  countDown.textContent = count;
  scoreBoard.textContent = score;
  highScoreBoard.textContent = highScore;
  dice.src = `./Images/dice-1.png`;
  message.textContent = "Select a number";
  showSelected.textContent = "";
  disabled = false;

  disableEnableButtonHandler();
  resetActiveBtnHandler();
};
resetGame();

// Start game Handler
const playGameHandler = function () {
  resetGame();
  if (this.textContent === "Play") {
    startGame = true;
    callDiceChangeHandler();
    this.textContent = "Quit";
  } else {
    clearInterval(gameInterval);
    this.textContent = "Play";
    startGame = false;
  }
};
playBtn.addEventListener("click", playGameHandler);

//High score Handler
const highScoreHandler = function () {
  if (score > highScore) {
    highScore = score;
    highScoreBoard.textContent = highScore;
  }
};

// Response Handler
const messageHandler = function () {
  if (selectedNumber === 0) {
    message.textContent =
      "You haven't selected any number. Please select any number😃";
    showSelected.textContent = "";
  } else if (selectedNumber === diceNumber) {
    score += 10;
    message.textContent = "You guessed right🎉🎉";
  } else {
    message.textContent = "You guessed wrong☹️";
  }
  scoreBoard.textContent = score;
  selectedNumber = 0;
};

// Dice change Handler
const diceChangeHandler = function () {
  diceNumber = Math.trunc(Math.random() * 6) + 1;
  dice.src = `./Images/dice-${diceNumber}.png`;
};

const callDiceChangeHandler = function () {
  gameInterval = setInterval(() => {
    if (count === 0) {
      diceChangeHandler();
      messageHandler();
      setTimeout(() => {
        AlertCall();
      }, 2000);

      count = 5;
      disabled = false;
      disableEnableButtonHandler();
      resetActiveBtnHandler();
      startGame = false;
      highScoreHandler();
      clearInterval(gameInterval);
    } else {
      --count;
    }
    countDown.textContent = count;
  }, 1000);
};

//Button click handler
const onButtonClickHandler = function () {
  if (startGame === true) {
    this.style.backgroundColor = "red";
    this.style.borderLeft = "4px solid white";
    showSelected.textContent = this.textContent;
    selectedNumber = Number(this.textContent);
    disabled = true;
    disableEnableButtonHandler();
  }
};
for (let btn of buttons) {
  btn.addEventListener("click", onButtonClickHandler);
}

function AlertCall() {
  window.alert(`Roll the Dice`);
  startGame = true;
  disabled = false;
  disableEnableButtonHandler();
  callDiceChangeHandler();
  showSelected.textContent = "";
  message.textContent = "Select a number";
}
