const chokidar = require("chokidar");
const { loadFile, now } = require("./decode");
const fs = require("fs");
const cwd = "./pdf";
const log = console.log.bind(console);
log(now() + " 文件监听已启动...");

const cacheFile = cwd + "/list.json";
let arr = [];
try {
  let buffer = fs.readFileSync(cacheFile);
  arr = JSON.parse(buffer.toString());
} catch (e) {}

const watcher = chokidar.watch(".", {
  ignored: /.json$/,
  cwd,
  // ignoreInitial: true, // 应用启动时，已有的历史文件不再继续处理
});

watcher.on("add", (filename) => {
  if (!arr.includes(filename)) {
    log(`${now()} 新增文件：${filename}`);
    arr.push(filename);
    loadFile("./pdf/" + filename);
    fs.writeFileSync(cacheFile, JSON.stringify(arr));
  }
});
