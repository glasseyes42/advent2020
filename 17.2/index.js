const init = require('./init');

/*
  Two state process just as always with conway.
  Copy the "last state" and create a new state.
  Save this new state as the "last state" at the end of the cycle calculations.

  Need to solve 3D storage.

  When setting any node active. Create the nodes around it if needed and set accordingly.

*/

let nodes = {};

const locationKey = ({x, y, z, w}) => ([x, y, z, w].join(','));

const calculateSurroundingsOf = (x, y, z, w) => {
  const locations = [];

  for (let dX = x - 1; dX <= x + 1; dX++) {
    for (let dY = y - 1; dY <= y + 1; dY++) {
      for (let dZ = z - 1; dZ <= z + 1; dZ++) {
        for (let dW = w - 1; dW <= w + 1; dW++) {
          if (dX !== x || dY !== y || dZ !== z || dW !==w) locations.push({
            x: dX,
            y: dY,
            z: dZ,
            w: dW,
          });
        }
      }
    }
  }

  return locations;
};

const ensureSurroundingsExist = (locations, state) => {
  locations.forEach(location => {
    const key = locationKey(location);
    if (!state[key]) state[key] = new Node(location.x, location.y, location.z, location.w, state);
  });
};

const setNodeAs = (x, y, z, w, state, active) => {
  const key = locationKey({ x, y, z, w });
  if (!state[key]) state[key] = new Node(x, y, z, w, state, active);
  else state[key].setActiveValue(active, state);
}

const countActive = () => {
  return Object.keys(nodes).reduce((acc, key) => (acc + (nodes[key].active ? 1 : 0)), 0);
}

class Node {
  constructor(x, y, z, w, state, active = false) {
    this.active = active;
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;

    this.connections = calculateSurroundingsOf(x, y, z, w);

    if (active) ensureSurroundingsExist(this.connections, state);
  }

  clone(destination) {
    return new Node(this.x, this.y, this.z, this.w, destination, this.active);
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
    setNodeAs(colIndex, rowIndex, 0, 0, nodes, column === '#');
  });
});


const tick = (lastState) => {
  Object.keys(lastState).forEach(key => {
    const nodeOldState = lastState[key];

    nodes[key] = new Node(nodeOldState.x, nodeOldState.y, nodeOldState.z, nodeOldState.w, nodes, nodeOldState.checkNewValue(lastState));
  });
};

let iteration = 0;
while (iteration < 6) {
  const copied = cloneNodes();
  tick(copied);
  iteration++;
}

console.info(countActive());
