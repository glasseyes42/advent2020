const list = require('./list');

const consider = 25;
const offset = 25;

const canSumFrom = (result, input) => {
  const results = input.map((valueA, valueAindex) => {
    const compareArray = [...input];
    compareArray.splice(valueAindex, 1);

    return compareArray.reduce((acc, valueB) => {
      if (acc) return acc;
      if (valueA + valueB === result) return true;
      return acc;
    }, false);
  })

  return results.reduce((acc, result) => acc || result, false);
};

try {
  list.forEach((n, i) => {
    if (i < offset) return;
    if (!canSumFrom(n, list.slice(i - consider, i))) {
      throw new Error(`${n} is invalid`);
    }
  });
} catch (e) {
  console.error(e);
}
