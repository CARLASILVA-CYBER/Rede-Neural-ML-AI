const brain = require('brain.js');
const net1 = new brain.NeuralNetwork();
const data = [
  { input: [0, 0], output: [0] },
  { input: [0, 1], output: [1] },
  { input: [1, 0], output: [1] },
  { input: [1, 1], output: [0] }
];

net1.train(data, {
  log: true,
  done: function(status) {
    const output00 = parseFloat(net1.run([0, 0])).toFixed(0);
    const output01 = parseFloat(net1.run([0, 1])).toFixed(0);
    const output10 = parseFloat(net1.run([1, 0])).toFixed(0);
    const output11 = parseFloat(net1.run([1, 1])).toFixed(0);
    console.log(`0 xor 0: ${output00}`);
    console.log(`0 xor 1: ${output01}`);
    console.log(`1 xor 0: ${output10}`);
    console.log(`1 xor 1: ${output11}`);
  }
});
