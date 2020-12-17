const program = require('./program');

let mask = '';
let memory = {};

const getVarieties = (input) => {
  const index = input.indexOf('X');
  if (index === -1) return [input];

  const zero = [...input], one = [...input];
  zero.splice(index, 1, 0);
  one.splice(index, 1, 1);

  return getVarieties(zero).concat(getVarieties(one));
}

program.forEach(entry => {
  if (entry.type === 'mask') {
    ({ mask } = entry);
  } else {
    const addr = (entry.destination >>> 0).toString(2).split('').map(Number).reverse();
    const firstPass = mask.split('').reverse().reduce((acc, bit, index) => {
      if (bit === 'X') acc.push(bit);
      else acc.push(Number(bit) || (addr[index] ? addr[index] : 0));

      return acc;
    }, []);

    const addresses = getVarieties(firstPass.reverse()).map(address => parseInt(address.join(''), 2));
    addresses.forEach((a) => memory[a] = entry.value);
  }
});

console.info(Object.keys(memory).reduce((acc, key) => acc + memory[key], 0));
