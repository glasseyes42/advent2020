const list = require('./list');
const passports = list.map(text => {
  const lines = text.split('\n');
  return lines.reduce((acc, l) => {
    const data = l.split(/\s+/).forEach(kp => {
      const [key, value] = kp.split(':');

      if (key && value) {
        acc[key] = value;
      }
    });
    return acc;
  }, {});
});

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
];

const validCount = passports.reduce((acc, p) => {
  const valid = requiredFields.reduce((soFar, f) => {
    return soFar && p[f];
  }, true);

  if (valid) return acc + 1;
  return acc;
}, 0);

console.info(validCount);
