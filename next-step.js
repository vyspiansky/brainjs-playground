const brain = require('brain.js');

const net = new brain.recurrent.LSTMTimeStep();

net.train([ // Fibonacci numbers
  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
]);

const output1 = net.run([0, 1, 1, 2, 3, 5, 8]);  
console.log(output1);

// Outputs:
// 12.872400283813477
// 12.939254760742188

const output2 = net.run([0, 1, 1, 2, 3, 5, 8, 13]);  
console.log(output2);

// Outputs:
// 21.130144119262695
// 20.97310447692871