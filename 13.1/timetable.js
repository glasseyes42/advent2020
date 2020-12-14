module.exports = `
1001798
19,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,859,x,x,x,x,x,x,x,23,x,x,x,x,13,x,x,x,17,x,x,x,x,x,x,x,x,x,x,x,29,x,373,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37
`.trim()
.split('\n')
.reduce((acc, line, index) => {
  if (index === 0) acc.departFrom = parseInt(line, 10);
  acc.buses = line.split(',').filter(entry => entry !== 'x');

  return acc;
}, {});
