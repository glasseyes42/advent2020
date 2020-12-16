module.exports = `
1001798
19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,859,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,373,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37
`.trim()
.split('\n')
.reduce((acc, line, index) => {
  if (index === 0) return acc;
  acc.buses = line.split(',').map(b => {
    if (b === 'x') return 0;
    return parseInt(b, 10);
  });

  return acc;
}, {});
