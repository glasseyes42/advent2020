const map = require('./map');

const slopeX = 3;
const slopeY = 1;

const mapWidth = map[0].length - 1;
const mapHeight = map.length - 1;

let x = 0;
let y = 0;

let treeCount = 0;

const traverse = () => {
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

let keepGoing = true;
while (keepGoing) {
  keepGoing = traverse();
}

console.info(treeCount);
