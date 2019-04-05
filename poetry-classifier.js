const brain = require('brain.js');
const trainingData = require('./data/poetry-classifier.js');
const MAX_CHAR_CODE = getMaxCharCode(trainingData);

let trainedNet;

function getMaxCharCode(trainingData) {
    let max = 0;

    for (let i = 0; i < trainingData.length; i++) {
        const inputString = trainingData[i]['input'];
        const charCodes = inputString.split('').map(function(item) {
            return item.charCodeAt(0);
        });
        const maxCharCode = Math.max.apply(null, charCodes);

        if (max < maxCharCode) { max = maxCharCode; }
    }

    return max;
}

function encode(arg) {
    // Example: return arg.split('').map(x => (x.charCodeAt(0) / MAX_CHAR_CODE));

    return (arg.substring(0, 80)).split('').map(function (item) {
        const result = (item.charCodeAt(0) / MAX_CHAR_CODE);
        return result;
    });
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
    const results = trainedNet(encode(input));
    console.log(results);

    let output;
    let certainty;

    if (results.lesyaUkrainka > results.tarasShevchenko) {
        output = 'Lesya Ukrainka'
        certainty = Math.floor(results.lesyaUkrainka * 100)
    } else { 
        output = 'Taras Shevchenko'
        certainty = Math.floor(results.tarasShevchenko * 100)
    }

    return "I'm " + certainty + "% sure that poetry was written by " + output;
}

train(trainingData);

// Taras Shevchenko's poetry:
const tsLines = "Садок вишневий коло хати, Хрущі над вишнями гудуть. Плугатарі з плугами йдуть, Співають, ідучи, дівчата, А матері вечерять ждуть.";
console.log(execute(tsLines));

// Lesya Ukrainka's poetry:
const luLines = "Скрізь, де не гляну, сухі тумани розляглися, поле і гай у серпанки тонкі повилися, марево біле покрило і річку, й сагу, вітер з полудня несе без кінця ту югу.";
console.log(execute(luLines));
