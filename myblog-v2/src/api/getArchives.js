import request from '../utils/request'

export const getArchives = () => request({
  method: 'GET',
  url: '/api/articles/archives',
  params: {
    current: 1
  }
})
