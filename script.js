let canvas = document.getElementById('snake');
let context = canvas.getContext('2d');
let score = document.getElementById('score');
let box = 32;
let snake = [];
let direction = 'right';

snake.push({
  x: 8 * box,
  y: 8* box,
});

let food = {
  x: calcularPosicaoAleatoria(),
  y: calcularPosicaoAleatoria(),
}

function criarBG() {
  context.fillStyle = 'lightgreen';
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'green';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function atualizarPosicaoCobrinha(newX, newY) {
  const limiteHorizontal = 15 * box;
  const limiteVertical = 15 * box;
  if (newX > limiteHorizontal) {
    newX = 0;
  }
  if (newX < 0) {
    newX = limiteHorizontal;
  }
  if (newY > limiteVertical) {
    newY = 0;
  }
  if (newY < 0) {
    newY = limiteVertical;
  }

  let newHead = {
    x: newX,
    y: newY,
  }

  if (newX !== food.x || newY !== food.y) {
    snake.pop();
  }

  snake.unshift(newHead);
}

function calcularPosicaoAleatoria() {
  return Math.floor(Math.random() * 15 + 1) * box;
}

document.addEventListener('keydown', atualizarDirecao);

function atualizarDirecao (event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left';
  if (event.keyCode == 38 && direction != 'down') direction = 'up';
  if (event.keyCode == 39 && direction != 'left') direction = 'right';
  if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

function atualizarPosicaoComida() {
  if (food.x === snake[0].x && food.y === snake[0].y) {
    food.x = calcularPosicaoAleatoria();
    food.y = calcularPosicaoAleatoria();
    incrementarScore();
  }
}

function incrementarScore() {
  let oldScore = Number(score.innerHTML);
  score.innerHTML = oldScore + 1;
} 

function desenharComida() {
  atualizarPosicaoComida();
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

function checarGameOver() {
  const headPosition = snake[0];
  for (let i = 1; i < snake.length; i++) {
    if (headPosition.x == snake[i].x && headPosition.y == snake[i].y) {
      clearInterval(jogo);
      alert('Game over');
    }
  }
}

function iniciarJogo() {
  criarBG();
  criarCobrinha();
  desenharComida();
  checarGameOver();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  switch (direction) {
    case 'right':
      snakeX += box;
      break;
    case 'left':
      snakeX -= box;
      break;
    case 'up':
      snakeY -= box;
      break;
    case 'down':
      snakeY += box;
      break;
    default:
      break;
  }

  atualizarPosicaoCobrinha(snakeX, snakeY);
}

let jogo = setInterval(iniciarJogo, 100);


