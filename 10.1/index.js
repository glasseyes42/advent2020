const adapters = require('./adapters');

const sorted = adapters.sort((a, b) => a - b);

const diffs = {

};

const jumps = [0, ...sorted, sorted[sorted.length -1] + 3];
jumps.forEach((value, index) => {
  if (index === 0) return;
  const diff = value - jumps[index -1];
  if (!diffs[diff]) diffs[diff] = 0;
  diffs[diff]++;
});

console.info(diffs);
console.info(diffs[1] * diffs[3]);
