const passes = require('./passes');

const maxRows = 128;
const maxColumns = 8;

const process = (pass) => {
  const directions = pass.split('');
  const columnDirections = directions.splice(-3);

  const rowSearch = directions.reduce(({ min, max}, direction) => {
    const diff = Math.round((max - min) / 2);
    if (direction === 'F') {
      return { min, max: max - diff };
    } else {
      return { min: min + diff, max };
    }
  }, { min: 1, max: maxRows });

  const row = rowSearch.min - 1;

  const columnSearch = columnDirections.reduce(({ min, max}, direction) => {
    const diff = Math.round((max - min) / 2);
    if (direction === 'L') {
      return { min, max: max - diff };
    } else {
      return { min: min + diff, max };
    }
  }, { min: 1, max: maxColumns });

  const column = columnSearch.min - 1;

  return {
    column,
    row,
    id: (row * 8) + column,
  };
};

const processed = passes.map(process);

const maxId = processed.reduce((acc, { id }) => {
  return id > acc ? id : acc;
}, 0);

console.info(maxId);
