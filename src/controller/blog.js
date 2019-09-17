const {
  exec
} = require("../db/mysql");

const getBlogList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;

  if (author) {
    sql += `and author = ${author} `;
  }

  if (keyword) {
    sql += `and title like '%${keyword}%' or content like '%${keyword}%' `;
  }

  sql += `order by createtime desc;`

  return exec(sql);
}

const getBlogDetail = (id) => {
  console.log(id);

  return {
    id: "3",
    author: "wang wu",
    createTime: "1567926652422",
    title: "标题3",
    content: "内容3"
  }
}

const newBlog = (data) => {
  console.log(data);

  return {
    id: 7
  }
}

const updateBlog = (data, id) => {
  console.log(data, id);

  return true
}

const delBlog = (id) => {
  console.log(id);

  return true
}

module.exports = {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  delBlog
}