var fs = require('fs');
const { JSDOM } = require("jsdom");
const { minimize } = require('./minimizer');

const args = process.argv.slice(2);

// Load file
var input = args[0] ?? 'example.html';
var buffer = fs.readFileSync(input);
var dom = new JSDOM(buffer, {contentType: 'text/html'});

// Minimize
var output = minimize(dom.window.document);

if(args[2] == 'pretty') {
    // pretty printing
    fs.writeFileSync(args[1] ?? 'output.json', JSON.stringify(output, null, 2));
} else {
    // minimal
    fs.writeFileSync(args[1] ?? 'output.json', JSON.stringify(output));
}
