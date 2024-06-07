import request from '../utils/request'

export const getAlbums = () => request({
  method: 'GET',
  url: '/api/photos/albums'
})

export const getWallpaper = (id, current) => request({
  method: 'GET',
  url: '/api/albums/' + id + '/photos',
  params: {
    current,
    size: 10
  }
})
