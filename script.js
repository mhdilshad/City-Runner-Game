const runner = document.getElementById("runner");
const gameCanvas = document.getElementById("gameCanvas");
const scoreElement = document.getElementById("score");
const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreText = document.getElementById("finalScoreText");
const highScoreText = document.getElementById("highScoreText");

let score = 0;
let isGameOver = false;
let gameStarted = false;
let backgroundPos = 0;
let obstacleTimer;

// Setup initial state: Hide Game Over, Show Start
gameOverScreen.classList.add("hidden");
startScreen.classList.remove("hidden");

// Handle Inputs
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault(); // Prevents page from jumping down
        if (!gameStarted && !isGameOver) {
            startGame();
        } else if (isGameOver) {
            restartGame();
        } else {
            jump();
        }
    }
});

function jump() {
    if (!runner.classList.contains("animate-jump") && !isGameOver) {
        runner.classList.add("animate-jump");
        setTimeout(() => {
            runner.classList.remove("animate-jump");
        }, 500);
    }
}

function moveBackground() {
    if (isGameOver || !gameStarted) return;
    backgroundPos -= 4; // City scroll speed
    gameCanvas.style.backgroundPosition = backgroundPos + "px 0";
    requestAnimationFrame(moveBackground);
}

function createObstacle() {
    if (isGameOver || !gameStarted) return;

    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    let type;
    let rand = Math.random();

    // Choosing the obstacle and assigning special classes for sizing/positioning
    if (rand < 0.25) {
        type = "trash.png";
    } else if (rand < 0.50) {
        type = "banana.png";
        obstacle.classList.add("banana-size");
    } else if (rand < 0.75) {
        type = "fire-hydrant.png";
    } else {
        type = "dog.png";
        obstacle.classList.add("dog-size");
    }

    obstacle.style.backgroundImage = `url('${type}')`;
    obstacle.style.left = "960px"; // Start at the new right edge of the expanded canvas
    gameCanvas.appendChild(obstacle);

    let obstaclePos = 960;
    let moveTimer = setInterval(() => {
        if (isGameOver) {
            clearInterval(moveTimer);
            obstacle.remove();
            return;
        }

        obstaclePos -= 8; // Obstacle speed
        obstacle.style.left = obstaclePos + "px";

        let runnerBottom = parseInt(window.getComputedStyle(runner).getPropertyValue("bottom"));

        // Collision Logic: Detects if runner hits the obstacle
        if (obstaclePos > 30 && obstaclePos < 80 && runnerBottom <= 55) {
            endGame();
        }

        // Remove obstacle when it goes off screen and increase score
        if (obstaclePos < -100) {
            obstacle.remove();
            clearInterval(moveTimer);
            score++;
            scoreElement.innerHTML = "SCORE: " + score;
        }
    }, 20);

    // Random timing for the next obstacle spawn
    let nextSpawn = Math.random() * (2000 - 900) + 900;
    obstacleTimer = setTimeout(createObstacle, nextSpawn);
}

function startGame() {
    gameStarted = true;
    isGameOver = false;
    score = 0;
    scoreElement.innerHTML = "SCORE: 0";

    // Show the corner score when the game starts
    scoreElement.classList.remove("hidden");

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");

    moveBackground();
    createObstacle();
}

function endGame() {
    isGameOver = true;
    gameStarted = false;
    clearTimeout(obstacleTimer);

    // Hide the corner score when the game is over
    scoreElement.classList.add("hidden");

    // High Score tracking via localStorage
    let currentHighScore = localStorage.getItem("cityRunnerHighScore") || 0;
    if (score > currentHighScore) {
        currentHighScore = score;
        localStorage.setItem("cityRunnerHighScore", currentHighScore);
    }

    finalScoreText.innerHTML = "SCORE: " + score;
    highScoreText.innerHTML = "HIGH SCORE: " + currentHighScore;
    gameOverScreen.classList.remove("hidden");
}

function restartGame() {
    // Remove all existing obstacles from the screen
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(o => o.remove());
    startGame();
}
