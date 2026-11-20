# dolee-intro — 独立小铺产品落地页

「独立小铺」是给独立摄影师、化妆师等个人服务者用的微信小程序：作品集排列（5 种版式）、档期预约日历、联系方式掌柜决策制、分享海报生成，基础功能免费。

**线上地址：[https://dolee.cn/intro/](https://dolee.cn/intro/)** · 微信「搜一搜」搜「独立小铺」也能直达

## 这是什么

一个**零依赖单文件静态落地页**（`index.html`，~34KB），为两类读者而写：

- **搜索引擎**：FAQ×10 + JSON-LD×3（Organization / SoftwareApplication / FAQPage）+ canonical + og 元信息 + sitemap
- **AI 爬虫（GEO）**：`robots.txt` 显式 allow 全部主流 AI/LLM 爬虫（GPTBot / ClaudeBot / PerplexityBot 等），`llms.txt` 提供结构化摘要

页面里的产品截图全部来自真实店铺（感谢样板小铺掌柜：星隅、拾月、粒粒），无摆拍无虚构数据。

## 目录

```
├── index.html      落地页（单文件，无构建无框架）
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

- 静态文件部署在 nginx（`/var/www/dolee/`），80 全 301 → 443，HTTP/2
- 图片走阿里云 CDN（OSS 桶 `dolee/` 前缀），HTML 里是绝对 URL
- 脚本运行时从服务器配置读取密钥，仓库内无任何硬编码凭证

## 相关

- 产品：微信小程序「独立小铺」（AppID wx38200b62848b76c5）
- 主力仓库（不公开）：小程序前端 zwb / 后端 zwb-egg（Egg.js + MySQL + 阿里云）
