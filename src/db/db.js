const { axios } = require("./axios");
/**
 *   @database: { 质量信息系统 }
 *   @desc:     { 切选封自动线数据解析写入 }
 */
module.exports.addPaperPackage = (params) =>
  axios({
    url: "/1179/b958c5f512.json",
    params,
  }).then((res) => {
    console.log(
      res.data[0].affected_rows > 0 ? "数据写入成功" : "数据写入失败"
    );
  });
