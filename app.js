const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const querystring = require("querystring");

const {
  getPostData
} = require("./src/utils")

const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");
  const url = req.url;
  const path = url.split("?")[0];
  const query = url.split("?")[1];

  req.path = path;
  req.query = querystring.parse(query);

  getPostData(req).then(postData => {

    req.body = postData;


    // const blogData = handleBlogRouter(req, res);

    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return;
    // }

    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(data => {
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

    const userData = handleUserRouter(req, res);

    if (userData) {
      res.end(
        JSON.stringify(userData)
      )
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