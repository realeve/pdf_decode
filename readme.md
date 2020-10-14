# pdf decode

解析切选封PDF文件

# 用法

## 解析1个文件
node ./index.js -f ./pdf/test.pdf

## 监听pdf目录下文件变化，有新文件时解析内容

npm run watch

# 打包
npm run pkg

## 打包完毕后运行 

1. 监听：.\dist\pdf start

1. 监听：.\dist\pdf start --cache list.json -d ./pdf

1. 监听：.\dist\pdf start --cache list.json -dir ./pdf

2. 解析文件：.\dist\pdf file -f ./pdf/test.pdf

3. 查看使用帮助： .\dist\pdf start -h