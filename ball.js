var NUM_CLICKS_FOR_ACTIVATION = 3;
var numClicks = 0;
var isRunning = false;
var delay = 3;
var height = 0;
var Hoffset = 0;
var Woffset = 0;
var vx = 3;
var vy = 0;
var a = 9.81 / 60;
var rotation = 0;
var angularVel = 0;
var pause = true;
var interval;
var xPos = ball.offsetLeft;
var yPos = ball.offsetTop;

function changePos() {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    Hoffset = ball.offsetHeight;
    Woffset = ball.offsetWidth;
    ball.style.left = xPos + document.body.scrollLeft;
    ball.style.top = yPos + document.body.scrollTop;
    ball.style.transform = "rotate(" + rotation + "deg)";

    xPos = xPos + vx;
    yPos = yPos + vy;
    vy += a;
    angularVel = vx;
    rotation += angularVel;

    //top
    if (yPos <= -Hoffset) {
        clearInterval(interval);
        numClicks = 0;
        isRunning = false;
        document.body.style.overflow = "scroll"
    }

    //bottom
    if (yPos >= (height - Hoffset)) {
        yPos = height - Hoffset;
        if ((-vy * 0.95) < 0.25) {
            vy = (-vy * 0.95) + 0.25;
        }
        else {
            vy = 0;
        }
    }

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
function triggerBall() {
    numClicks++;
    if (numClicks == NUM_CLICKS_FOR_ACTIVATION && !isRunning) {
        document.getElementById('ball').style.visibility = "visible";
        interval = setInterval('changePos()', delay);
        isRunning = true;
        document.body.style.overflow = "hidden";
    }
}