//input: 49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d
//output: SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t
//Always operate on raw bytes, never on encoded strings. Only use hex and base64 for pretty-printing.
// = is used for padding

const assert = require('assert').strict;

const base64Table = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'];

// Separate every 3-Bytes in an array position
const getHexArray = input => {
  const hexArray = [];
  const padBuf = Buffer.from('00', 'hex');
  const hexBuffer = Buffer.from(input, 'hex');
  const size = hexBuffer.length;

  for (let i = 0; i < size; i += 3) {
    const bytesLeft = size - i;
    let buf = hexBuffer.slice(i, i + 3);
    if (bytesLeft < 3) {
      buf = Buffer.concat([buf, Buffer.alloc(3 - bytesLeft, '00', 'hex')]);
    }
    hexArray.push(Buffer.concat([padBuf, buf]));
  }

  return hexArray;
};

const getBase64 = input => {
  const hexArray = getHexArray(input);
  const hexSize = hexArray.length;
  let base64Str = '';

  for (let i = 0; i < hexSize - 1; i++) {
    const bytes = hexArray[i].readInt32BE();

    // Each Base64 digit represents exactly 6 bits of data
    // Three 8-bit bytes (a total of 24 bits) can be represented by four 6-bit Base64 digits.
    // We will read the bits from the most significant to the less significant
    // 6 bits at a time
    const b1 = (bytes >>> 18) & 63;
    const b2 = (bytes >>> 12) & 63;
    const b3 = (bytes >>> 6) & 63;
    const b4 = bytes & 63;

    base64Str += base64Table[b1] + base64Table[b2] + base64Table[b3] + base64Table[b4];
  }

  // Treat the last 3 bytes, in case needs padding
  const lastBuf = hexArray[hexSize - 1];
  const lastBufBytes = lastBuf.readInt32BE();
  const zeroesInd = lastBuf.indexOf(0, 1);
  const zCount = zeroesInd > 0 ? lastBuf.length - zeroesInd : 0;

  const b64Indexes = [];

  switch (zCount) {
    case 0:
      b64Indexes.unshift(lastBufBytes & 63);
    case 1:
      b64Indexes.unshift((lastBufBytes >>> 6) & 63);
    default:
      b64Indexes.unshift((lastBufBytes >>> 12) & 63);
      b64Indexes.unshift((lastBufBytes >>> 18) & 63);
  }

  for (let i of b64Indexes) {
    base64Str += base64Table[i];
  }

  // Fill with necessary padding
  base64Str += '='.repeat(zCount);

  return base64Str;
};

const b64 = getBase64('49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d');
console.log(b64);

const expected = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';
assert.strictEqual(b64, expected);