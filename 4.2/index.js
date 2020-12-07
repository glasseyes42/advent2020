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

const validation = {
  byr: (val) => {
    if (!val.match(/[\d]{4}/)) return false;
    if (val < 1920) return false;
    if (val > 2002) return false;
    return true;
  },
  iyr: (val) => {
    if (!val.match(/[\d]{4}/)) return false;
    if (val < 2010) return false;
    if (val > 2020) return false;
    return true;
  },
  eyr: (val) => {
    if (!val.match(/[\d]{4}/)) return false;
    if (val < 2020) return false;
    if (val > 2030) return false;
    return true;
  },
  hgt: (val) => {
    const match = val.match(/(\d+)(cm|in)/);
    if (!match) return false;
    const [, height, unit] = match;
    if (unit === 'cm' && (height < 150 || height > 193)) return false;
    else if (unit === 'in' && (height < 59 || height > 76)) return false;
    return true;
  },
  hcl: (val) => {
    return !!val.match(/#[abcdef\d]{6}/);
  },
  ecl: (val) => {
    return !!val.match(/amb|blu|brn|gry|grn|hzl|oth/);
  },
  pid: (val) => {
    return !!val.match(/^[\d]{9}$/);
  },
};

const validCount = passports.reduce((acc, p, i) => {
  const exists = requiredFields.reduce((soFar, f) => {
    return soFar && p[f];
  }, true);

  if (!exists) return acc;

  const fieldTests = {};
  requiredFields.forEach((f) => {
    fieldTests[f] = validation[f](p[f]);
  });

  const valid = requiredFields.reduce((soFar, f) => {
    return soFar && fieldTests[f];
  }, true);

  if (!valid) return acc;

  return acc + 1;
}, 0);

console.info(validCount);
