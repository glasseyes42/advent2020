const input = [0,8,15,2,12,1,4];

const memory = {};

let iteration = input.length + 1;
let lastVal = input[input.length -1];

input.forEach((val, index) => {
  if (!memory[val]) {
    memory[val] = [index + 1];
  } if (memory[val].length === 1) {
    memory[val].unshift(index + 1);
  } else {
    memory[val].pop();
    memory[val].unshift(index + 1);
  }
});

while (iteration < 2021) {
  if (memory[lastVal] && memory[lastVal].length == 2) {
    const diff = memory[lastVal][0] - memory[lastVal][1];
    console.info(`${iteration}: ${lastVal} : ${diff}`);

    if (!memory[diff]) {
      memory[diff] = [iteration];
    } if (memory[diff].length === 1) {
      memory[diff].unshift(iteration);
    } else {
      memory[diff].pop();
      memory[diff].unshift(iteration);
    }

    lastVal = diff;
  } else {
    console.info(`${iteration}: ${lastVal} : 0`);

    if (!memory[0]) {
      memory[0] = [iteration];
    } if (memory[0].length === 1) {
      memory[0].unshift(iteration);
    } else {
      memory[0].pop();
      memory[0].unshift(iteration);
    }

    lastVal = 0;
  }

  iteration++;
}

// console.info(memory);
