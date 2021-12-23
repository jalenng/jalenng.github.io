const SPLASHES = [
  'Computer Science @ SJSU.',
  'Game and Web Developer.',
  'Python, JS, C#, C++, and more.',
  'Check out my contacts below.'
]
const CHARACTER_DELAY = 30
const CYCLE_PERIOD = 5000

const splashElement = document.getElementById('splash')

let splashString = ''
let index = -1

function clearInnerText () {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (splashString.length > 0) {
        splashString = splashString.slice(0, -1)
      } else {
        clearInterval(interval)
        resolve()
      }

      update()
    }, CHARACTER_DELAY)
  })
}

function writeInnerText () {
  const stringToWrite = SPLASHES[index]

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (splashString.length < stringToWrite.length) {
        splashString = stringToWrite.slice(0, splashString.length + 1)
      } else {
        clearInterval(interval)
        resolve()
      }

      update()
    }, CHARACTER_DELAY)
  })
}

function update () {
  splashElement.innerHTML = splashString.length === 0
    ? '<br>'
    : splashString
}

function cycleText () {
  index++
  if (index >= SPLASHES.length) {
    index = 0
  }
  clearInnerText().then(writeInnerText).then(() => {
    setTimeout(cycleText, CYCLE_PERIOD)
  })
}

cycleText()
