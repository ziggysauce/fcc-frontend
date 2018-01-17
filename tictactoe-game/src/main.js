// Store variables
let human = '';
let comp = '';
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

function restartGame() {
  $('#end-game-button').on('click', (e) => {
    location.reload();
  });
}

// Compare arr to winningArr
// If any winning lines sum to 3 then player 1 wins
// If any winning lines sum to -3 then player 2 (computer) wins
// If winning line doesn't equal 3 or -3 then it's a tie
function checkGame() {
  winningArr.map((i) => {
    if (arr[i[0]] + arr[i[1]] + arr[i[2]] === 3) {
      $('.end-game-title')[0].innerHTML = 'You won!';
      $('.end-game-container').css('display', 'flex').hide().fadeIn(500);
    } else if (arr[i[0]] + arr[i[1]] + arr[i[2]] === -3) {
      $('.end-game-title')[0].innerHTML = 'You lose!';
      $('.end-game-container').css('display', 'flex').hide().fadeIn(500);
    } else if (spaces === 9) {
      $('.end-game-title')[0].innerHTML = 'It\'s a tie!';
      $('.end-game-container').css('display', 'flex').hide().fadeIn(500);
    }
  });
}

// Show grey X or O on hover depeneding on who's turn it is
// Check to see if the hovered square has already been pressed or not
function hoverSquare() {
  for (let i = 0; i <= 8; i += 1) {
    $(`#button_${i}`).hover((e) => {
      if (firstPlayer && !$(e.target).hasClass('pressed')) {
        e.target.innerHTML = human;
      } else if (!firstPlayer && !$(e.target).hasClass('pressed')) {
        e.target.innerHTML = comp;
      }
    });
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
        e.target.innerHTML = human;
        firstPlayer = false;
        arr[i] += 1;
        spaces++;
      } else {
        $(e.target).addClass('active-button-second pressed');
        $(e.target).attr('disabled', true);
        e.target.innerHTML = comp;
        firstPlayer = true;
        arr[i] -= 1;
        spaces++;
      }
      checkGame();
    });
  }
}

// User selects either X or O as their marker
// Box disappears after selection
function selectIcon() {
  $('#select-x-user').on('click', (e) => {
    human = 'X';
    comp = 'O';
    $('#start-game').fadeOut(500);
  });
  $('#select-o-user').on('click', (e) => {
    human = 'O';
    comp = 'X';
    $('#start-game').fadeOut(500);
  });
}


$(document).ready(() => {
  restartGame();
  $('#end-game').hide();
  hoverSquare();
  clickSquare();
  selectIcon();
});
