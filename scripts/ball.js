const NUM_CLICKS_FOR_ACTIVATION = 1
const FPS = 60
const a = 9.81

// Get the ball
let ball = document.getElementById('ball')

// Get the button
let ballButton = document.getElementById('ball-button')

let numClicks = 0
let isRunning = false
let interval

let hOffset = 0
let wOffset = 0

let xPos = 0
let yPos = 0

let vx = 3
let vy = -1

let rotation = 0
let angularVel = 0

// Updates the ball's position
function updateBall () {

  // Window size
  width = document.body.clientWidth
  height = document.body.clientHeight

  // Scroll offsets
  xOffset = document.body.scrollLeft
  yOffset = document.body.scrollTop

  // Ball size
  hOffset = ball.offsetHeight
  wOffset = ball.offsetWidth

  // Update the ball style properties
  ball.style.left = `${xPos + xOffset}px`
  ball.style.top = `${yPos + yOffset}px`
  ball.style.transform = `rotate(${rotation}deg)`

  // Physics integration
  xPos = xPos + vx
  yPos = yPos + vy
  vy += a / FPS
  angularVel = vx
  rotation += angularVel

  // Vertical velocity
  if (yPos >= (height - hOffset + yOffset)) {
    yPos = height - hOffset
    if ((-vy * 0.95) < 0.25) {
      vy = (-vy * 0.95) + 0.25
    } else {
      vy = 0
    }
  }

  // Horizontal velocity
  if (xPos < xOffset) {
    xPos = 0
    if ((-vx * 0.95) > 0.5) {
      vx = (-vx * 0.95) - 0.5
    } else {
      vx = 0
    }
  }
  if (xPos >= (width - wOffset + xOffset)) {
    xPos = (width - wOffset)
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
    initializePosition()
    runBall()
  }
}

// Initializes the ball's position
function initializePosition () {
  let rect = ballButton.getBoundingClientRect()
  xPos = rect.left + document.body.scrollLeft
  yPos = rect.top + document.body.scrollTop
}

// Begins animating the ball
function runBall () {
  ballButton.style.visibility = 'hidden' // Hide the button
  interval = setInterval(updateBall, 1 / FPS)
  document.body.style.overflow = 'hidden' // Prevents scrollbar from appearing when the ball is near the edge
  ball.style.visibility = 'visible' // Show the ball
  isRunning = true
}

// Stops animating the ball
function stopBall () {
  ballButton.style.visibility = 'visible' // Show the button
  clearInterval(interval)
  document.body.style.overflow = 'scroll' // Re-enable scrolling
  ball.style.visibility = 'hidden' // Hide the ball
  isRunning = false
  numClicks = 0
}