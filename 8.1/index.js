const instructionList = require('./instructions');

const state = {
  acc: 0,
  current: 0,
  next: 0,
};

const visitedLocations = new Set();

const tick = () => {
  state.current = state.next;
  visitedLocations.add(state.current);

  const { instr, sign, value } = instructionList[state.current];
  if (instr === 'nop') {
    state.next = state.current + 1;
  } else if (instr === 'jmp') {
    state.next = (sign === '+' ? state.current + value : state.current - value);
  } else if (instr === 'acc') {
    state.acc = (sign === '+' ? state.acc + value : state.acc - value);
    state.next = state.current + 1;
  } else {
    throw new Error(`Unsupported instruction [${instr} ${sign}${value}]`);
  }
};

let keepRunning = true;
while(keepRunning) {
  tick();
  if (visitedLocations.has(state.next)) keepRunning = false;
}

console.info(state.acc);
