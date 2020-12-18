const sums = require('./sums');
const tokeniseSection = require('./tokeniser');
const parse = require('./parser');

const processed = sums.map(line => {
  const input = line.split('').filter(c => !c.match(/\s/));

  const tokens = tokeniseSection(input);
  const tree = parse(tokens);

  // console.info(line);
  // console.info(tokens);
  // console.info(tree);
  // console.info();

  return tree;
});

const operators = ['+', '*'];
const execute = (input) => {
  const program = [...input];
  const state = {
    acc: 0,
    operator: '',
  };

  while (program.length) {
    const line = program.shift();
    if (operators.indexOf(line) > -1) {
      state.operator = line;
    } else if (Array.isArray(line)) {
      const result = execute(line);
      if (state.operator === '+') {
        state.acc = state.acc + result;
      } else if (state.operator === '*'){
        state.acc = state.acc * result;
      } else {
        state.acc = result;
      }
    } else {
      if (state.operator === '+') {
        state.acc = state.acc + line;
      } else if (state.operator === '*'){
        state.acc = state.acc * line;
      } else {
        state.acc = line;
      }
    }
  }

  return state.acc;
}

const results = processed.map(p => execute(p) );

console.info(results.reduce((acc, r) => acc + r, 0));
