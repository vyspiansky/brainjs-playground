const brain = require('brain.js');

const trainingData = [
    // Positive feelings and emotions
    { input: 'She is so happy to see you!', output: 'positive' },
    { input: 'Her food is really good.', output: 'positive' },
    { input: 'He is happy you are among us.', output: 'positive' },
    { input: 'I am super happy!', output: 'positive' },
    { input: 'You seem pretty happy.', output: 'positive' },
    { input: 'Maybe he was happy to get rid of her.', output: 'positive' },
    { input: 'I have a good feeling about this.', output: 'positive' },
    { input: 'This is a lot of fun.', output: 'positive' },

    // Negative feelings and emotions
    { input: 'He was unhappy about something.', output: 'negative' },
    { input: 'That sounds like a bad idea.', output: 'negative' },
    { input: 'I am super unhappy!', output: 'negative' },
    { input: 'Yes, yes, he is unhappy!', output: 'negative' },
    { input: 'She was very unhappy with their decision.', output: 'negative' },
    { input: 'She makes him so unhappy.', output: 'negative' },
    { input: 'I feel bad for you.', output: 'negative' },
    { input: 'Her mother lives with depression.', output: 'negative' }
];

const net = new brain.recurrent.LSTM(); // Long Short Term Memory
net.train(trainingData, {
    log: true,
    logPeriod: 100,
    iterations: 1000
});

console.log(net.run('I am unhappy!')); // negative
console.log(net.run('I am happy!'));   // positive