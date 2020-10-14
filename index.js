const { loadFile } = require("./decode");
const argv = require("optimist")
  .usage("Usage: node ./index.js -f [./pdf/文件路径]")
  .demand(["f"]).argv;
const filename = argv.f || "test.pdf";

loadFile(filename);
