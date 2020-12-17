const input = require('./input');

const validTickets = input.tickets.filter(ticket => {
  const invalidValues = [];
  ticket.forEach(value => {
    const valid = input.rules.reduce((validForAny, { test }) => {
      if (validForAny) return validForAny;
      return test(value);
    }, false);

    if (!valid) invalidValues.push(value);
  });
  return invalidValues.length === 0;
});


// <name> : <index in ticket>
const knownFields = {

};

const fieldsToSolve = Array.from(input.yourTicket.keys());
let idx = 0;

while (fieldsToSolve.length) {
  let solving = fieldsToSolve[idx];
  console.info(fieldsToSolve, 'solving', solving);
  let rules = input.rules.filter(rule => !knownFields.hasOwnProperty(rule.name));

  rules = rules.filter(rule => rule.test(input.yourTicket[solving]));
  rules = rules.filter(rule => {
    return validTickets.reduce((acc, ticket) => {
      if (!acc) return acc;
      return rule.test(ticket[solving]);
    }, true);
  });

  if (rules.length === 0) throw new Error('Have ended up with no applicable rules');
  if (rules.length > 1) {
    idx++;
    if (idx >= fieldsToSolve.length) idx = 0;
    continue;
  }

  const rule = rules[0];
  knownFields[rule.name] = solving;
  fieldsToSolve.splice(idx, 1);
  idx = 0;
}

console.info(Object
  .keys(knownFields)
  .filter(key => key.startsWith('departure'))
  .reduce((acc, key) => acc * input.yourTicket[knownFields[key]], 1)
);
