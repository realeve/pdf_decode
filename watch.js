const chokidar = require("chokidar");
const { loadFile, now } = require("./decode");

const log = console.log.bind(console);
log(now() + " 文件监听已启动...");

const watcher = chokidar.watch(".", {
  cwd: "./pdf",
  ignoreInitial: true, // 应用启动时，已有的历史文件不再继续处理
});

watcher.on("add", (filename) => {
  log(`${now()} 新增文件：${filename}`);
  loadFile("./pdf/" + filename);
});
