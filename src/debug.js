const { loadFile } = require("./decode");
module.exports.init = () => {
  const argv = require("optimist")
    .usage("Usage: node ./index.js -f [./pdf/文件路径]")
    .demand(["f"]).argv;
  const filename = argv.f || argv.file || "test.pdf";

  loadFile(filename);
};
