const init = require('./init');

/*
  Two state process just as always with conway.
  Copy the "last state" and create a new state.
  Save this new state as the "last state" at the end of the cycle calculations.

  Need to solve 3D storage.

  When setting any node active. Create the nodes around it if needed and set accordingly.

*/

let nodes = {};

const locationKey = ({x, y, z}) => ([x, y, z].join(','));

const calculateSurroundingsOf = (x, y, z) => {
  const locations = [];

  for (let dX = x - 1; dX <= x + 1; dX++) {
    for (let dY = y - 1; dY <= y + 1; dY++) {
      for (let dZ = z - 1; dZ <= z + 1; dZ++) {
        if (dX !== x || dY !== y || dZ !== z) locations.push({
          x: dX,
          y: dY,
          z: dZ,
        });
      }
    }
  }

  return locations;
};

const ensureSurroundingsExist = (locations, state) => {
  locations.forEach(location => {
    const key = locationKey(location);
    if (!state[key]) state[key] = new Node(location.x, location.y, location.z, state);
  });
};

const setNodeAs = (x, y, z, state, active) => {
  const key = locationKey({ x, y, z });
  if (!state[key]) state[key] = new Node(x, y, z, state, active);
  else state[key].setActiveValue(active, state);
}

const countActive = () => {
  return Object.keys(nodes).reduce((acc, key) => (acc + (nodes[key].active ? 1 : 0)), 0);
}

class Node {
  constructor(x, y, z, state, active = false) {
    this.active = active;
    this.x = x;
    this.y = y;
    this.z = z;

    this.connections = calculateSurroundingsOf(x, y, z);

    if (active) ensureSurroundingsExist(this.connections, state);
  }

  clone(destination) {
    return new Node(this.x, this.y, this.z, destination, this.active);
  }

  setActiveValue(active, state) {
    this.active = active;
    if (active) ensureSurroundingsExist(this.connections, state);
  }

  checkNewValue(state) {
    const activeNeighbours = this.connections.reduce((acc, location) => {
      const key = locationKey(location);

      return acc + ((state[key] && state[key].active) ? 1 : 0);
    }, 0);

    if (this.active && (activeNeighbours === 2 || activeNeighbours === 3)) {
      return true;
    } else if (!this.active && activeNeighbours === 3) {
      return true
    } else {
      return false;
    }
  }
}

const cloneNodes = () => {
  const newState = {};

  Object.keys(nodes).forEach(key => {
    newState[key] = nodes[key].clone(newState);
  })

  nodes = {};
  return newState;
};




init.forEach((row, rowIndex) => {
  row.forEach((column, colIndex) => {
    setNodeAs(colIndex, rowIndex, 0, nodes, column === '#');
  });
});


const tick = (lastState) => {
  Object.keys(lastState).forEach(key => {
    const nodeOldState = lastState[key];

    nodes[key] = new Node(nodeOldState.x, nodeOldState.y, nodeOldState.z, nodes, nodeOldState.checkNewValue(lastState));
  });
};

let iteration = 0;
while (iteration < 6) {
  const copied = cloneNodes();
  tick(copied);
  iteration++;
}

console.info(countActive());
