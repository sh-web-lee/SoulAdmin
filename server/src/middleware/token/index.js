const jwt = require('jsonwebtoken');
const { ERRORCODE, throwError } = require("../../result/index")
const { JWT_SECRET } = require("../../config/config.default");
const errorCode = ERRORCODE.AUTH;

const tokenMiddleware = (ctx, next) => {
  let token = ctx.get('authorization')

  // 如果没有token
  if (!token) {
    return ctx.app.emit("error", throwError(errorCode, "authorization is required"), ctx)
    // return res.json({
    //   code: 1000,
    //   msg: 'authorization is required',
    //   data: null
    // })
  }

  // 验证token
  jwt.verify(token, JWT_SECRET, async (err, data) => {
    // token 验证失败
    if (err) {
      return ctx.status(200).app.emit("error", throwError(errorCode, "authorization is error"), ctx)
    }

    ctx.request.body.id = data.id;
    // 验证成功，执行next
    await next()
  })
}

module.exports = {
  tokenMiddleware
}