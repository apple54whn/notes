#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名，因为不是/notes/，所以 base 不需要配置，DNS 解析后，Github 也会解析
echo 'notes.conanan.top' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:apple54whn/apple54whn.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>，此处与 base 配置不是一个意思！！！
git push -f git@github.com:apple54whn/notes.git master:gh-pages

cd -