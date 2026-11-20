// Anubis PoW 求解：sha256(challenge+nonce) 前 difficulty 位 hex 为 '0'
const fs = require('fs');
const crypto = require('crypto');
const raw = fs.readFileSync(process.argv[2], 'utf8');
const m = raw.match(/challenge" type="application\/json">(.*?)<\/script/s);
const data = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>'));
const { challenge } = data;
const diff = data.rules.difficulty;
const prefix = '0'.repeat(diff);
let nonce = 0, hash = '';
while (true) {
  hash = crypto.createHash('sha256').update(challenge + nonce).digest('hex');
  if (hash.startsWith(prefix)) break;
  nonce++;
}
console.log(JSON.stringify({ nonce, response: hash }));
