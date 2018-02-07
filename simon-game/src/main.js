const game = {
  count: 0,
  colors: ['.green-button','.red-button', '.yellow-button', '.blue-button'],
  currentGame: [],
  player: [],
  sound:{
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
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
  }, 500)
  
  game.player = [];
}

// Play sounds associated with each color
function sound(color) {
  switch(color) {
    case'.green-button':
      game.sound.green.play();
      break;
    case '.blue-button':
      game.sound.blue.play();
      break;
    case '.red-button':
      game.sound.red.play();
      break;
    case '.dark-button':
      game.sound.yellow.play();
      break;
  };
}

function playGame(color) {
  $(color).addClass('hover');
  console.log(color);
  sound(color);
  setTimeout(() => {
    $(color).removeClass('hover');
  }, 300);
}

function addToPlayer(id) {
  let input = "." + id + "-button";
  $(input).addClass('hover');
  sound(input);
  setTimeout(() => {
    $(input).removeClass('hover');
  }, 300);
  game.player.push(input);
  playerTurn(input);
}

function playerTurn(e) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    if (game.strict){
      alert('Game over!');
      newGame();
    } else {
      alert('Incorrect! Try again!');
      showMoves();
    }
  } else {
    sound(e);
    let check = game.player.length === game.currentGame.length;
    if (check) {
      if (game.count == 20) {
        alert('You win!');
      } else {
        // alert('Next round!');
        addCount();
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

// newGame();

const start = $('#start-restart-button');
start.on('click', () => {
  newGame();
});