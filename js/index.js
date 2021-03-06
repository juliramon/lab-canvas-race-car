const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// OBJECTS

const road = {
  img: new Image(),
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  safeDistance: 60,
  speed: 5,
  obstacles: [],
  score: 0,
  move: function(){
    this.y += this.speed;
    this.y %= this.height;
  },
  show: function() {
    this.img.src = './images/road.png';
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x, this.y - this.height, this.width, this.height);
  }
}

const car = {
  img: new Image(),
  x: (canvas.width / 2) - 40,
  y: (canvas.height - 200),
  width: 0,
  height: 0,
  speedX: 15,
  show: function() {
    this.img.src = '/images/car.png';
    this.width = 80;
    this.height = (this.img.height / this.img.width) * this.width;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

const obstacles = {
  obstacles: [],
  fps: 0,
  initialize: function(){
    let singleObstacle = {
      x: 0,
      y: 0,
      minWidth: 30,
      maxWidth: canvas.width - (car.width * 4),
      height: 15
    }
    singleObstacle.x = Math.random() * canvas.width;
    singleObstacle.width = Math.floor(Math.random() * (singleObstacle.maxWidth - singleObstacle.minWidth + 1) + singleObstacle.minWidth);
    this.obstacles.push(singleObstacle);
  },
  show: function(){
    this.obstacles.forEach(obs => obs.y += 4);
    this.obstacles.forEach(obs => {
      ctx.fillStyle = 'brown';
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    })
  }
}

// EVENTS & FUNCTIONS

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
    setInterval(function(){obstacles.initialize()}, 1500)
    document.onkeydown = driveCar;
    function startGame() {
      requestAnimationFrame(updateCanvas);
    }
  };
};

function updateCanvas() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  road.move();
  road.show();
  car.show();
  obstacles.show();
  requestAnimationFrame(updateCanvas);
}

function driveCar(event) {
  event.key === 'ArrowLeft' && car.x > road.safeDistance ? car.x -= car.speedX : null;
  event.key === 'ArrowRight' && car.x < (canvas.width - car.width - road.safeDistance) ? car.x += car.speedX : null;
}