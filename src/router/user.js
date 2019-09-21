const {
  SuccessModel,
  ErrorModel
} = require("../model/resModel");

const {
  login
} = require("../controller/user");

const handleUserRouter = (req, res) => {
  const method = req.method;


  // todo 登录 
  if (method === "GET" && req.path === "/api/user/login") {
    // const {
    //   username,
    //   password
    // } = req.body;
    const {
      username,
      password
    } = req.query;

    return login(username, password).then(data => {

      if (data.username) {
        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;

        return new SuccessModel(data)
      }
      return new ErrorModel("登录失败")
    })
  }

  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.session) {
      return Promise.resolve(new SuccessModel({
        session: req.session
      }))
    }
    return Promise.resolve(new ErrorModel("登录失败"))
  }

}

module.exports = handleUserRouter;