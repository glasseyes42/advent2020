const timetable = require('./timetable');

let found = false;
let checkTime = timetable.departFrom;

while (!found) {
  const match = timetable.buses.reduce((match, bus) => {
    if (match) return match;
    if (checkTime % bus === 0) return bus;

    return false;
  }, false);

  if (match) {
    found = true;
    console.info((checkTime - timetable.departFrom) * match);
  } else {
    checkTime++;
  }
}
