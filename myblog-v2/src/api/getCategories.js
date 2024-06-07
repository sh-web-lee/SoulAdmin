import request from '../utils/request'

export const getCategories = () => request({
  method: 'GET',
  url: '/api/categories'
})

export const getTags = () => request({
  method: 'GET',
  url: '/api/tags'
})

export const getCategoryArticles = (id) => request({
  method: 'GET',
  url: '/api/articles/condition',
  params: {
    categoryId: id,
    current: 1
  }
})
export const getTagArticles = (id) => request({
  method: 'GET',
  url: '/api/articles/condition',
  params: {
    tagId: id,
    current: 1
  }
})
