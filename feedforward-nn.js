const brain = require('brain.js');

const net = new brain.NeuralNetwork();

// a string into a value between 0 and 1
// converting any character into ASCII code called charCodeAt()

net.train([
  {
    input: { r: 0.03, g: 0.7, b: 0.5 },
    output: { black: 1 }
  },{
    input: { r: 0.16, g: 0.09, b: 0.2 },
    output: { black: 1 }
  },{
    input: { r: 0.5, b: 0.5 },
    output: { black: 1 }
  }
]);

const output = net.run({ r: 1, g: 0.4, b: 0 });

console.log(output);