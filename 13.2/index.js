const timetable = require('./timetable');


const solve = (buses) => {
  const sorted = buses.sort((a, b) => a.bus - b.bus).filter(b => b.bus !== 0);

  let found = false;
  let multiplier = 1;

  while (!found) {
    const time = sorted[sorted.length - 1].bus * multiplier;

    found = sorted.reduce((acc, bus) => {
      if (!acc) return acc;
      
      return (time - (buses.length - 1 - bus.offset)) % bus.bus === 0;
    }, true);

    if (found) {
      console.info(time, time - (buses.length - 1));
    }

    if (multiplier % 10000000 === 0) {
      console.info(`multiplier: ${multiplier}, time: ${time}`);
    }

    multiplier++;
  }
};


solve(timetable.buses.map((b, index) => ({
  bus: b,
  offset: index,
})));
