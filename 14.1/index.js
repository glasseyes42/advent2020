const program = require('./program');

let postiveMask;
let negativeMask;

let memory = {};

program.forEach(entry => {
  if (entry.type === 'mask') {
    ({ postiveMask, negativeMask } = entry);
  } else {
    memory[entry.destination] = Number((BigInt(entry.value) | BigInt(postiveMask)) & BigInt(negativeMask));
  }
});

console.info(Object.keys(memory).reduce((acc, key) => acc + memory[key], 0));
