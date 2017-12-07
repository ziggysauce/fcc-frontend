// javascript file for calculator app

// store variables
const numButtons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const opsButtons = ['add', 'subtract', 'multiply', 'divide', 'percent', 'pos-neg', 'decimal'];
let currentEquation = [];

// User clicks on a number
// Number is shown in top and bottom window
function clickNum(e) {
  $('#bigInput')[0].innerHTML = e.target.innerHTML;
  $('#smallInput')[0].innerHTML += e.target.innerHTML;
  currentEquation.push(e.target.innerHTML);
}


// User clicks on an operation
// Operation is shown in top window
function clickOps(e) {
  if (e.target.innerHTML === 'x') {
    $('#smallInput')[0].innerHTML += ' * ';
    currentEquation.push('*');
  } else {
    $('#smallInput')[0].innerHTML += ` ${e.target.innerHTML} `;
    currentEquation.push(e.target.innerHTML);
  }
}


// User clicks 'equal' button
// Expression is calculated
function clickEqual(e) {
  console.log(e.target);
}


// User clicks 'clear' button
// Calculator window is emptied
function clickClear(e) {
  $('#bigInput')[0].innerHTML = '0';
  $('#smallInput')[0].innerHTML = '';
}


// Click events for all buttons
function setupClicks() {
  // Click event for numbers
  for (let i = 0; i < numButtons.length; i += 1) {
    $(`#${numButtons[i]}-button`).on('click', (e) => {
      clickNum(e);
    })
  }

  // Click event for operator
  for (let i = 0; i < opsButtons.length; i += 1) {
    $(`#${opsButtons[i]}-button`).on('click', (e) => {
      clickOps(e);
    })
  }

  // Click event for 'equal'
  $('#equal-button').on('click', (e) => {
    clickEqual(e);
  })

  // Click event for 'clear'
  $('#clear-button').on('click', (e) => {
    clickClear(e);
  })
}




$(document).ready(() => {
  setupClicks();
});
