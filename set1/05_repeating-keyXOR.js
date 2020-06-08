const assert = require('assert').strict;

const encrypt = (str, key = 'ICE') => {
  const strBuf = Buffer.from(str);
  const keyBuf = Buffer.from(key);
  const keySize = keyBuf.length;
  let kIndex = 0;

  const xorArray = [];

  for (let b of strBuf.values()) {
    // Reset key index if it overflows key size
    if (kIndex >= keySize) {
      kIndex = 0;
    }

    xorArray.push(b ^ keyBuf[kIndex]);
    kIndex++;
  }

  return Buffer.from(xorArray).toString('hex');
};

const msg1 = `Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal`;

// const res1 = encrypt(msg1);
// console.log(res1);
// assert.strictEqual(res1, '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f');

// console.log(encrypt('felipefss@gmail.com'))

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./signature.sig'),
  crlfDelay: Infinity
});

let fileContents = '';

rl.on('line', line => {
  fileContents += line;
});

rl.on('close', () => {
  console.log(encrypt(fileContents));
});