import request from '../../utils/request'

export const handlerLogin = (userMes) => request({
  method: 'POST',
  url: '/api/login',
  data: userMes
})
