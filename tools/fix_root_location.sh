#!/bin/sh
# dolee.cn 根路径修复：try_files 直渲染导致相对路径 assets 解析到 /assets 404，改 301 到 /intro/
sed -i '56,58c\    location = / {\n        return 301 https://$host/intro/;\n    }' /etc/nginx/conf.d/zwb.conf
sed -n '53,60p' /etc/nginx/conf.d/zwb.conf
echo '--- nginx -t ---'
nginx -t 2>&1
