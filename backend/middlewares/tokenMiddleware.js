import jwt from "jsonwebtoken";

const tokenMiddleware = (req, res, next) => {
  let token = req.get('authorization')

  // 如果没有token
  if (!token) {
    return res.json({
      code: 1000,
      msg: 'authorization is required',
      data: null
    })
  }

  // 验证token
  jwt.verify(token, process.env.APP_JWT_SECRET, (err, data) => {
    // token 验证失败
    if (err) {
      return res.json({
        code: 1001,
        msg: 'authorization is error',
        data: null
      })
    }

    // 验证成功，执行next
    req.id = data.id;
    next()
  })
}

export default tokenMiddleware;