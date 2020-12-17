const input = require('./input');

const invalidValues = [];

input.tickets.forEach(ticket => {
  ticket.forEach(value => {
    const valid = input.rules.reduce((validForAny, test) => {
      if (validForAny) return validForAny;
      return test(value);
    }, false);

    if (!valid) invalidValues.push(value);
  });
});

console.info(invalidValues);
console.info(invalidValues.reduce((acc, val) => acc + val, 0));
