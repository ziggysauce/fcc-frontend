// Javascript file for calculator app

// Store ids for +/- buttons
const plusMinus = ['work-minus-button', 'work-add-button', 'break-minus-button', 'break-add-button'];
let seconds = 59;
let currentTimer = '';
let timerState = true;
let pauseState = false;

function playAudio() {
  const audio = {};
  audio['.alarm'] = new Audio();
  audio['.alarm'].src = 'http://newt.phys.unsw.edu.au/music/bellplates/sounds/smallplate.mp3';
  audio['.alarm'].play();
}

function timeEnds() {
  // End animation
  $('.coffee').removeClass('start-drink');

  clearInterval(currentTimer);
  // alert('done');
  $('#minutes')[0].innerHTML = '00';
  playAudio();

  if (timerState) {
    timerState = false;
    changeBreak();
    $('#seconds')[0].innerHTML = '00';
    $('.active').attr('disabled', false);
    currentTimer = '';
  } else {
    timerState = true;
    changeWork();
    $('#seconds')[0].innerHTML = '00';
    $('.active').attr('disabled', false);
  }
}

function countdownTimer() {
  let minutes = Number($('#minutes')[0].innerHTML);
  seconds -= 1;

  if (seconds >= 10) {
    // console.log(seconds);
    $('#seconds')[0].innerHTML = seconds;
  } if (seconds < 10 && seconds >= 0) {
    $('#seconds')[0].innerHTML = `0${seconds}`;
    // console.log(seconds);
  } if (seconds < 0) {
    $('#seconds')[0].innerHTML = '59';
    // console.log(seconds);
    seconds = 59;
    minutes -= 1;
    if (minutes < 0) {
      timeEnds();
    } else if (minutes < 10) {
      $('#minutes')[0].innerHTML = `0${minutes}`;
    } else {
      $('#minutes')[0].innerHTML = minutes;
    }
  }
}

// Set timer based on work period input
function changeWork() {
  if ($('#work-period').val() > 0) {
    if ($('#work-period').val() < 10) {
      $('#minutes')[0].innerHTML = `0${$('#work-period').val()}`;
    } else {
      $('#minutes')[0].innerHTML = $('#work-period').val();
    }
  }
}

// Set timer based on break period input
function changeBreak() {
  if ($('#break-period').val() > 0) {
    if ($('#work-period').val() < 10) {
      $('#minutes')[0].innerHTML = `0${$('#break-period').val()}`;
    } else {
      $('#minutes')[0].innerHTML = $('#break-period').val();
    }
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
      return e;
    });
}

// Logic for starting timer
function startFunc() {
  // Add animation
  $('.coffee').addClass('start-drink');

  currentTimer = setInterval(countdownTimer, 1000);
  $('.active').attr('disabled', true);
  $('#pause').attr('disabled', false);
  // Work period is active
  if (timerState) {
    if ($('#work-period').val() < 10) {
      $('#minutes')[0].innerHTML = `0${$('#work-period').val() - 1}`;
    } else {
      $('#minutes')[0].innerHTML = $('#work-period').val() - 1;
    }
  } else if (!timerState) {
    if ($('#work-period').val() < 10) {
      $('#minutes')[0].innerHTML = `0${$('#break-period').val() - 1}`;
    } else {
      $('#minutes')[0].innerHTML = $('#break-period').val() - 1;
    }
  }
  $('#seconds')[0].innerHTML = '59';
}

// Logic for pausing timer
function pauseFunc() {
  if (!pauseState) {
    // End animation
    $('.coffee').removeClass('start-drink');

    // console.log('pause is clicked');
    pauseState = true;
    $('#pause')[0].innerHTML = 'Unpause';
    clearInterval(currentTimer);
  } else {
    // End animation
    $('.coffee').addClass('start-drink');

    // console.log('unpause is clicked');
    pauseState = false;
    $('#pause')[0].innerHTML = 'Pause';
    currentTimer = setInterval(countdownTimer, 1000);
  }
}

// Logic for reseting timer
function resetFunc() {
  // End animation
  $('.coffee').removeClass('start-drink');

  // console.log('reset clicked');
  $('.active').attr('disabled', false);
  pauseState = false;
  $('#pause').attr('disabled', true);
  clearInterval(currentTimer);
  seconds = 59;
  currentTimer = '';
  changeWork();
  $('#seconds')[0].innerHTML = '00';
  $('#pause')[0].innerHTML = 'Pause';
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
    });
  }
}

function beginEndButtons() {
  // Event handler for pressing 'start'
  (function startCountDown() {
    $('#start').on('click', () => {
      startFunc();
    })
  })();
  // Event handler for pressing 'pause'
  (function pauseCountDown() {
    $('#pause').on('click', () => {
      pauseFunc();
    })
  })();
  // Event handler for pressing 'reset'
  (function resetCountDown() {
    $('#reset').on('click', () => {
      resetFunc();
    })
  })();
}

$(document).ready(() => {
  updateSession();
  changeInput();
  beginEndButtons();
});
