// Store variables
let firstPlayer = true;

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
function clickSquare() {
  for (let i = 0; i <= 8; i += 1) {
    $(`#button_${i}`).on('click', (e) => {
      if (firstPlayer) {
        $(e.target).addClass('active-button-first pressed');
        $(e.target).attr('disabled', false);
        e.target.innerHTML = 'X';
        firstPlayer = false;
      } else {
        $(e.target).addClass('active-button-second pressed');
        $(e.target).attr('disabled', false);
        e.target.innerHTML = 'O';
        firstPlayer = true;
      }
    })
  }
}



$(document).ready(() => {
  hoverSquare();
  clickSquare();
});
