const {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;

  const { author, keyword, id } = req.query;

  if (method === "GET" && req.path === "/api/blog/list") {
    return getBlogList(author, keyword)
      .then(res => new SuccessModel(res))
      .catch(err => new ErrorModel(err));
  }
  if (method === "GET" && req.path === "/api/blog/detail") {
    return getBlogDetail(id)
      .then(res => new SuccessModel(res))
      .catch(err => new ErrorModel(err));
  }
  if (method === "POST" && req.path === "/api/blog/new") {
    req.body.author = "zhangsan"; // todo

    return newBlog(req.body)
      .then(res => new SuccessModel(res))
      .catch(err => new ErrorModel(err));
  }
  if (method === "POST" && req.path === "/api/blog/update") {
    return updateBlog(req.body, id)
      .then(val =>
        val ? new SuccessModel("更新成功") : new ErrorModel("更新失败")
      )
      .catch(err => new ErrorModel(err));
  }
  if (method === "POST" && req.path === "/api/blog/del") {
    const author = "zhangsan"; // todo
    // 删除增加作者时，为了让删除更加安全，只有在本作者的前提下，才能删除
    return delBlog(id, author)
      .then(val =>
        val ? new SuccessModel("删除成功") : new ErrorModel("删除失败")
      )
      .catch(err => new ErrorModel(err));
  }
};

module.exports = handleBlogRouter;
