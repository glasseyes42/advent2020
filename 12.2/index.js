const instructions = require('./instructions');

const state = {
  travelledX: 0,
  travelledY: 0,
  waypointX: 10,
  waypointY: 1,
};

const rotate = ({ instruction, value }) => {
  const clockwise = instruction === 'R';
  if (value === 360) return;

  const currentX = state.waypointX;
  const currentY = state.waypointY;
  if (value === 180) {
    state.waypointX = -currentX;
    state.waypointY = -currentY;
    return;
  }
  if ((value === 90 && clockwise) || (value === 270 && !clockwise)) {
    state.waypointX = currentY;
    state.waypointY = -currentX;
  } else {
    state.waypointX = -currentY;
    state.waypointY = currentX;
  }
}

const moveWaypoint = ({ direction, value }) => {
  switch (direction) {
    case 'N':
      state.waypointY = state.waypointY + value;
      break;
    case 'S':
      state.waypointY = state.waypointY - value;
      break;
    case 'E':
      state.waypointX = state.waypointX + value;
      break;
    case 'W':
      state.waypointX = state.waypointX - value;
      break;
  }
}

const move = (value) => {
  state.travelledX = state.travelledX + (state.waypointX * value);
  state.travelledY = state.travelledY + (state.waypointY * value);
}

instructions.forEach(({ instruction, value }) => {
  switch (instruction) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      moveWaypoint({ direction: instruction, value });
      break;
    case 'L':
    case 'R':
      rotate({ instruction, value });
      break;
    case 'F':
      move(value);
      break;
  }
});

console.info(Math.abs(state.travelledX) + Math.abs(state.travelledY));
