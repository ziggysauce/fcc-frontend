// Store variables
let counter = 0;
let simonArr = [];
let userArr = [];
let strict = false;
let userClick = false;

const sounds = {
  greenSound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  redSound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  yellowSound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  blueSound: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

const countDisplay = $('.game-counter');
const colors = ['green', 'red', 'yellow', 'blue'];
const green = $('#green-button');
const red = $('#red-button');
const yellow = $('#yellow-button');
const blue = $('#blue-button');



// Restart game function
// Clear history

// Start game function
// Set counter to 0
// Clear arrays
function startGame() {
  const start = $('#start-restart-button');

  start.on('click', () => {
    start[0].innerHTML = 'Restart';
    counter = 0;
    countDisplay[0].innerHTML = counter;
    simonArr = [];
    userArr = [];
    console.log('i SHOULD erase arrs');
    $(green[0]).attr('disabled', true);
    $(red[0]).attr('disabled', true);
    $(yellow[0]).attr('disabled', true);
    $(blue[0]).attr('disabled', true);
    setTimeout(beginSound, 1000);
  });
}

// Add hover classes
function addHover(choice) {
  if (choice === 0) {
    $(green[0]).addClass('green-button-hover');
    sounds.greenSound.play();
  } else if (choice === 1) {
    $(red[0]).addClass('red-button-hover');
    sounds.redSound.play();
  } else if (choice === 2) {
    $(yellow[0]).addClass('yellow-button-hover');
    sounds.yellowSound.play();
  } else {
    $(blue[0]).addClass('blue-button-hover');
    sounds.blueSound.play();
  }

  setTimeout(removeHover, 500);
}

// Remove hover classes
function removeHover() {
  for (let i = 0; i < colors.length; i += 1) {
    if ($(`#${colors[i]}-button`)[0].className === `color-button ${colors[i]}-button-hover`) {
      $($(`#${colors[i]}-button`)[0]).removeClass(`${colors[i]}-button-hover`);
      countDisplay[0].innerHTML = counter;
      if (userClick) {
        console.log('its user turn');
        $(green[0]).attr('disabled', false);
        $(red[0]).attr('disabled', false);
        $(yellow[0]).attr('disabled', false);
        $(blue[0]).attr('disabled', false);
        userTurn();
      } else if (!userClick) {
        // checkUser();
        $(green[0]).attr('disabled', true);
        $(red[0]).attr('disabled', true);
        $(yellow[0]).attr('disabled', true);
        $(blue[0]).attr('disabled', true);
        console.log('its simons turn');
        setTimeout(beginSound, 1000);
      }
    }
  }
}

// Show button presses w/ sound
// Create array to hold sequence of pattern
function beginSound() {
  let simonChoice = Math.floor(Math.random() * 4);
  simonArr.push(simonChoice);
  counter += 1;
  userClick = true;
  addHover(simonChoice);
}

// Check to see if user's input matches correct pattern
// If correct, continue game
// If incorrect, indicate that and show sequence again; allow player one more attempt
function checkUser() {
  // console.log('comp arr: ', simonArr);
  // console.log('user arr: ', userArr);
  console.log('checkuser func reached');
  removeHover();
}

// Let user attempt to press the same buttons w/ sound
// Create array to hold user's button presses
function userTurn() {
  userClick = false;

}



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

//Button event handlers
green.on('click', (e) => {
  userArr.push(0);
  console.log('simon: ', simonArr);
  console.log('user: ', userArr);
  addHover(0);
});

red.on('click', (e) => {
  userArr.push(1);
  console.log('simon: ', simonArr);
  console.log('user: ', userArr);
  addHover(1);
});

yellow.on('click', (e) => {
  userArr.push(2);
  console.log('simon: ', simonArr);
  console.log('user: ', userArr);
  addHover(2);
});

blue.on('click', (e) => {
  userArr.push(3);
  console.log('simon: ', simonArr);
  console.log('user: ', userArr);
  addHover(3);
});

$(document).ready(() => {
  startGame();
  strictMode();
  $(green[0]).attr('disabled', true);
  $(red[0]).attr('disabled', true);
  $(yellow[0]).attr('disabled', true);
  $(blue[0]).attr('disabled', true);
});
