const {
  getBlogList,
  getBlogDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const {
  SuccessModel,
  ErrorModel
} = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const method = req.method;

  const {
    author,
    keyword,
    id
  } = req.query;

  if (method === "GET" && req.path === "/api/blog/list") {
    return getBlogList(author, keyword)
      .then(res => new SuccessModel(res))
      .catch(err => new ErrorModel(err));
  }
  if (method === "GET" && req.path === "/api/blog/detail") {
    return new SuccessModel(getBlogDetail(id))
  }
  if (method === "POST" && req.path === "/api/blog/new") {
    return new SuccessModel(newBlog(req.body))
  }
  if (method === "POST" && req.path === "/api/blog/update") {
    const update = updateBlog(req.body, id);
    return update ? new SuccessModel("更新成功") : new ErrorModel("更新失败")
  }
  if (method === "POST" && req.path === "/api/blog/del") {
    const update = delBlog(id);
    return update ? new SuccessModel("删除成功") : new ErrorModel("删除失败")
  }
}

module.exports = handleBlogRouter;