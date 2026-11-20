// One-shot: 为两位样板会员店铺生成小程序码（dolee.cn 落地页「真实小铺」区）
// scene 带 from=geo 归因位（前端暂不解析，先占位）；env_version=release 走正式版
const fs = require('fs');

const shops = [
  { uid: 90, out: 'qr_xingyu.jpg' },
  { uid: 140, out: 'qr_shiyue.jpg' },
  { uid: 214057, out: 'qr_lili.jpg' },
];

(async () => {
  const axios = (await import('/root/zwb-egg/node_modules/axios/index.js')).default;
  const src = fs.readFileSync('/root/zwb-egg/config/config.default.js', 'utf8');
  const appId = (src.match(/appId:\s*'(wx[0-9a-f]+)'/) || [])[1];
  const appSecret = (src.match(/appSecret:\s*'([0-9a-f]+)'/) || [])[1];
  if (!appId || !appSecret) throw new Error('appId/appSecret not found in config');

  const tok = await axios.post('https://api.weixin.qq.com/cgi-bin/stable_token', {
    grant_type: 'client_credential',
    appid: appId,
    secret: appSecret,
  });
  if (!tok.data || !tok.data.access_token) throw new Error('token fail: ' + JSON.stringify(tok.data));
  const access_token = tok.data.access_token;

  for (const s of shops) {
    const scene = 'user_id=' + s.uid + '&from=geo';
    const res = await axios.post(
      'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + access_token,
      { page: 'pages/user/index', scene, env_version: 'release', width: 430, check_path: false },
      { responseType: 'arraybuffer' },
    );
    const buf = Buffer.from(res.data);
    const isJpeg = buf[0] === 0xff && buf[1] === 0xd8;
    const isPng = buf.slice(0, 8).toString() === '\x89PNG\r\n\x1a\n';
    if (!isJpeg && !isPng) {
      throw new Error('[' + s.out + '] not an image, wx said: ' + buf.toString('utf8').slice(0, 300));
    }
    const finalName = isJpeg ? s.out : s.out.replace('.jpg', '.png');
    fs.writeFileSync('/var/www/dolee/intro/assets/' + finalName, buf);
    console.log('OK ' + finalName + ' scene=' + scene + ' bytes=' + buf.length);
  }
})().catch(e => { console.error('FAIL: ' + e.message); process.exit(1); });
