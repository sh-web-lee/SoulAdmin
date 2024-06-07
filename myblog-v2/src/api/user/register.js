import request from '../../utils/request'

export const registerUser = (userMes) => request({
  method: 'POST',
  url: '/api/register',
  data: {
    ...userMes
  }
})
