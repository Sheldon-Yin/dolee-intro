#!/bin/sh
# dolee.cn 落地页 UV 统计：按 /intro/ + robots/llms/sitemap 过滤（dolee 独有路径）
LOG=/var/log/nginx/access.log

grep -E '(GET|HEAD) /(intro|robots\.txt|llms\.txt|sitemap\.xml)' "$LOG" > /tmp/dolee_req.log

echo "=== 按天 UV（独立IP） ==="
awk '{d=substr($4,2,11); print d, $1}' /tmp/dolee_req.log | sort -u | awk '{print $1}' | uniq -c

echo ""
echo "=== 按天 PV ==="
awk '{d=substr($4,2,11); print d}' /tmp/dolee_req.log | sort | uniq -c

echo ""
echo "=== Top UA（前12） ==="
awk -F'"' '{print $6}' /tmp/dolee_req.log | sort | uniq -c | sort -rn | head -12

echo ""
echo "=== Top IP（前10） ==="
awk '{print $1}' /tmp/dolee_req.log | sort | uniq -c | sort -rn | head -10

echo ""
echo "=== 状态码分布 ==="
awk '{print $9}' /tmp/dolee_req.log | sort | uniq -c | sort -rn

echo ""
echo "=== 11-20 分时段 ==="
grep '20/Nov/2026' /tmp/dolee_req.log | awk '{print substr($4,14,2)":00"}' | sort | uniq -c
