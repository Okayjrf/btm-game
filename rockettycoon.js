var rocket = document.getElementById('rocket');
var obstacle = document.getElementById('obstacle');
var ground = document.getElementById('ground');
var counter = 0;
var speed = 2;
var numObstacles = 1; // start with 1 obstacle
var obstacles = [];

// increase difficulty at set intervals
var increaseDifficultyInterval = setInterval(function() {
    if (speed < 5) { // increase speed until it reaches 4
        speed += 1;
    }
    if (numObstacles < 4) { // increase number of obstacles until it reaches 4
        numObstacles += 1;
        createObstacles();
    }
}, 10000); // every 10 seconds

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

function createObstacles() {
    for (var i = 0; i < numObstacles; i++) {
      var newObstacle = document.createElement('div');
      newObstacle.className = 'obstacle';
      var newImage = document.createElement('img');
      newImage.src = 'asteroid.png';
      newImage.width = 40;
      newImage.height = 40;
      newObstacle.appendChild(newImage);
      obstacles.push(newObstacle);
      document.getElementById('game').appendChild(newObstacle);
      newObstacle.style.left = Math.floor(Math.random() * 360) + 'px';
      newObstacle.style.top = (Math.floor(Math.random() * 800) - 1000) + 'px';
    }
  }

  function updateObstacles() {
    for (var i = 0; i < obstacles.length; i++) {
      var obstacle = obstacles[i];
      var obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue("top"));
      if (obstacleTop > 800) {
        obstacle.remove();
        obstacles.splice(i, 1);
        createObstacles();
      } else {
        obstacle.style.top = (obstacleTop + speed) + 'px';
        var obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
        var rocketLeft = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
        if (obstacleLeft > (rocketLeft - 40) && obstacleLeft < (rocketLeft + 60) && obstacleTop > 660 && obstacleTop < 740) {
          clearInterval(gameInterval);
          alert("GAME OVER - SCORE: " + counter);
        } else if (obstacleTop === 760) {
          counter += 1; // increase score by 1
        }
      }
    }
  }

function increaseScore() {
    counter += 1;
}

function gameLoop() {
    updateObstacles();
    increaseDifficulty();
    increaseScore();
}

createObstacles();
var gameInterval = setInterval(gameLoop, 10); // update the game every 10ms
