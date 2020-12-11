const seatingPlan = require('./plan');

let latestState = seatingPlan;
let lastState = [];
const rows = seatingPlan.length;
const columns = seatingPlan[0].length;

const FLOOR = '.', OCCUPIED = '#', EMPTY = 'L';

const compareStates = (a, b) => (JSON.stringify(a) === JSON.stringify(b));

const checkSeat = (row, column) => {
  const nearbyStates = [];
  for (let compareRow = row - 1; compareRow <= row + 1; compareRow++) {
    for (let compareColumn = column - 1; compareColumn <= column + 1; compareColumn++) {
      if (compareRow === row && compareColumn === column) continue;

      if (lastState[compareRow] && lastState[compareRow][compareColumn]) {
        nearbyStates.push(lastState[compareRow][compareColumn]);
      }
    }
  }

  const lastSeatState = lastState[row][column];
  let newSeatState = lastSeatState;
  if (lastSeatState === EMPTY && nearbyStates.filter(s => s === OCCUPIED).length === 0) {
    newSeatState = OCCUPIED;
  } else if (lastSeatState === OCCUPIED && nearbyStates.filter(s => s === OCCUPIED).length >= 4) {
    newSeatState = EMPTY;
  }

  return newSeatState;
}

let round = 0;
const tick = () => {
  lastState = JSON.parse(JSON.stringify(latestState));
  round++;

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      if (seatingPlan[row][column] !== FLOOR) {
        const seatResult = checkSeat(row, column);
        latestState[row][column] = seatResult;
      }
    }
  }
}

while (!compareStates(latestState, lastState)) {
  tick();
}

console.info(`Rounds ${round}`);
const occupied = latestState.reduce((acc, row) => {
  return acc + row.filter(s => s === OCCUPIED).length;
}, 0);

console.info(`Occupied seats ${occupied}`);
