const bcrypt = require("bcryptjs") // 密码加盐加密
const { result  } = require("../../result/index");
const { REGEXP_EMAIL } = require("../../config/regexp.js")

const { getOneUserInfo } = require("../../service/user")

const { ERRORCODE, throwError } = require("../../result/index")
const errorCode = ERRORCODE.USER
/**
 * 校验邮箱和密码是否合法
 * @param {*} ctx
 * @param {*} next
 */
const userValidate = async (ctx, next) => {
  const { password, email } = ctx.request.body
  if (!REGEXP_EMAIL.test(email)) {
    return ctx.app.emit("error", throwError(errorCode, "邮箱格式不正确"), ctx)
  }
  // 是否合法
  if (!email || !password) {
    return ctx.app.emit("error", throwError(errorCode, "邮箱或密码为空"), ctx)
  }
  // 合法就进行下一步
  await next()
}
/**
 * 校验邮箱是否已经注册过
 * @param {*} ctx
 * @param {*} next
 */
const verifyUser = async (ctx, next) => {
  const { username, email } = ctx.request.body
  try {
    if (username == 'admin') {
      return ctx.app.emit("error", throwError(errorCode, "admin账号已存在"), ctx)
    }
    const res = await getOneUserInfo({ email })
    if (res) {
      return ctx.body = {
        code: 1,
        msg: "邮箱已注册"
      };
    }
  } catch (err) {
    return ctx.app.emit("error", throwError(errorCode, "用户获取信息错误"), ctx)
  }
  await next()
}
/**
 * 生成加盐的密码
 */
const crpyPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash

  await next()
}

/**
 * 判断用户名和密码匹配
 * @param {*} ctx
 * @param {*} next
 */
const verifyLogin = async (ctx, next) => {
  const { password, email } = ctx.request.body

  try {
    const res = await getOneUserInfo({ email })
    // 用户不存在
    if (!res) {
      // return ctx
      ctx.response.status = 200;
      ctx.response.body = {
        code: 1,
        msg: '用户不存在',
        data: null
      }
      return
    }
    // 密码不匹配
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit("error", throwError(errorCode, "密码不匹配"), ctx)
    }

  } catch (err) {
    return ctx.app.emit("error", throwError(errorCode, "用户校验失败"), ctx)
  }

  await next()
}

const verifyUpdatePassword = async (ctx, next) => {
  try {
    const { username } = ctx.state.user
    if (username !== 'admin') {
      const { password, password1, password2 } = ctx.request.body
      if (password1 != password2) {
        console.error("两次输入密码不一致")
        return ctx.app.emit("error", throwError(errorCode, "两次输入密码不一致"), ctx)
      }
      const res = await getOneUserInfo({ username })
      if (!bcrypt.compareSync(password, res.password)) {
        console.error("密码不匹配")
        return ctx.app.emit("error", throwError(errorCode, "密码不匹配"), ctx)
      }
    } else {
      return ctx.app.emit("error", throwError(errorCode, "admin密码只可以通过配置文件env修改"), ctx)
    }
  } catch (err) {
    console.error(err)
    return ctx.app.emit("error", throwError(errorCode, "修改密码校验失败"), ctx)
  }

  await next()
}

module.exports = {
  userValidate,
  verifyUser,
  crpyPassword,
  verifyLogin,
  verifyUpdatePassword,
}
