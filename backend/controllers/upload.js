import jwt from 'jsonwebtoken'
import { db } from '../db.js'


/**
 * 上传日志
 * @param req 请求头
 * @param url 【文件合法】上传到阿里云OSS的路径/【文件非法】本地文件名
 * @param status 上传是否成功，【true】为成功，【false】反之
 * @param msg 上传失败提示信息
 */
function uploadLog (req, url, status, msg) {
  // let time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  // // 获取id
  // let token = getCookie('token', req.headers.cookie)
  // let result = jwt.verifyToken(token)
  // let id = result.data.user
  // // 获取文件参数
  // let type = req.file.mimetype !== undefined ? req.file.mimetype : ''
  // let size = req.file.size !== undefined ? file_size_deal(req.file.size) : ''
 
  // let conn = mysql.createConnection(dbconfig)
  // conn.query('INSERT INTO upload_log (id, type, size, url, created_time, status, msg, token) VALUES (?,?,?,?,?,?,?,?)', [id, type, size, url, time, status, msg, token], (err, results, fields) => {
  //   if (err) {
  //     console.log('上传日志录入报错：')
  //     console.log(err)
  //   }
  // })
  // conn.end()
}
 
/**
 * 文件大小尺寸处理
 * @param sizes 文件大小
 * @returns {string}
 */
// eslint-disable-next-line camelcase
function file_size_deal (sizes) {
  let size = sizes
  size = (size / 1024 / 1024).toFixed(2)
  if (size < 1) {
    size = (size * 1024).toFixed(2) + 'kb'
  } else if (size >= 1 & size < 1024) {
    size = size + 'MB'
  } else if (size >= 1024) {
    size = (size / 1024).toFixed(2) + 'GB'
  }
  return size
}
 
/**
 * 上传阿里云OSS前守卫，防止恶意多次上传
 * @param req
 * @param callback
 */
function uploadGuard (req, callback) {
  // 获取限制时间段，这里是最近3小时
  // let opentime = moment(Date.now()).subtract(1, 'hours').format('YYYY-MM-DD HH:mm:ss')
 
  let token = req.get('authorization')
  // 如果没有token
  if (!token) {
    callback(JSON.stringify({
      code: 'error',
      msg: 'authorization is required',
      data: null
    }))
  }
  // 验证token
  jwt.verify(token, process.env.APP_JWT_SECRET, (err, data) => {
    // token 验证失败
    if (err) {
      callback(JSON.stringify({
        code: 'error',
        data: err
      }))
    } else {
      callback(JSON.stringify({
        code: 'success',
        data
      }))
    }
  })
}

export default {
  uploadLog,
  file_size_deal,
  uploadGuard
}