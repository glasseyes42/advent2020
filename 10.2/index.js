const adapters = require('./adapters');

const sorted = adapters.sort((a, b) => a - b);

const jumps = [0, ...sorted, sorted[sorted.length - 1] + 3];

const routes = [];
const cache = [];

jumps.forEach((adapter, index) => {
  const availableRoutes = jumps.slice(index + 1).filter(val => {
    return val - adapter <= 3;
  }).forEach((route, routeIndex) => {
    if (routes[index]) {
      routes[index].push(index + (routeIndex + 1));
    } else {
      routes[index] = [index + (routeIndex + 1)];
    }
  });
});

const endIndex = routes[routes.length - 1];
const count = (base) => {
  if (base === endIndex) return 1;
  if (cache[base]) return cache[base];

  if (!routes[base]) return 1;
  const result = routes[base]
    .map((childIndex) => count(childIndex))
    .reduce((acc, val) => acc + val);

  cache[base] = result;
  return result;
}

console.info(count(0));
