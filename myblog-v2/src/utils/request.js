/* axios二次封装 */

import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'development' ? 'https://www.talkxj.com' : 'https://www.talkxj.com'

// 创建axios实例
const service = axios.create({
  baseURL
})

// 请求拦截
service.interceptors.request.use(config => {
  return config
})

// 响应拦截
service.interceptors.response.use(config => {
  if (config.status === 200) {
    return Promise.resolve(config.data.data)
  }
  if (config.status === 201) {
    return Promise.resolve(config.data)
  }
  return Promise.reject(config.data)
})
export default service
