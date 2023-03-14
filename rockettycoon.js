var rocket = document.getElementById('rocket');
var background = document.getElementById('background');
var counter = 0;
var speed = 2;
var maxObstacles = 10;
var numObstacles = 1; // start with 1 obstacle
var obstacles = [];

// increase difficulty at set intervals
var increaseDifficultyInterval = setInterval(function() {
  if (speed < 6) { // increase speed until it reaches 6
    speed += 1;
  }
  if (numObstacles < maxObstacles) { // increase number of obstacles until it reaches maxObstacles
    numObstacles += 1;
  }
}, 8000); // every 8 seconds

// add event listeners for left and right arrow keys
document.addEventListener('keydown', function(event) {
  if (event.code === 'ArrowLeft') {
    moveRocket('left');
  } else if (event.code === 'ArrowRight') {
    moveRocket('right');
  }
});

function moveRocket(direction) {
  var currentLeft = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
  if (direction === 'left' && currentLeft > 0) {
    rocket.style.left = (currentLeft - 20) + 'px'; // increase movement speed to 20px per key press
  } else if (direction === 'right' && currentLeft < 340) {
    rocket.style.left = (currentLeft + 20) + 'px'; // increase movement speed to 20px per key press
  }
}

function createObstacle(type) {
  var newObstacle = document.createElement('div');
  newObstacle.className = 'obstacle ' + type;
  var newImage = document.createElement('img');
  if (type === 'star') {
    newImage.src = 'stars.png';
  } else if (type === 'blueplanet') {
    newImage.src = 'blueplanet.png';
  } else {
    newImage.src = 'asteroids.png';
  }
  newImage.width = 30;
  newImage.height = 30;
  newObstacle.appendChild(newImage);
  obstacles.push(newObstacle);
  document.getElementById('game').appendChild(newObstacle);
  newObstacle.style.left = Math.floor(Math.random() * 360) + 'px';
  newObstacle.style.top = (Math.floor(Math.random() * 800) - 1000) + 'px';
}

function updateObstacles() {
  if (obstacles.length < numObstacles) {
    var obstacleType = Math.random() < 0.3 ? 'star' : (Math.random() < 0.6 ? 'blueplanet' : 'asteroid');
    createObstacle(obstacleType);
  }
  for (var i = 0; i < obstacles.length; i++) {
    var obstacle = obstacles[i];
    var obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
    var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    var rocketLeft = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
    if (obstacleTop > 700) {
      obstacle.remove();
      obstacles.splice(i, 1);
      i--;
    } else {
      obstacle.style.top = (obstacleTop + speed) + 'px';
      if (obstacleLeft > (rocketLeft - 40) && obstacleLeft < (rocketLeft + 60) && obstacleTop > 660 && obstacleTop < 700) {
        clearInterval(gameInterval);
        alert("Waves Survived: " + counter);
      }
    }
  }
}
     
var gameInterval = setInterval(function() {
  updateObstacles();
  counter = 0;
  for (var i = 0; i < obstacles.length; i++) {
    counter += 1;  
  }
  
  rocket.classList.remove("animate");
  setTimeout(function() {
    rocket.classList.add("animate");
  }, 1);
}, 10);