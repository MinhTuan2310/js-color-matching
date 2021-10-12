import {
   getPlayAgainButton, 
   getTimerElement,
   getColorElementList,
   getColorBackground 
} 
from './selectors.js'

function shuffle(colorList) {
  if(colorList.length < 3 || !Array.isArray(colorList)) return colorList;

  for(let i = colorList.length - 1 ; i > 1; i--) {
    const j = Math.floor(Math.random() * i);
    
    const temp = colorList[i];
    colorList[i] = colorList[j];
    colorList[j] = temp;
  }

  return colorList;
}


export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor
  const baseColorList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome'];
  const colorList = [];
  let randomColorList = [];
  
  for(let i = 0; i < count; i++) {
    const color = randomColor({
      luminosity: 'dark',
      hue: baseColorList[i % baseColorList.length],
    });

    colorList.push(color);
  }
  
  randomColorList = [...colorList, ...colorList];

  return shuffle(randomColorList);
}

export function showReplayButton() {
  const replayButton = getPlayAgainButton()
  if (replayButton) {
    replayButton.classList.add('show')
  }
}

export function hideReplayButton() {
  const replayButton = getPlayAgainButton()
  if (replayButton) {
    replayButton.classList.remove('show')
  }
}

export function addGameTimerText(text) {
  const timerText = getTimerElement();
  if(!timerText) return;

  typeof text === 'number' ? timerText.textContent = `${text}s` : timerText.textContent = text;
}

export function removeGameTimerText() {
  const timerText = getTimerElement();
  timerText.textContent = '';
}

export function removeClassActive() {
  const liElementList = getColorElementList();
  if(!liElementList) return

  liElementList.forEach(liElement => {
    liElement.classList.remove('active');
  })
}

export function setBackgroundWhenMatch(color) {
  const backgroundColor = getColorBackground();
  if(!backgroundColor) return;

  backgroundColor.style.backgroundColor = color;
}