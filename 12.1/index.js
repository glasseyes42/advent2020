const instructions = require('./instructions');

const directions = ['N', 'E', 'S', 'W'];
const state = {
  direction: 'E',
  travelledX: 0,
  travelledY: 0,
};

const rotate = ({ instruction, value }) => {
  const relativeIndex = value / 90 * (instruction === 'L' ? -1 : 1);
  const currentIndex = directions.indexOf(state.direction);

  let index = currentIndex + relativeIndex;
  if (index < 0) {
    index = directions.length + index;
  } else if (index > directions.length - 1) {
    index = index - directions.length;
  }

  return directions[index];
}

const move = ({ direction, value }) => {
  switch (direction) {
    case 'N':
      state.travelledY = state.travelledY + value;
      break;
    case 'S':
      state.travelledY = state.travelledY - value;
      break;
    case 'E':
      state.travelledX = state.travelledX + value;
      break;
    case 'W':
      state.travelledX = state.travelledX - value;
      break;
  }
}

instructions.forEach(({ instruction, value }) => {
  switch (instruction) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      move({ direction: instruction, value });
      break;
    case 'L':
    case 'R':
      state.direction = rotate({ instruction, value });
      break;
    case 'F':
      move({ direction: state.direction, value });
      break;
  }
});

console.info(Math.abs(state.travelledX) + Math.abs(state.travelledY));
