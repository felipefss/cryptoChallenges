const addFrequency = (obj, letter) => {
  const x = letter.toLowerCase();
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
  const frequency = {};

  const buf = Buffer.from(str, 'hex');
  const bufStr = buf.toString();

  for (let c of bufStr) {
    addFrequency(frequency, c);
  }

  const key = findMaxScore(frequency);
  const keyBuf = Buffer.from(key);
  const xorArray = [];

  for (let b of buf.values()) {
    xorArray.push(b ^ keyBuf[0]);
  }

  return Buffer.from(xorArray).toString();
};

const isEnglish = (msg) => {
  const ETAOIN = 'etaoin';
  let score = 0;
  const frequency = {};
  
  for (let c of msg) {
    addFrequency(frequency, c);
  }
  
  //invert freq with letters in obj
  const freqToChar = [];
  for (let c in frequency) {
    if (!c.match(/[a-zA-Z]/)) {
      continue;
    }
    const prop = frequency[c];
    freqToChar[prop] = c;
  }
  


  for (let c of ETAOIN) {
    if (frequency[c]) {
      score++;
    }
  }

  return score >= 5;
};

// const res = decrypt('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');
// console.log(res)
// console.log(isEnglish(res));

//1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736

module.exports = {
  decrypt,
  isEnglish
};
