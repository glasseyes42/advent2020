const operators = ['+', '*'];

const tokeniseSection = (section) => {
  const toReturn = [];
  let currentStack = [];
  const toProcess = [...section];

  while (toProcess.length) {
    const currentChar = toProcess.shift();

    if (operators.indexOf(currentChar) > -1) {
      if (currentStack.length) toReturn.push(currentStack);
      toReturn.push(currentChar);
      currentStack = [];
    } else if (currentChar.match(/\d/)) {
      currentStack.push(currentChar);
    } else if (currentChar === '(') {
      let opens = 1;
      let closes = 0;

      const subSectionStack = [];
      while ((opens > closes) && toProcess.length) {
        const subChar = toProcess.shift();
        if (subChar === '(') {
          opens++;
          subSectionStack.push(subChar);
        } else if (subChar === ')') {
          closes++;
          if (opens !== closes) subSectionStack.push(subChar);
        } else {
          subSectionStack.push(subChar);
        }
      }

      toReturn.push(['(', ...tokeniseSection(subSectionStack), ')']);
    }
  }

  if (currentStack.length) toReturn.push(currentStack)

  return toReturn;
};

module.exports = tokeniseSection;
