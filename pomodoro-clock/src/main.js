// Javascript file for calculator app

const plusMinus = ['work-minus-button', 'work-add-button', 'break-minus-button', 'break-add-button'];

let currentWork = '';
let currentBreak = '';

function changeWork() {
  $('#minutes')[0].innerHTML = $('#work-period').val();
}

function changeBreak() {
  $('#minutes')[0].innerHTML = $('#break-period').val();
}

function updateSession() {
  $('#work-period').on('change', () => { changeWork(); })
  $('#break-period').on('change', () => { changeBreak(); })
}

function changeInput() {
  for (let i = 0; i < plusMinus.length; i += 1) {
    $(`#${plusMinus[i]}`).on('click', (e) => {
      if (e.target.id === 'work-minus-button') {
        // do something
      } else if (e.target.id === 'work-add-button') {
        // do something
      } else if (e.target.id === 'break-minus-button') {
        // do something
      } else if (e.target.id === 'work-add-button') {
        // do something
      }
    })
  }
}

$(document).ready(() => {
  updateSession();
  changeInput();
});
