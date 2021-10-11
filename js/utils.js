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


