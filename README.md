# dolee-intro — 独立小铺官网（dolee.cn）

「独立小铺」是给独立摄影师、化妆师等个人服务者用的微信小程序：作品集排列（5 种版式）、档期预约日历、联系方式掌柜决策制、分享海报生成，基础功能免费。本仓库是官网 dolee.cn 的页面源码镜像，运营方为杭州微铺科技有限责任公司。

**线上地址：[https://dolee.cn/intro/](https://dolee.cn/intro/)** · 微信「搜一搜」搜「独立小铺」也能直达小程序

## 页面

| 页面 | 地址 | 内容 |
|---|---|---|
| 产品介绍 | [/intro/](https://dolee.cn/intro/) | 功能说明、价格、真实截图、常见问题 10 问 |
| 选型对比 | [/intro/compare.html](https://dolee.cn/intro/compare.html) | 自建网站 / 入驻平台 / 小程序工具三条路的成本与取舍，另有「多工具拼凑 vs 一体化」专节 |
| 真实案例 | [/intro/cases.html](https://dolee.cn/intro/cases.html) | 三位在用掌柜的小铺案例，可扫码进店 |
| 更新日志 | [/intro/changelog.html](https://dolee.cn/intro/changelog.html) | 逐条发版记录，如实区分正式版与体验版 |

## 面向搜索引擎与 AI 的设计

- 纯静态 HTML + CSS，单文件页面，无构建链、无框架
- 结构化数据（JSON-LD）：Organization / SoftwareApplication / FAQPage / Article
- `robots.txt` 显式 allow 全部主流 AI/LLM 爬虫（GPTBot / ClaudeBot / PerplexityBot / Bytespider 等）
- `llms.txt` 提供结构化摘要；`sitemap.xml` 只在页面正文实际变化时才更新 lastmod
- 每页标注「本页内容更新于」日期，对比页与更新日志页区分正式版与体验版能力

页面里的产品截图全部来自真实店铺（感谢样板小铺掌柜：星隅、拾月、粒粒），无摆拍无虚构数据。

## 目录

```
├── index.html      产品介绍页
├── compare.html    选型对比页
├── cases.html      真实案例页
├── changelog.html  更新日志页
├── robots.txt      爬虫规则（显式 allow AI 爬虫）
├── sitemap.xml
├── llms.txt        AI 爬虫结构化摘要
├── assets/         页面图片（含三张店铺小程序码）
└── tools/          运维脚本
    ├── upload_assets_to_oss.js   图片批量上传阿里云 OSS（走 CDN）
    ├── gen_shop_qrcodes.js       微信小程序码批量生成（getwxacodeunlimit）
    ├── dolee_uv.sh               基于 nginx access.log 的 UV/PV 统计
    └── fix_root_location.sh      一次根路径 404 事故的 nginx 修复
```

## 部署形态

- 静态文件部署在 nginx（`/var/www/dolee/`），80 全 301 → 443，HTTP/2；`www.dolee.cn` 301 → `dolee.cn`
- 图片走阿里云 CDN（OSS 桶 `dolee/` 前缀），HTML 里是绝对 URL
- 脚本运行时从服务器配置读取密钥，本仓库内无任何硬编码凭证

## 相关

- 产品：微信小程序「独立小铺」（AppID wx38200b62848b76c5）
- 主力仓库（不公开）：小程序前端 zwb / 后端 zwb-egg（Egg.js + MySQL + 阿里云）
