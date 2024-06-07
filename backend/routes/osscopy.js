import  fs from 'fs'
import multer from 'multer'
import express from 'express'
import moment from 'moment'
import user from '../controllers/upload.js'
import OSS from 'ali-oss'
import Config from '../config/config.js'

const router = express.Router();

 
const uploadLength = 30 // 1小时内上传限制次数

const client = new OSS({
  // yourregion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-chengdu',
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: Config.OSSConfig.OSSAccessKey,
  accessKeySecret: Config.OSSConfig.OSSAccessSecret,
  // 填写Bucket名称。
  bucket: Config.OSSConfig.OSSBucket
});
 
/**
 * 后端upload上传文件阿里云OSS
 */
router.post('/upload', uploadFile, (req, res) => {
  let file = req.file
  // 获取文件后缀名，如'.jpg'
  let index = file.originalname.lastIndexOf('.')
  let type = file.originalname.substr(index)
  // 获取当前年月，作为区分子目录
  let month = moment(Date.now()).format('YYYY-MM')
  // 随机生成16进制的28位数的文件名，用于上传oss时显示
  let ossName = Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  ossName = `${ossName}${type}`
  // 拼接新文件存储路径（文件目录+随机数+文件后缀名），用于上传oss时显示
  let osspath = month + '/' + ossName
 
  //  临时文件在服务器中的本地路径
  let filePath = './' + req.file.path
 
  // 重写文件,生成图片，用于上传
  fs.rename(filePath, ossName, (err) => {
    if (err) {
      // user.uploadLog(req, osspath, 'false', '文件重新写入失败')
      res.status(200).json({
        code: 1,
        msg: '文件重新写入失败',
        data: err
      })
    } else {
      // 重写文件在服务器中的本地路径
      let localFile = './' + ossName
      // 上传图片
      client.put(osspath, localFile)
        .then(data => {
          console.log(123, data)
          fs.unlinkSync(localFile)
          if (data.res.status === 200) {
            // user.uploadLog(req, osspath, 'true', '')
            res.status(200).json({
              code: 0,
              msg: '文件上传成功',
              data: {
                url: data.url
              }
            })
          } else {
            // user.uploadLog(req, osspath, 'false', '文件上传意外错误304')
            res.status(200).json({
              code: 304,
              msg: '文件上传意外错误',
              data: null
            })
          }
        })
        .catch(error => {
          fs.unlinkSync(localFile)
          // user.uploadLog(req, osspath, 'false', '文件上传意外错误305')
          res.status(200).json({
            code: 305,
            msg: '文件上传意外错误',
            data: error
          })
        })
    }
  })
})
 
/**
 * 获取上传文件，并作以判断是否合法
 * @param req
 * @param res
 * @param next
 */
function uploadFile (req, res, next) {
  // dest 值为文件存储的路径;single方法,表示上传单个文件,参数为表单数据对应的key
  let upload = multer({dest: 'uploads/'}).single('file')
  upload(req, res, (err) => {

    // 获取文件相应数据
    let file = req.file
    const isJPG = file.mimetype === 'image/jpeg' | file.mimetype === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2
    const filepath = './uploads/' + file.filename
    // const fileName = file.originalname !== undefined ? file.originalname : ''
 
    // 上传前守卫
    user.uploadGuard(req, function (data) {
      data = JSON.parse(data)
      // 判断是否获取到上传记录
      if (data.code === 'success') {
        let role = data.data.role || 'user';
        // 判断是否恶意多次上传
        if (role !== 'super') {
          fs.unlinkSync(filepath)
          // user.uploadLog(req, fileName, 'false', '可疑上传访问，已拦截')
          res.status(200).json(({
            code: 1,
            msg: '没有权限',
            data: null
          }))
        } else {
          // 判断文件处理是否异常
          if (err) {
            // 删除临时文件
            fs.unlinkSync(filepath)
            // user.uploadLog(req, fileName, 'false', '文件类型或大小异常错误，请按提示选择文件')
            res.status(200).json({
              code: 1,
              msg: '文件类型或大小异常错误，请按提示选择文件',
              data: null
            })
          } else if (!isJPG) {
            // 删除临时文件
            // fs.unlinkSync(filepath)
            // user.uploadLog(req, fileName, 'false', '文件类型或大小超过限制，请按提示选择文件')
            res.status(200).json({
              code: 1,
              msg: '文件类型仅支持图片',
              data: null
            })
          } else if (!isLt2M) {
            res.status(200).json({
              code: 1,
              msg: '文件大小超过限制',
              data: null
            })
          } else {
            // 执行上传操作
            next()
          }
        }
      } else {
        fs.unlinkSync(filepath)
        // user.uploadLog(req, fileName, 'false', '获取上传历史记录及身份意外错误')
        res.status(200).json({ ...data, code: 1 })
      }
    })
  })
}

export default router