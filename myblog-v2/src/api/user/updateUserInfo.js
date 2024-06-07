import request from '../../utils/request'

export const handleUserInfo = (UserInfo) => request({
  method: 'POST',
  url: '/api/users/info',
  data: UserInfo
})
