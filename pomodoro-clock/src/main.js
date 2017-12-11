// Javascript file for calculator app

// Store ids for +/- buttons
const plusMinus = ['work-minus-button', 'work-add-button', 'break-minus-button', 'break-add-button'];
let seconds = 12;
let currentTimer = '';

// Set timer based on work period input
function changeWork() {
  if ($('#work-period').val() > 0) {
    $('#minutes')[0].innerHTML = $('#work-period').val();
  }
}

// Set timer based on break period input
function changeBreak() {
  if ($('#break-period').val() > 0) {
    $('#minutes')[0].innerHTML = $('#break-period').val();
  }
}

// Update work and break period sessions when input is changed
function updateSession() {
  $('#work-period').on('change', () => { changeWork(); })
    .on('keypress', (e) => {
      if (e.keyCode === 13) {
        changeWork();
        return false;
      }
    });
  $('#break-period').on('change', () => { changeBreak(); })
  .on('keypress', (e) => {
    if (e.keyCode === 13) {
      changeBreak();
      return false;
    }
  });
}

// Update work and break period sessions when +/- buttons are pressed
function changeInput() {
  for (let i = 0; i < plusMinus.length; i += 1) {
    $(`#${plusMinus[i]}`).on('click', (e) => {
      let currentWork = Number($('#work-period').val());
      let currentBreak = Number($('#break-period').val());
      if (e.target.id === 'work-minus-button' && currentWork > 1) {
        currentWork -= 1;
        $('#work-period').val(currentWork);
        changeWork();
      } else if (e.target.id === 'work-add-button') {
        currentWork += 1;
        $('#work-period').val(currentWork);
        changeWork();
      } else if (e.target.id === 'break-minus-button' && currentBreak > 1) {
        currentBreak -= 1;
        $('#break-period').val(currentBreak);
        changeBreak();
      } else if (e.target.id === 'break-add-button') {
        currentBreak += 1;
        $('#break-period').val(currentBreak);
        changeBreak();
      }
    })
  }
}

function countdownTimer() {
  let minutes = Number($('#minutes')[0].innerHTML);
  seconds -= 1

  if (minutes < 10) {
    $('#minutes')[0].innerHTML = `0${minutes}`;
  } if (seconds >= 10) {
    console.log(seconds);
    $('#seconds')[0].innerHTML = seconds;
  } if (seconds < 10 && seconds >= 0) {
    $('#seconds')[0].innerHTML = `0${seconds}`;
    console.log(seconds);
  } if (seconds < 0) {
    console.log(seconds);
    seconds = 60;
    minutes -= 1;
    if (minutes < 0) {
      clearInterval(currentTimer);
      alert('done');
      $('#minutes')[0].innerHTML = '00';
    } else {
      if (minutes < 10) {
        $('#minutes')[0].innerHTML = `0${minutes}`;
      } else {
        $('#minutes')[0].innerHTML = minutes;
      }
    }
  }
}

function startCountDown() {
  $('#start').on('click', () => {
    currentTimer = setInterval(countdownTimer, 1000);
  })
}

function pauseCountDown() {

}

function resetCountDown() {

}

function beginEndButtons() {
  startCountDown();
}

$(document).ready(() => {
  updateSession();
  changeInput();
  beginEndButtons();
});
