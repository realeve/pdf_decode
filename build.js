const BEFORE = "before";
const AFTER = "after";

handleModuleSharp(BEFORE, cwd);
await runCmd(cwd, "pkg . --targets node12-linux-x64");
handleModuleSharp(AFTER, cwd);

function handleModuleSharp(arg: string, cwd: string) {
  const pkgName = path.join(cwd, "package.json");
  const pkgInfo = fse.readJSONSync(pkgName);
  if (!pkgInfo.dependencies.sharp) return;

  const moduleSharpDir = path.join(cwd, "node_modules/sharp");
  const keyStr = {
    raw: "require('../build/Release/sharp.node')",
    replaced:
      "require(require('path').join(process.cwd(), 'sharp/build/Release/sharp.node'))",
  };
  const targetDir = path.join(moduleSharpDir, "lib");
  fse.readdirSync(targetDir).forEach((filename) => {
    if (!filename.endsWith(".js")) return;
    const filepath = path.join(targetDir, filename);
    let content = fse.readFileSync(filepath, { encoding: "utf8" });
    if (arg === BEFORE) content = content.replace(keyStr.raw, keyStr.replaced);
    else if (arg === AFTER)
      content = content.replace(keyStr.replaced, keyStr.raw);
    fse.writeFileSync(filepath, content);
  });
  if (arg === AFTER) {
    fse.copySync(
      path.join(moduleSharpDir, "build"),
      path.join(cwd, "sharp/build"),
      { recursive: true }
    );
    fse.copySync(
      path.join(moduleSharpDir, "vendor"),
      path.join(cwd, "sharp/vendor"),
      { recursive: true }
    );
  }
}
