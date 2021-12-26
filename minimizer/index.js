var fs = require('fs');
const { JSDOM } = require("jsdom");
const { minimize } = require('./minimizer');

// Load file
var input = 'example.html';
var buffer = fs.readFileSync(input);
var dom = new JSDOM(buffer, {contentType: 'text/html'});

// Minimize
var output = minimize(dom.window.document);

// Display output
//console.log(JSON.stringify(output));

// pretty printing
fs.writeFileSync('output.json', JSON.stringify(output, null, 2));

// minimal
//fs.writeFileSync('output.json', JSON.stringify(output));