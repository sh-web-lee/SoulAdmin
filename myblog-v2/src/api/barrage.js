import request from '../utils/request'

export const addBarrage = (message) => request({
  method: 'POST',
  url: '/api/messages',
  data: message
})

export const getBarrage = () => request({
  method: 'GET',
  url: '/api/messages'
})
