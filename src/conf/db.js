const env = process.env.NODE_ENV; // 环境参数

// 配置
let MYSQL_CONF;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "myblog",
    port: 3306
  }
}

if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "myblog",
    port: 3306
  }
}

module.exports = {
  MYSQL_CONF
};