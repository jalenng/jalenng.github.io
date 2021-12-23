const NUM_CLICKS_FOR_ACTIVATION = 2;

var numClicks = 0;
var isRunning = false;
var fps = 60;
var interval;

var Hoffset = 0;
var Woffset = 0;

var xPos = ball.offsetLeft;
var yPos = ball.offsetTop;

var vx = 3;
var vy = 0;

var a = 9.81;

var rotation = 0;
var angularVel = 0;

// Get the ball
ball = document.getElementById('ball')

// Updates the ball's position
function updateBall() {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    Hoffset = ball.offsetHeight;
    Woffset = ball.offsetWidth;

    // Update the ball style properties
    ball.style.left = `${xPos + document.body.scrollLeft}px`;
    ball.style.top = `${yPos + document.body.scrollTop}px`;
    ball.style.transform = `rotate(${rotation}deg)`;

    // Physics integration
    xPos = xPos + vx;
    yPos = yPos + vy;
    vy += a / fps;
    angularVel = vx;
    rotation += angularVel;

    if (yPos <= -Hoffset) {
        stopBall();
    }    

    // Vertical velocity
    if (yPos >= (height - Hoffset)) {
        yPos = height - Hoffset;
        if ((-vy * 0.95) < 0.25) {
            vy = (-vy * 0.95) + 0.25;
        }
        else {
            vy = 0;
        }
    }

    // Horizontal velocity
    if (xPos < 0) {
        xPos = 0;
        if ((-vx * 0.95) > 0.5) {
            vx = (-vx * 0.95) - 0.5;
        }
        else {
            vx = 0;
        }
    }
    if (xPos >= (width - Woffset)) {
        xPos = (width - Woffset);
        if ((-vx * 0.95) < -0.5) {
            vx = (-vx * 0.95) + 0.5;
        }
        else {
            vx = 0;
        }
    }
}

// Counts the number of clicks and starts the ball if it's been clicked enough times
function registerBallClick() {
    numClicks++;
    if (numClicks == NUM_CLICKS_FOR_ACTIVATION && !isRunning) {
        runBall();
    }
}

// Begins animating the ball
function runBall() {
    interval = setInterval(updateBall, 1 / fps);
    document.body.style.overflow = "hidden"; // Prevents scrollbar from appearing when the ball is near the edge
    ball.style.visibility = "visible";  // Show the ball
    isRunning = true;
}

// Stops animating the ball
function stopBall() {
    clearInterval(interval);
    document.body.style.overflow = "scroll" // Re-enable scrolling
    ball.style.visibility = "hidden"; // Hide the ball
    isRunning = false;
    numClicks = 0;
}