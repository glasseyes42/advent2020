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

const liftAddition = (section) => {
  const toReturn = [];
  const toProcess = [...section];
  let currentStack = [];

  while (toProcess.length) {
    const token = toProcess.shift();
    if (Number.isInteger(token)) {
      currentStack.push(token);
    } else if (token === '*') {
      if (currentStack.length) toReturn.push(...currentStack);
      currentStack = [];
      toReturn.push(token);
    } else if (Array.isArray(token)) {
      currentStack.push(liftAddition(token));
    } else {
      let next = toProcess.shift();
      if (Array.isArray(next)) next = liftAddition(next);

      if (!currentStack.length) currentStack.push(toReturn.pop());
      toReturn.push([...currentStack, token, next]);
      currentStack = [];
    }
  }

  if (currentStack.length) toReturn.push(...currentStack);

  return toReturn;
}

const wrapper = (input) => {
  const tree = parse(input);
  return liftAddition(tree);
}

module.exports = wrapper;
