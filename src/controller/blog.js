const { exec } = require("../db/mysql");

const getBlogList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;

  if (author) {
    sql += `and author = ${author} `;
  }

  if (keyword) {
    sql += `and title like '%${keyword}%' or content like '%${keyword}%' `;
  }

  sql += `order by createtime desc;`;

  return exec(sql);
};

const getBlogDetail = id => {
  const sql = `
    select * from blogs where id = '${id}';
  `;
  return exec(sql).then(raws => raws[0]);
};

const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData;
  const createtime = Date.now();

  const sql = `
    insert into blogs (title, content, author, createtime) values
    ('${title}', '${content}', '${author}', ${createtime});
  `;

  return exec(sql).then(insertData => ({
    id: insertData.insertId
  }));
};

const updateBlog = (blogData = {}, id) => {
  const { title, content } = blogData;
  // 删除增加作者时，为了让删除更加安全，只有在本作者的前提下，才能删除
  const sql = `
    update blogs set title = '${title}', content = '${content}' where id = '${id}';
  `;
  return exec(sql).then(updateData =>
    updateData.affectedRows > 0 ? true : false
  );
};

const delBlog = (id, author) => {
  const sql = `
    delete from blogs where id = '${id}' and author = '${author}';
  `;
  return exec(sql).then(delData => (delData.affectedRows > 0 ? true : false));
};

module.exports = {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  delBlog
};
