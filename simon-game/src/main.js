// Store variables
let counter = 0;
let simonArr = [];
let userArr = [];
let strict = false;

const sounds = {
  greenSound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  redSound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  yellowSound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  blueSound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

// Restart game function
// Clear history

// Start game function
// Set counter to 0
function startGame() {
  const start = $('#start-restart-button');
  const countDisplay = $('.game-counter');

  start.on('click', () => {
    start[0].innerHTML = 'Restart';
    counter = 0;
    countDisplay[0].innerHTML = counter;
    beginSound();
  });
}

// Show button presses w/ sound
// Create array to hold sequence of pattern
function beginSound() {
  const green = $('#green-button')[0];
  const red = $('#red-button')[0];
  const yellow = $('#yellow-button')[0];
  const blue = $('#blue-button')[0];

  let random = Math.floor(Math.random() * 4);
  simonArr.push(random);
  console.log(simonArr);
  if (random === 0) {
    $(green).addClass('green-button-hover');
    sounds.greenSound.play();
  } else if (random === 1) {
    $(red).addClass('red-button-hover');
    sounds.redSound.play();
  } else if (random === 2) {
    $(yellow).addClass('yellow-button-hover');
    sounds.yellowSound.play();
  } else {
    $(blue).addClass('blue-button-hover');
    sounds.blueSound.play();
  }

  setTimeout(removeHover, 500);
}

// Remove hover classes
function removeHover() {
  const colors = ['green', 'red', 'yellow', 'blue'];

  for (let i = 0; i < colors.length; i+= 1) {
    if ($(`#${colors[i]}-button`)[0].className === `color-button ${colors[i]}-button-hover`) {
      $($(`#${colors[i]}-button`)[0]).removeClass(`${colors[i]}-button-hover`);
      console.log('removed');
    }
  }
}

// Let user attempt to press the same buttons w/ sound
// Create array to hold user's button presses

// Check to see if user's input matches correct pattern
// If correct, continue game
// If incorrect, indicate that and show sequence again; allow player one more attempt

// If user counter reaches 20, game is over and player wins

// Strict mode
// Green = Active; Red = Inactive
// If user gets one wrong, game starts over
function strictMode() {
  $('#strict-button').on('click', () => {
    const indicator = $('#strict-indicator')[0];
    if (indicator.style.background === 'red' || indicator.style.background === '') {
      indicator.style.background = 'green';
      strict = true;
    } else {
      indicator.style.background = 'red';
      strict = false;
    }
  });
}

$(document).ready(() => {
  startGame();
  strictMode();
});
