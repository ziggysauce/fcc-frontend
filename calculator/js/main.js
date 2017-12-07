// Javascript file for calculator app

// Store variables
const numButtons = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const opsButtons = ['add', 'subtract', 'multiply', 'divide'];
let cleared = false;
let currentNums = [];
let currentOp = '';
let currentTotal = '';

// Constantly update current total
function updateTotal() {
  if (currentNums.length === 2) {
    if (currentOp === '+') {
      currentTotal = parseFloat(currentNums[0]) + parseFloat(currentNums[1]);
    } else if (currentOp === '-') {
      currentTotal = parseFloat(currentNums[0]) - parseFloat(currentNums[1]);
    } else if (currentOp === '*') {
      currentTotal = parseFloat(currentNums[0]) * parseFloat(currentNums[1]);
    } else if (currentOp === '/') {
      currentTotal = parseFloat(currentNums[0]) / parseFloat(currentNums[1]);
    }
    currentNums[0] = currentTotal;
    currentNums.pop();
    console.log(currentNums);
  }
}

// User clicks on a number
// Number is shown in bottom window
function clickNum(e) {
  // Replace input if it's zero
  if ($('#bigInput')[0].innerHTML === '0' || cleared) {
    $('#bigInput')[0].innerHTML = e.target.innerHTML;
    cleared = false;
  } else {
    // Get a number longer than 1 digit
    $('#bigInput')[0].innerHTML += e.target.innerHTML;
  }
}

// User clicks on an operation
// Operation is shown in top window
function clickOps(e) {
  // Store previous number entered
  currentNums.push($('#bigInput')[0].innerHTML);
  updateTotal();

  // Save value from previous expression in top window
  if (!cleared) {
    // Expression shown in top window
    $('#smallInput')[0].innerHTML += $('#bigInput')[0].innerHTML;
  }

  // Add operation to top window
  if (e.target.innerHTML === 'x') {
    $('#bigInput')[0].innerHTML = '';
    $('#smallInput')[0].innerHTML += ' * ';
    currentOp = '*';
  } else {
    $('#bigInput')[0].innerHTML = '';
    $('#smallInput')[0].innerHTML += ` ${e.target.innerHTML} `;
    currentOp = e.target.innerHTML;
  }
}

// User clicks on the pos-neg button
// Current value is converted from positive to negative or vice versa
function clickPosNeg() {
  $('#bigInput')[0].innerHTML = (parseFloat($('#bigInput')[0].innerHTML) * -1);
}

// User clicks on the 'percent' button
// Current value is converted to 1/100th of the current value
function clickPercent() {
  $('#bigInput')[0].innerHTML = (parseFloat($('#bigInput')[0].innerHTML)/100);
}

// User clicks 'equal' button
// Expression is calculated
function clickEqual(e) {
  // Store previous number enetered
  currentNums.push($('#bigInput')[0].innerHTML);
  updateTotal();
  // Display calculated total
  $('#bigInput')[0].innerHTML = currentTotal;
  $('#smallInput')[0].innerHTML = currentTotal;
  // Clear stored numbers
  currentNums = [];
  cleared = true;
}

// User clicks 'clear' button
// Calculator window is emptied
function clickClear(e) {
  $('#bigInput')[0].innerHTML = '0';
  $('#smallInput')[0].innerHTML = '';
  currentNums = [];
  currentOp = '';
  currentTotal = '';
}

// Click events for all buttons
function setupClicks() {
  // Click event for numbers
  for (let i = 0; i < numButtons.length; i += 1) {
    $(`#${numButtons[i]}-button`).on('click', (e) => { clickNum(e); })
  }
  // Click event for operator
  for (let i = 0; i < opsButtons.length; i += 1) {
    $(`#${opsButtons[i]}-button`).on('click', (e) => { clickOps(e); })
  }
  // Click event for 'pos-neg'
  $('#pos-neg-button').on('click', (e) => { clickPosNeg(e); })
  // Click event for 'percent'
  $('#percent-button').on('click', (e) => { clickPercent(e); })
  // Click event for 'equal'
  $('#equal-button').on('click', (e) => { clickEqual(e); })
  // Click event for 'clear'
  $('#clear-button').on('click', (e) => { clickClear(e); })
}

$(document).ready(() => {
  setupClicks();
});
