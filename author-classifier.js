const brain = require('brain.js');
const trainingData = require('./data/author-classifier.js');

let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
};

function execute(input) {
    let results = trainedNet(encode(input));
    console.log(results)
    let output;
    let certainty;
    if (results.trump > results.kardashian) {
        output = 'Donald Trump'
        certainty = Math.floor(results.trump * 100)
    } else { 
        output = 'Kim Kardashian'
        certainty = Math.floor(results.kardashian * 100)
    }

    return "I'm " + certainty + "% sure that tweet was written by " + output;
}

train(trainingData);

// A tweet from Kim Kardashian:
console.log(execute("These aren't real. Kanye would never write Yeezy on the side"));

// A Trump tweet:
console.log(execute("Whether we are Republican or Democrat, we must now focus on strengthening Background Checks!"));
