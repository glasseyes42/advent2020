const instructionList = require('./instructions');

const execute = (list) => {
  const state = {
    acc: 0,
    current: 0,
    next: 0,
  };

  const visitedLocations = new Set();

  const tick = () => {
    state.current = state.next;
    visitedLocations.add(state.current);

    const { instr, sign, value } = list[state.current];
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
    if (state.next === list.length) keepRunning = false;
  }

  return {
    acc: state.acc,
    exited: state.next === list.length,
  }
}

for (let pointer = 0; pointer < instructionList.length; pointer++) {
  if (['jmp', 'nop'].indexOf(instructionList[pointer].instr) > -1) {
    const newList = JSON.parse(JSON.stringify(instructionList)); // lazy deep clone because its an array of objects so it'd copy by reference.

    newList[pointer].instr = newList[pointer].instr === 'nop' ? 'jmp' : 'nop';
    const result = execute(newList);
    if (result.exited) {
      console.info(result);
    }
  }
}
