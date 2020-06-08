const addScore = (obj, x) => {
  obj[x] = !obj[x] ? 1 : obj[x] + 1;
};

const findMaxScore = score => {
  const scObj = {
    max: -1,
    key: ''
  };

  for (let c in score) {
    if (score[c] > scObj.max) {
      scObj.max = score[c];
      scObj.key = c;
    }
  }

  return scObj.key;
};

const decrypt = (str) => {
  //etaoin shrdlu
  const score = {};

  const buf = Buffer.from(str, 'hex');
  const bufStr = buf.toString();

  for (let c of bufStr) {
    addScore(score, c);
  }

  const key = findMaxScore(score);
  const keyBuf = Buffer.from(key);
  const xorArray = [];

  for (let b of buf.values()) {
    xorArray.push(b ^ keyBuf[0]);
  }

  return Buffer.from(xorArray).toString()
};

const res = decrypt('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');
console.log(res)

//1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736

module.exports = decrypt;
