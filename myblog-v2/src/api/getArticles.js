import request from '../utils/request'

// 获取所有文章，首页展示
export const getAllarticles = () => request({
  method: 'GET',
  url: '/api/articles',
  params: {
    current: 1
  }
})

// 根据id获取文章，详情页展示
export const getArticles = (id) => request({
  method: 'GET',
  url: '/api/articles/' + id
})
