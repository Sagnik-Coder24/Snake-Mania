// Game Constants
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let score = 0;
let speed = 7;
let lastPaintTime = 0;
// let snakeArr = [
//     { x: 13, y: 15 }
// ];
let a = 1;
let b = 18;
food = {
    x: Math.round(a + (b - a) * Math.random()),
    y: Math.round(a + (b - a) * Math.random())
};
snakeArr = [{
    x: Math.round(a + (b - a) * Math.random()),
    y: Math.round(a + (b - a) * Math.random())
}];

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if (((ctime - lastPaintTime) / 1000) < (1 / speed)) {
        return;
    }
    // console.log(lastPaintTime);
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // Bumping with self
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // Bumping into wall
    if (snake[0].x > 18 || snake[0].x < 1 || snake[0].y > 18 || snake[0].y < 1) {
        return true;
    }

}

function gameEngine() {
    // Part 1: Updating Snake Array and food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over. Press any key to play again!");
        let a = 1;
        let b = 18;
        snakeArr = [{
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }];
        // musicSound.play();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }

    // Food eaten; increase score; regenerate food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(highscoreval));
            hiscoreBox.innerHTML = "Highest: " + highscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        foodSound.play();
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        // console.log(snakeArr);
        let a = 1;
        let b = 18;
        food = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        };
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // Part 2: Display the snake
    let board = document.querySelector('#board');
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Part 3: Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}





// Main logics
let hiscore = localStorage.getItem("hiscore");
// console.log(typeof(hiscore));
if (hiscore === null) {
    highscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(highscoreval));
} else {
    highscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Highest: " + highscoreval;

}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    musicSound.play();
    // Start the game
    moveSound.play();
    // console.log(e.key);
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})