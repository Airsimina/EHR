// 正则路径校验

const path = require("path");
const glob = require("glob");

// 获取
const getEntry = function() {
  let globPath = "src/pages/*/index.js";
  var fileArr = glob.sync(globPath);
  // 遍历文件夹
  let entries = [];
  fileArr.forEach((item, index) => {
    entries.push(item.split("/")[2]);
  });
  return entries;
};

const addEntry = function() {
  let entryObj = {};
  getEntry().forEach(item => {
    entryObj[item] = path.resolve(
      __dirname,
      "../src",
      "pages",
      item,
      "index.js"
    );
  });
  return entryObj;
};

module.exports = {
  // 获取文件夹名称
  getEntry: getEntry(),
  // 获取entry的object
  addEntry: addEntry()
};
