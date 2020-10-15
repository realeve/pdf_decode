const R = require("ramda");
const { PdfReader } = require("PdfReader");
const db = require("./db/db");

const loadFile = (filename) => {
  const rows = {};
  new PdfReader().parseFileItems(filename, function (err, item) {
    if (!item) {
      let res = handleData(rows, filename);
      console.log("文件解析：", res);
      db.addPaperPackage(res).catch((e) => { 
        console.error("数据写入失败");
      });
    } else if (item.text) {
      (rows[item.y] = rows[item.y] || []).push(item.text);
    }
  });
};

const moment = require("dayjs");
const now = () => moment().format("YYYY-MM-DD hh:mm:ss");

const getProdName = (reel) => "103-G-" + reel.slice(2, 4);

const handleData = (row, url) => {
  let data = Object.values(row);
  let patch_no = data[2][1];
  let package_date = data[3][0];
  let class_name = data[7][4];
  let reel = R.pluck([3], data.slice(7));

  let res = {};

  let reelInfo = R.countBy((item) => item)(reel);
  let id = 0;
  Object.entries(reelInfo).map(([key, value], idx) => {
    id = idx + 1;
    res[`reel_no` + id] = key;
    res[`ream_num` + id] = value;
  });

  for (let i = id + 1; i <= 10; i++) {
    res[`reel_no` + i] = "";
    res[`ream_num` + i] = "";
  }

  return {
    prod_name: getProdName(reel[0]),
    package_date,
    class_name,
    patch_no,
    ream_count: reel.length,
    url: url.replace("./", "/"),
    ...res,
  };
};

module.exports.loadFile = loadFile;
module.exports.now = now;
