const getPostData = req => new Promise((resolve, reject) => {
  const method = req.method;

  if (method !== "POST") {
    resolve({});
    return;
  }
  if (req.headers["content-type"] !== "application/json") {
    resolve({});
    return;
  }

  let postData = "";

  req.on("data", chunk => {
    postData += chunk.toString()
  })

  req.on("end", () => {
    if (!postData) {
      resolve({});
      return;
    }
    resolve(
      JSON.parse(postData)
    )
  })
})

module.exports = {
  getPostData
}