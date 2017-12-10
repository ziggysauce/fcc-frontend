// Javascript file for calculator app

const plusMinus = ['work-minus-button', 'work-add-button', 'break-minus-button', 'break-add-button'];

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
  let currentWork = Number($('#work-period').val());
  let currentBreak = Number($('#break-period').val());

  for (let i = 0; i < plusMinus.length; i += 1) {
    $(`#${plusMinus[i]}`).on('click', (e) => {
      if (e.target.id === 'work-minus-button') {
        currentWork -= 1;
        $('#work-period').val(currentWork);
        changeWork();
        // Do not allow value to go below 1

      } else if (e.target.id === 'work-add-button') {
        currentWork += 1;
        $('#work-period').val(currentWork);
        changeWork();
      } else if (e.target.id === 'break-minus-button') {
        currentBreak -= 1;
        $('#break-period').val(currentBreak);
        changeBreak();
        // Do not allow value to go below 1
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
