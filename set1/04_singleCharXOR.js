const fs = require('fs');
const readline = require('readline');
const { decrypt, isEnglish } = require('./03_singleByteXOR');

const rl = readline.createInterface({
  input: fs.createReadStream('./4.txt'),
  crlfDelay: Infinity
});

let lineNumber = 1;

rl.on('line', line => {
  const decrypted = decrypt(line);
  lineNumber++;
  if (isEnglish(decrypted)) {
    console.log(line)
    console.log(`${lineNumber} - ${decrypted}`);
    return;
  }
});

/**
 * Answer:
 * 7b5a4215415d544115415d5015455447414c155c46155f4058455c5b523f
 * 172 - nOW THAT THE PARTY IS JUMPING*
 */
