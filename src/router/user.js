const {
  SuccessModel,
  ErrorModel
} = require("../model/resModel");

const {
  loginCheck
} = require("../controller/user");

const handleUserRouter = (req, res) => {
  const method = req.method;
  const {
    username,
    password
  } = req.body;

  if (method === "POST" && req.path === "/api/user/login") {
    const isLoginSuccess = loginCheck(username, password);

    return isLoginSuccess ? new SuccessModel("登录成功") : new ErrorModel("登录失败")
  }

}

module.exports = handleUserRouter;