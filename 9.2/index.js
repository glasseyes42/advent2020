const list = require('./list');

const solveFor = 23278925;
const indexOf = list.indexOf(solveFor);

for (let start = 0; start < indexOf; start++) {
  let sum = list[start];
  let lowestIndex = start;
  let highestIndex = start;

  while (sum < solveFor) {
    highestIndex = highestIndex + 1;
    sum = sum + list[highestIndex];
  }

  if (sum === solveFor) {
    console.info(`Found sum from indexes: ${lowestIndex} to ${highestIndex}`);
    const slice = list.slice(lowestIndex, highestIndex).sort((a, b) => a - b);
    console.info(`Sum: ${slice[0] + slice[slice.length - 1]}`);
    break;
  }
}
