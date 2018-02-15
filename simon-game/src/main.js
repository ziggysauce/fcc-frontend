const game = {
  count: 0,
  colors: ['.green-button','.red-button', '.yellow-button', '.blue-button'],
  currentGame: [],
  player: [],
  sound: [
    'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 
    'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 
    'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 
    'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
  ],
  strict: false,
}

const countDisplay = $('.game-counter');

// Clear history
// Start new game
function newGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

// Strict mode
// Green = Active; Red = Inactive
// If user gets one wrong, game starts over
(function strictMode() {
  $('#strict-button').on('click', () => {
    const indicator = $('#strict-indicator')[0];
    if (indicator.style.background === 'red' || indicator.style.background === '') {
      indicator.style.background = 'green';
      game.strict = true;
    } else {
      indicator.style.background = 'red';
      game.strict = false;
    }
    newGame();
  });
}());

// Track count for each turn
function showMoves() {
  let i = 0;
  const move = setInterval(() => {
    playGame(game.currentGame[i]);
    i += 1;
    if (i >= game.currentGame.length) {
      clearInterval(move);
    }
  }, 600)
  
  game.player = [];
}

// Play sounds associated with each color
function sound(color) {
  let num;
  if (color === '.green-button') {
    num = 0;
  } else if (color === '.red-button') {
    num = 1;
  } else if (color === '.yellow-button') {
    num = 2;
  } else {
    num = 3;
  }

  const sound = new Audio(game.sound[num]);
  sound.pause();
  sound.currentTime = 0;
  sound.play();
}

function playGame(color) {
  $(color).addClass('hover');
  sound(color);
  setTimeout(() => {
    $(color).removeClass('hover');
  }, 300);
}

function addToPlayer(id) {
  let input = "." + id + "-button";
  $(input).addClass('hover');
  sound(id);
  setTimeout(() => {
    $(input).removeClass('hover');
  }, 300);
  game.player.push(input);
  playerTurn(input);
}

function playerTurn(e) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    if (game.strict){
      $('.alert-message')[0].innerHTML = 'Incorrect! Starting new game.';
      $('.alert-message').show().fadeOut(2500);
      setTimeout(() => {
        newGame();
      }, 1000);
    } else {
      $('.alert-message')[0].innerHTML = 'Incorrect! Try again.';
      $('.alert-message').show().fadeOut(1500);
      setTimeout(() => {
        showMoves();
      }, 1000);
    }
  } else {
    sound(e);
    let check = game.player.length === game.currentGame.length;
    if (check) {
      if (game.count == 20) {
        $('.alert-message')[0].innerHTML = 'You win!';
        $('.alert-message').show().fadeOut(1500);
      } else {
        $('.alert-message')[0].innerHTML = 'Next round!';
        $('.alert-message').show().fadeOut(1500);
        setTimeout(() => {
          addCount();
        }, 1000);
      }
    }
  }
} 

function generateMove(){
  game.currentGame.push(game.colors[(Math.floor(Math.random()*4))]);
  showMoves();
}

function addCount() {
  game.count++;
  countDisplay[0].innerHTML = game.count;
  generateMove();
}

const start = $('#start-restart-button');
start.on('click', () => {
  newGame();
});