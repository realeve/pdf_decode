const chokidar = require("chokidar");
const { loadFile, now } = require("./decode");
const fs = require("fs");

const log = console.log.bind(console);

module.exports.init = (cwd = "./pdf", cache = "list.json") => {
  log(now() + " 文件监听已启动...");
  const cacheFile = cwd + "/" + cache;
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
      loadFile(cwd + "/" + filename);
      fs.writeFileSync(cacheFile, JSON.stringify(arr));
    }
  });
};
