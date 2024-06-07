import type { AxiosProgressEvent } from '@sa/axios';
import { request } from '../request';

/**
 * 上传图片
 *
 * @param data 图片对象
 * @param cb 处理进度条回调
 * @returns
 */
export function uploadImg(data: FormData, cb?: (progressEvent: AxiosProgressEvent) => void) {
  return request<{ url: string }>({
    url: '/upload/img',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: progressEvent => {
      cb && cb(progressEvent);
    }
  });
}

/**
 * 删除OSS中的文件
 *
 * @param data
 * @returns
 */
export function deleteImg(data: { url: string }) {
  return request({
    url: '/upload/delete',
    method: 'POST',
    data
  });
}
