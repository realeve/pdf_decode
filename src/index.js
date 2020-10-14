const watch = require("./watch");
const { loadFile } = require("./decode");
const useage = `用法:
pdf file -f [文件路径]
pdf -d [监听目录] -c [缓存文件]
pdf --dir [监听目录 默认为pdf ] --cache [缓存文件，默认为list.json]

[查看帮助]
pdf -h`;

const argv = require("optimist")
  .usage(useage)
  .default({
    d: "./pdf",
    c: "list.json",
  })
  .alias("d", "dir")
  .alias("c", "cache")
  .alias("h", "help")
  .describe("d", "默认的监听目录").argv;

if (argv.h) {
  console.log(useage);
  return;
}
 
let method = argv._[0] || "watch";
if (method === "watch") {
  let cwd = argv.dir;
  let cache = argv.cache;
  watch.init(cwd, cache);
} else if (method === "file") {
  const filename = argv.f || argv.file;
  loadFile(filename);
}
