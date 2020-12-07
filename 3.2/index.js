const map = require('./map');

const slopes = [
  { slopeX: 1, slopeY: 1 },
  { slopeX: 3, slopeY: 1 },
  { slopeX: 5, slopeY: 1 },
  { slopeX: 7, slopeY: 1 },
  { slopeX: 1, slopeY: 2 },
]

const mapWidth = map[0].length - 1;
const mapHeight = map.length - 1;

let x = 0;
let y = 0;

let treeCount = 0;

const traverse = (slopeX, slopeY) => {
  if ((x + slopeX) > mapWidth) {
    x = (x + slopeX) - (mapWidth + 1);
  } else {
    x = x + slopeX;
  }

  if ((y + slopeY) > mapHeight) {
    return false;
  } else {
    y = y + slopeY;
  }

  if (map[y][x] === '#') treeCount++;

  return true;
};

const answers = slopes.map(({ slopeX, slopeY }) => {
  x = 0, y = 0, treeCount = 0;
  let keepGoing = true;

  while (keepGoing) {
    keepGoing = traverse(slopeX, slopeY);
  }

  return treeCount;
});

console.info(answers);
console.info(answers.reduce((acc, a) => (acc * a), 1));
