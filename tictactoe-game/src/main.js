// Store variables
let firstPlayer = true;
let spaces = 0;
let arr = [
  0,0,0,
  0,0,0,
  0,0,0,
];
const winningArr = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Compare arr to winningArr
// If any winning lines sum to 3 then X wins
// If any winning lines sum to -3 then O wins
// If winning line doesn't equal 3 or -3 then it's a tie
function checkGame() {
  winningArr.map((i) => {
    if (arr[i[0]] + arr[i[1]] + arr[i[2]] === 3) {
      console.log('Player X wins');
    } else if (arr[i[0]] + arr[i[1]] + arr[i[2]] === -3) {
      console.log('Player O wins');
    } else if (spaces === 9) {
      console.log('tie');
    }
  })
}

// Show grey X or O on hover depeneding on who's turn it is
// Check to see if the hovered square has already been pressed or not
function hoverSquare() {
  for (let i = 0; i <= 8; i += 1) {
    $(`#button_${i}`).hover((e) => {
      if (firstPlayer && !$(e.target).hasClass('pressed')) {
        e.target.innerHTML = 'X';
      } else if (!firstPlayer && !$(e.target).hasClass('pressed')) {
        e.target.innerHTML = 'O';
      }
    })
  }
}

// Click event for each square
// Indicate which box has already been clicked
// Do not allow same box to be clicked twice
// Store user's turn
// Switch to next plyer's turn
// Update arr to check for winner
function clickSquare() {
  for (let i = 0; i <= 8; i += 1) {
    $(`#button_${i}`).on('click', (e) => {
      if (firstPlayer) {
        $(e.target).addClass('active-button-first pressed');
        $(e.target).attr('disabled', true);
        e.target.innerHTML = 'X';
        firstPlayer = false;
        arr[i] += 1;
        spaces++;
      } else {
        $(e.target).addClass('active-button-second pressed');
        $(e.target).attr('disabled', true);
        e.target.innerHTML = 'O';
        firstPlayer = true;
        arr[i] -= 1;
        spaces++;
      }
      checkGame();
    })
  }
}



$(document).ready(() => {
  hoverSquare();
  clickSquare();
});
