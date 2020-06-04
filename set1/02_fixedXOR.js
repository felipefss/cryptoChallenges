const assert = require('assert').strict;

const xor = (str1, str2) => {
  if (str1.length !== str2.length) {
    throw new Error('Both strings should have the same length');
  }

  const buf1 = Buffer.from(str1, 'hex');
  const buf2 = Buffer.from(str2, 'hex');
  const xorArray = [];

  for (let i = 0; i < buf1.length; i++) {
    xorArray.push(buf1[i] ^ buf2[i]);
  }

  const bufRes = Buffer.from(xorArray);

  return bufRes.toString('hex');
};

const fXor = xor('1c0111001f010100061a024b53535009181c', '686974207468652062756c6c277320657965');
assert.strictEqual(fXor, '746865206b696420646f6e277420706c6179');
// console.log(fXor);
/**
 * 1c0111001f010100061a024b53535009181c
 * XOR
 * 686974207468652062756c6c277320657965
 * should equal
 * 746865206b696420646f6e277420706c6179
 */