const {
  SuccessModel,
  ErrorModel
} = require("../model/resModel");

const {
  login
} = require("../controller/user");

const {
  redis_set,
  redis_get
} = require("../db/redis");

const handleUserRouter = (req, res) => {
  const method = req.method;


  // todo 登录 
  if (method === "POST" && req.path === "/api/user/login") {
    const {
      username,
      password
    } = req.body;

    return login(username, password).then(data => {

      if (data.username) {
        // 设置session
        req.session.username = data.username;
        req.session.realname = data.realname;

        console.log(req.sessionId, req.session);


        redis_set(req.sessionId, req.session)

        redis_get(req.sessionId).then(data => {
          console.log('get....', data);

        })

        return new SuccessModel(data)
      }
      return new ErrorModel("登录失败")
    })
  }

  // if (method === "GET" && req.path === "/api/user/login-test") {
  //   if (req.session) {
  //     return Promise.resolve(new SuccessModel({
  //       session: req.session
  //     }))
  //   }
  //   return Promise.resolve(new ErrorModel("登录失败"))
  // }

}

module.exports = handleUserRouter;