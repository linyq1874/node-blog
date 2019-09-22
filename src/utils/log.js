const fs = require("fs");
const path = require("path");


const createWriteStream = (fileName) => {
  const fullName = path.join(__dirname, "../", "../", "logs", fileName);

  const writeStream = fs.createWriteStream(fullName, {
    flags: "a"
  });

  return writeStream;
}

const writeLog = (writeStream, log) => {
  writeStream.write(log + "\n");
}

// 写访问日志
const accessWriteStream = createWriteStream("access.log");

const access = (log) => {
  writeLog(accessWriteStream, log);
}

module.exports = {
  access
}