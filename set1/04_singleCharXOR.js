const fs = require('fs');
const readline = require('readline');
const singleByteXOR = require('./03_singleByteXOR');

const rl = readline.createInterface({
  input: fs.createReadStream('./4.txt'),
  crlfDelay: Infinity
});

let lineNumber = 1;

rl.on('line', line => {
  console.log(`${lineNumber++} - ${singleByteXOR(line)}`);
});
