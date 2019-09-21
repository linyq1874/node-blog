const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const {
  getPostData,
  getCookieExpires
} = require("./src/utils")



const SESSION_DATA = {};

const serverHandle = (req, res) => {
  // 设置返回JSON 
  res.setHeader("Content-type", "application/json");

  // 解析URL 获取path 和query
  const url = req.url;
  const path = url.split("?")[0];
  const query = url.split("?")[1];

  req.path = path;
  req.query = querystring.parse(query);

  // 解析cookie
  const cookieStr = req.headers.cookie || "";
  req.cookie = {};


  cookieStr.split(";").forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();

    req.cookie[key] = val;
  })

  let needSetCookie = false;

  // 解析session
  let userId = req.cookie.userId;

  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true;
    userId = `uuid_${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {}
  }
  req.session = SESSION_DATA[userId];

  // 记录sessionId
  req.sessionId = 'myName'

  // postData处理
  getPostData(req).then(postData => {

    req.body = postData;

    // 博客路由解析
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(data => {
          if (needSetCookie) {
            /**
             * 操作cookie
             * 跟路由让所有的页面都生效
             * httpOnly 让cookie 只能server端才能操作，无法让客户端来操作，安全
             */
            res.setHeader("Set-Cookie", `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);
          }

          res.end(
            JSON.stringify(data)
          )
        })
        .catch(err => {
          res.end(
            JSON.stringify(err)
          )
        })
      return;
    }

    // 登录路由解析
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(data => {
          if (needSetCookie) {
            /**
             * 操作cookie
             * 跟路由让所有的页面都生效
             * httpOnly 让cookie 只能server端才能操作，无法让客户端来操作，安全
             */
            res.setHeader("Set-Cookie", `userId=${userId};path=/;httpOnly;expires=${getCookieExpires()}`);
          }
          res.end(
            JSON.stringify(data)
          )
        })
        .catch(err => {
          res.end(
            JSON.stringify(err)
          )
        })

      return;
    }

    res.writeHead(404, {
      "Content-type": "text/plain"
    });
    res.write("404 Not Found!");
    res.end();
  })


}

module.exports = serverHandle