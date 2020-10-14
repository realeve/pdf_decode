# pdf decode

解析切选封PDF文件

# 用法

## 解析1个文件
node start file -f ./pdf/test.pdf

## 监听pdf目录下文件变化，有新文件时解析内容

node start

# 打包
npm run pkg

## 打包完毕后运行 

1. 监听：.\dist\pdf

1. 监听：.\dist\pdf --cache list.json -d ./pdf

1. 监听：.\dist\pdf --cache list.json -dir ./pdf

2. 解析文件：.\dist\pdf file -f ./pdf/test.pdf

3. 查看使用帮助： .\dist\pdf -h


# 编译环境

1.python27
2.NASM:https://www.nasm.us/pub/nasm/releasebuilds/2.15rc9/win64/nasm-2.15rc9-installer-x64.exe 
3.微软VS2015 BUILD TOOLS: https://download.microsoft.com/download/E/E/D/EEDF18A8-4AED-4CE0-BEBE-70A83094FC5A/BuildTools_Full.exe

