const fs = require('fs')
let OSS = require('ali-oss');
let path = require('path')
const moment = require('moment')
const { APP_OSS_BUCKET, APP_OSS_KEY_ID, APP_OSS_KEY_SECRET, APP_OSS_REGION, APP_OSS_DOMAIN } = require('../config/config.default')

let client = new OSS({
  region: APP_OSS_REGION,
  //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
  accessKeyId: APP_OSS_KEY_ID,
  accessKeySecret: APP_OSS_KEY_SECRET,
  bucket: APP_OSS_BUCKET
});

const upToAliyun = async (file) => {
  // console.log(123, file)
  let index = file.originalFilename.lastIndexOf('.')
  let type = file.originalFilename.substr(index)
  // 获取当前年月，作为区分子目录
  let month = moment(Date.now()).format('YYYY-MM')
  // 随机生成16进制的28位数的文件名，用于上传oss时显示
  let ossName = Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
  ossName = `${ossName}${type}`
  // 拼接新文件存储路径（文件目录+随机数+文件后缀名），用于上传oss时显示
  let osspath = month + '/' + ossName

  return new Promise((resolve, reject) => {
    client.put(osspath, file.filepath).then(data => {
      if (data.res.statusCode === 200) {
        const url = APP_OSS_DOMAIN + data.name
        resolve({ url })
        fs.unlinkSync(file.filepath)
      }
    })
  });

}

const deleteObject = async (ctx) => {
  const path = ctx.request.body.url.replace(APP_OSS_DOMAIN, '/')
  return new Promise((resolve, reject) => {
    client.delete(path).then(data => {
      resolve(data)
    })

  })

}

module.exports = {
  upToAliyun,
  deleteObject
}