const NUM_CLICKS_FOR_ACTIVATION = 2

const fps = 60
let numClicks = 0
let isRunning = false
let interval

let Hoffset = 0
let Woffset = 0

let xPos = ball.offsetLeft
let yPos = ball.offsetTop

let vx = 3
let vy = 0

const a = 9.81

let rotation = 0
let angularVel = 0

// Get the ball
ball = document.getElementById('ball')

// Updates the ball's position
function updateBall () {
  width = document.body.clientWidth
  height = document.body.clientHeight
  Hoffset = ball.offsetHeight
  Woffset = ball.offsetWidth

  // Update the ball style properties
  ball.style.left = `${xPos + document.body.scrollLeft}px`
  ball.style.top = `${yPos + document.body.scrollTop}px`
  ball.style.transform = `rotate(${rotation}deg)`

  // Physics integration
  xPos = xPos + vx
  yPos = yPos + vy
  vy += a / fps
  angularVel = vx
  rotation += angularVel

  if (yPos <= -Hoffset) {
    stopBall()
  }

  // Vertical velocity
  if (yPos >= (height - Hoffset)) {
    yPos = height - Hoffset
    if ((-vy * 0.95) < 0.25) {
      vy = (-vy * 0.95) + 0.25
    } else {
      vy = 0
    }
  }

  // Horizontal velocity
  if (xPos < 0) {
    xPos = 0
    if ((-vx * 0.95) > 0.5) {
      vx = (-vx * 0.95) - 0.5
    } else {
      vx = 0
    }
  }
  if (xPos >= (width - Woffset)) {
    xPos = (width - Woffset)
    if ((-vx * 0.95) < -0.5) {
      vx = (-vx * 0.95) + 0.5
    } else {
      vx = 0
    }
  }
}

// Counts the number of clicks and starts the ball if it's been clicked enough times
function registerBallClick () {
  numClicks++
  if (numClicks == NUM_CLICKS_FOR_ACTIVATION && !isRunning) {
    runBall()
  }
}

// Begins animating the ball
function runBall () {
  interval = setInterval(updateBall, 1 / fps)
  document.body.style.overflow = 'hidden' // Prevents scrollbar from appearing when the ball is near the edge
  ball.style.visibility = 'visible' // Show the ball
  isRunning = true
}

// Stops animating the ball
function stopBall () {
  clearInterval(interval)
  document.body.style.overflow = 'scroll' // Re-enable scrolling
  ball.style.visibility = 'hidden' // Hide the ball
  isRunning = false
  numClicks = 0
}
