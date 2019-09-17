const mysql = require("mysql");
const {
  MYSQL_CONF
} = require("../conf/db");

const conn = mysql.createConnection(MYSQL_CONF);

conn.connect();

const exec = (sql) => new Promise((resolve, reject) => {
  conn.query(sql, (err, data) => {

    if (err) {
      reject(err);
      return;
    }
    resolve(data);
    // conn.end();
  })
})

module.exports = {
  exec
}