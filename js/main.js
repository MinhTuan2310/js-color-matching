import { GAME_STATUS } from './constants.js'
import { getRandomColorPairs } from './utils.js'
import {
  getColorElementList,
  getUlElementList,
  getPlayAgainButton,
  getInactiveLiElement,
} from './selectors.js'
// Global variables
let selections = []
let gameStatus = GAME_STATUS.PLAYING
const colorList = getRandomColorPairs(8)

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function showReplayButton() {
  const replayButton = getPlayAgainButton()
  if (replayButton) {
    replayButton.classList.add('show')
  }
}

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
    // 2 clors are matched and all of its is filled
    if (isWin) {
      // show replay button
      showReplayButton()
      // update gameStatus
      gameStatus = GAME_STATUS.FINISHED;
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
    gameStatus = GAME_STATUS.PLAYING
  }, 500)
}

function initLiElementList() {
  const liElementList = getColorElementList()
  if (!liElementList) return
  const ulElementList = getUlElementList()
  if (!ulElementList) return

  liElementList.forEach((liElement, index) => {
    liElement.dataset.color = colorList[index]
    liElement.firstElementChild.style.backgroundColor = colorList[index]
  })

  ulElementList.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return
    handlerClick(event.target)
  })
}

;(() => {
  initLiElementList()
})()
