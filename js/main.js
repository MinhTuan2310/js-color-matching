import { GAME_STATUS, GAME_TIME } from './constants.js'

import {
  getRandomColorPairs,
  showReplayButton,
  hideReplayButton,
  addGameTimerText,
  removeGameTimerText,
  removeClassActive,
  setBackgroundWhenMatch,
  createTimer
} from './utils.js'

import {
  getColorElementList,
  getUlElementList,
  getPlayAgainButton,
  getInactiveLiElement,
  getTimerElement,
} from './selectors.js'
// Global variables
let selections = []
let gameStatus = GAME_STATUS.PLAYING
let timer = createTimer({
  second: GAME_TIME,
  onChange: handleTimerChange,
  onFinish: handleTimerFinished,
})

function handleTimerChange(second) {
  addGameTimerText(second)
}

function handleTimerFinished() {
  gameStatus = GAME_STATUS.FINISHED;
  addGameTimerText('GAME OVER !!')
  showReplayButton();
}

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function handlerClick(liElement) {
  if (gameStatus === GAME_STATUS.BLOCKING || gameStatus === GAME_STATUS.FINISHED) return
  liElement.classList.add('active')

  // check 2 colors matching
  selections.push(liElement)
  if (selections.length < 2) return

  const [first, second] = selections
  const isMatch = first.dataset.color === second.dataset.color

  if (isMatch) {
    const isWin = getInactiveLiElement().length === 0
    // set background color when 2 colors is matched
    setBackgroundWhenMatch(first.dataset.color)
    // 2 clors are matched and all of its is filled
    if (isWin) {
      // update gameStatus
      gameStatus = GAME_STATUS.FINISHED
      // stop timer
      timer.clear()
      // show timer text
      addGameTimerText('YOU WIN !!')
      // show replay button
      showReplayButton()
    }

    // 2 color is matched and all of its not fill;
    selections = []
    return
  }

  gameStatus = GAME_STATUS.BLOCKING
  setTimeout(() => {
    first.classList.remove('active')
    second.classList.remove('active')

    selections = []
    if(gameStatus !== GAME_STATUS.FINISHED) {
      gameStatus = GAME_STATUS.PLAYING
    }
  }, 500)
}

function initColors() {
  const colorList = getRandomColorPairs(8)

  const liElementList = getColorElementList()
  if (!liElementList) return

  liElementList.forEach((liElement, index) => {
    liElement.dataset.color = colorList[index]
    liElement.firstElementChild.style.backgroundColor = colorList[index]
  })
}

function attachColorInLiElementList() {
  const ulElementList = getUlElementList()
  if (!ulElementList) return

  ulElementList.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return
    handlerClick(event.target)
  })
}

function resetGame() {
  // reset gameTimerText
  removeGameTimerText()
  // reset gameStatus
  gameStatus = GAME_STATUS.PLAYING
  // hide replay button
  hideReplayButton()
  // remove class active
  removeClassActive()
  // init new colorList
  initColors()
  // start Timer
  // setTimer()
  timer.start()
}

function attachReplayButton() {
  const replayButton = getPlayAgainButton()
  if (!replayButton) return

  replayButton.addEventListener('click', resetGame)
}

// function setTimer() {
//   const timerText = getTimerElement()
//   if (!timerText) return

//   let initialTime = GAME_TIME;
//   addGameTimerText(initialTime)
//   const runTimer = setInterval(() => {
//     --initialTime
//     addGameTimerText(initialTime)

//     // win
//     if(gameStatus === GAME_STATUS.FINISHED) {
//       clearInterval(runTimer)
//       addGameTimerText('YOU WIN !!!!!!')
//       showReplayButton()
//     }
    
//     // game over
//     if (initialTime < 0) {
//       clearInterval(runTimer)
//       addGameTimerText('GAME OVER')
//       gameStatus = GAME_STATUS.FINISHED
//       showReplayButton()
//     }
//   }, 1000)
// }

function startTimer() {
  timer.start();
}

;(() => {
  initColors()
  attachColorInLiElementList()
  attachReplayButton()
  // setTimer()
  startTimer();
})()
