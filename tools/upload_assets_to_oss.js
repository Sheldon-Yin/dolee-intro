// One-shot: 落地页图片上传 OSS（走现有 cdn.qiongren.online CDN），前缀 dolee/intro/assets/
const fs = require('fs');
const path = require('path');

(async () => {
  const OSS = require('/root/zwb-egg/node_modules/ali-oss');
  const src = fs.readFileSync('/root/zwb-egg/config/config.default.js', 'utf8');
  const pick = (k) => (src.match(new RegExp(k + ":\\s*'([^']+)'")) || [])[1];
  const store = new OSS({
    region: pick('region'),
    accessKeyId: pick('accessKeyId'),
    accessKeySecret: pick('accessKeySecret'),
    bucket: pick('bucket'),
  });

  const dir = '/var/www/dolee/intro/assets';
  const files = fs.readdirSync(dir).filter(f => /\.(jpg|png)$/.test(f));
  for (const f of files) {
    const key = 'dolee/intro/assets/' + f;
    await store.put(key, path.join(dir, f));
    console.log('OK', key, fs.statSync(path.join(dir, f)).size, 'bytes');
  }
  console.log('done', files.length, 'files');
})().catch(e => { console.error('FAIL:', e.message); process.exit(1); });
