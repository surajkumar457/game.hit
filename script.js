const grid = document.getElementById('grid');
const timeDisplay = document.getElementById('time');
const scoreDisplay = document.getElementById('score');

let score = 0;
let timeLeft = 40;
let mousePosition;
let timerId;
let moveMouseInterval;

function createGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.id = i;
    square.addEventListener('click', hitMouse);
    grid.appendChild(square);
  }
}

function randomMouse() {
  const squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.classList.remove('mouse');
    square.innerHTML = '';
  });

  const randomIndex = Math.floor(Math.random() * 9);
  const mouseSquare = squares[randomIndex];
  mouseSquare.classList.add('mouse');
  mouseSquare.innerHTML = 'hit';
  mousePosition = randomIndex;
}

function hitMouse(e) {
  if (parseInt(e.target.dataset.id) === mousePosition) {
    score++;
    scoreDisplay.textContent = score;
    e.target.classList.remove('mouse');
    e.target.innerHTML = '';
    mousePosition = null;
  }
}

function countDown() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;
  if (timeLeft === 0) {
    clearInterval(timerId);
    clearInterval(moveMouseInterval);
    alert("⏱️ Time's up! Your score: " + score);
  }
}

function startGame() {
  score = 0;
  timeLeft = 40;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  createGrid();
  randomMouse();
  moveMouseInterval = setInterval(randomMouse, 800);
  timerId = setInterval(countDown, 1000);
}