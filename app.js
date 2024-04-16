'use strict'

const gameField = document.querySelector('.game-field');
const cells = document.querySelectorAll('td');
const rows = document.querySelectorAll('tr');
const buttonNew = document.querySelector('.button-new');
const buttonNull = document.querySelector('.button-null');
const gameOver = document.querySelector('.game-over');
const greenLight = document.querySelector('.player-one');
const yellowLight = document.querySelector('.draw');
const redLight = document.querySelector('.player-two');
const inputGreen = document.querySelector('.count-one');
const inputRed = document.querySelector('.count-two');
const char = ['crest', 'null'];
const pictureQuestion = 'url(img/icons8-question-mark-96.png)';
const pictureCrest = 'url(img/icons8-multiply-96.png)';
const pictureNull = 'url(img/icons8-zero-64.png)';
let counter = 0;
let field = [
  [NaN, NaN, NaN],
  [NaN, NaN, NaN],
  [NaN, NaN, NaN],
];

gameField.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cell') || e.target.classList.contains('modified')) {
    return false;
  } else {
    if (char[counter] === 'crest') {
      e.target.style.backgroundImage = pictureCrest;
    } else {
      e.target.style.backgroundImage = pictureNull;
    }
    e.target.classList.add('modified', char[counter]);
    e.target.dataset.status = char[counter];
    field[e.target.parentElement.rowIndex][e.target.cellIndex] = char[counter];
    evenOrOdd(counter);
    isGameOver();
    return true;
  }
})

buttonNew.addEventListener('click', () => {
  cells.forEach((cell) => {
    counter = 0;
    gameOver.hidden = true;
    cell.classList.remove('modified', 'crest', 'null');
    cell.dataset.status = 'empty';
    cell.style.backgroundImage = pictureQuestion;
    field = [[NaN, NaN, NaN], [NaN, NaN, NaN], [NaN, NaN, NaN]];
    greenLight.classList.remove('player-one-shadow');
    redLight.classList.remove('player-two-shadow');
    yellowLight.classList.remove('draw-shadow');
  })
})

buttonNull.addEventListener('click', () => {
  inputGreen.value = '0';
  inputRed.value = '0';
})

function evenOrOdd(num) {
  if (num % 2 === 0) {
    counter = 1;
  } else {
    counter = 0;
  }
}

function isGameOver() {
  for (let i = 0; i < field.length; i++) {
    const firstCheck = field[i].every(el => el === 'crest');
    const secondCheck = field[i].every(el => el === 'null');

    if (firstCheck || secondCheck) {
      if (firstCheck) {
        greenLight.classList.add('player-one-shadow');
        +inputGreen.value ++;

      } else {
        redLight.classList.add('player-two-shadow');
        +inputRed.value ++;
      }
      overTheGame();
      return;
    };

    const checkArr = [];
    checkArr.push(field[0][i]);
    checkArr.push(field[1][i]);
    checkArr.push(field[2][i]);

    const thirdCheck = checkArr.every(el => el === 'crest');
    const fourthCheck = checkArr.every(el => el === 'null');

    if (thirdCheck || fourthCheck) {
      if (thirdCheck) {
        greenLight.classList.add('player-one-shadow');
        +inputGreen.value ++;
      } else {
        redLight.classList.add('player-two-shadow');
        +inputRed.value ++;
      }
      overTheGame();
      return;
    }
  }

  const checkArrOne = [];
  checkArrOne.push(field[0][0]);
  checkArrOne.push(field[1][1]);
  checkArrOne.push(field[2][2]);
  
  const fifthCheck = checkArrOne.every(el => el === 'crest');
  const sixthCheck = checkArrOne.every(el => el === 'null');

  if (fifthCheck || sixthCheck) {
    if (fifthCheck) {
      greenLight.classList.add('player-one-shadow');
      +inputGreen.value ++;
    } else {
      redLight.classList.add('player-two-shadow');
      +inputRed.value ++;
    }
    overTheGame();
    return;
  }

  const checkArrTwo = [];
  checkArrTwo.push(field[0][2]);
  checkArrTwo.push(field[1][1]);
  checkArrTwo.push(field[2][0]);
  
  const seventhCheck = checkArrTwo.every(el => el === 'crest');
  const eightCheck = checkArrTwo.every(el => el === 'null');

  if (seventhCheck || eightCheck) {
    if (seventhCheck) {
      greenLight.classList.add('player-one-shadow');
      +inputGreen.value ++;
    } else {
      redLight.classList.add('player-two-shadow');
      +inputRed.value ++;
    }
    overTheGame();
    return;
  }

  const possibleDraw = [...cells].every(el => el.classList.contains('modified'));

  if (possibleDraw) {
    yellowLight.classList.add('draw-shadow');
    overTheGame()
  }
}

function overTheGame() {
  cells.forEach(cell => cell.classList.add('modified'));
  gameOver.hidden = false;
}