const seatingPlan = require('./plan');

let latestState = seatingPlan;
let lastState = [];
const rows = seatingPlan.length;
const columns = seatingPlan[0].length;

const FLOOR = '.', OCCUPIED = '#', EMPTY = 'L';

const compareStates = (a, b) => (JSON.stringify(a) === JSON.stringify(b));

const views = [ // row, column
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

const observeSeats = (seatRow, seatColumn, rowDirection, columnDirection) => {
  if (!lastState[seatRow] || !lastState[seatRow][seatColumn]) return false;

  const lastSeatState = lastState[seatRow][seatColumn];
  if (lastSeatState === OCCUPIED) return lastSeatState;
  if (lastSeatState === EMPTY) return lastSeatState;
  return observeSeats(seatRow + rowDirection, seatColumn + columnDirection, rowDirection, columnDirection);
}

const checkSeat = (row, column) => {
  const observedStates = [];
  views.forEach(([rowDirection, columnDirection]) => {
    const isNotFloor = observeSeats(row + rowDirection, column + columnDirection, rowDirection, columnDirection);
    if (isNotFloor) observedStates.push(isNotFloor);
  });

  const lastSeatState = lastState[row][column];
  let newSeatState = lastSeatState;
  if (lastSeatState === EMPTY && observedStates.filter(s => s === OCCUPIED).length === 0) {
    newSeatState = OCCUPIED;
  } else if (lastSeatState === OCCUPIED && observedStates.filter(s => s === OCCUPIED).length >= 5) {
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

  console.info('last state  new state')
  console.info(lastState.map((row, ri) => [row.join(''), latestState[ri].join('')].join('  ')).join('\n'))
  console.info()
}

while (!compareStates(latestState, lastState)) {
  tick();
}

console.info(`Rounds ${round}`);
const occupied = latestState.reduce((acc, row) => {
  return acc + row.filter(s => s === OCCUPIED).length;
}, 0);

console.info(`Occupied seats ${occupied}`);
