
const R = require("ramda");
const { PdfReader } = require("PdfReader");
const loadFile = (filename) => {
  const rows = {};
  new PdfReader().parseFileItems(filename, function (err, item) {
    if (!item) {
      console.log(handleData(rows, filename));
    } else if (item.text) {
      (rows[item.y] = rows[item.y] || []).push(item.text);
    }
  });
};

const moment = require("dayjs");
const now = () => moment().format("YYYY-MM-DD hh:mm:ss");

const handleData = (row, url) => {
  let data = Object.values(row);
  let pileNo = data[2][1];
  let packageTime = data[3][0];
  let teamNo = data[7][4];
  let reel = R.pluck([3], data.slice(7));
  return {
    pileNo,
    packageTime,
    teamNo,
    reel: R.countBy((item) => item)(reel),
    url: url.replace("./", "/"),
    rec_time: now(),
  };
};

module.exports.loadFile = loadFile;
module.exports.now = now;
