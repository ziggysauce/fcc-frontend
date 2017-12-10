// Javascript file for calculator app

// Store ids for +/- buttons
const plusMinus = ['work-minus-button', 'work-add-button', 'break-minus-button', 'break-add-button'];

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

$(document).ready(() => {
  updateSession();
  changeInput();
});
