const parse = (section) => {
  const toReturn = [];
  const toProcess = [...section];

  while (toProcess.length) {
    const current = toProcess.shift();
    if (!Array.isArray(current)) { // operators
      toReturn.push(current);
    } else if (current[0] === '(') { // bracketed section
      current.shift(); // lose the leading bracket
      current.pop(); //lose the trailing bracket
      toReturn.push(parse(current));
    } else { // array of just numbers to concat & parse
      toReturn.push(parseInt(current.concat(''), 10));
    }
  }

  return toReturn;
}

module.exports = parse;
