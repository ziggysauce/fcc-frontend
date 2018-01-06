let firstPlayer = true;

// Click event for each square
function clickSquare() {
  for (let i = 0; i < 8; i += 1) {
    $(`#button_${i}`).on('click', (e) => {
      if (firstPlayer) {
        $(e.target).addClass('active-button-o');
        firstPlayer = false;
      } else {
        $(e.target).addClass('active-button-x');
        firstPlayer = true;
      }
    })
  }
}



$(document).ready(() => {
  clickSquare();
});
