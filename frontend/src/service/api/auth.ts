import { request } from '../request';

/**
 * register
 *
 * @param email email
 * @param password password
 * @param username username
 * @returns
 */
export function fetchRegister(email: string, password: string, username: string) {
  return request({
    url: '/auth/register',
    method: 'post',
    data: {
      email,
      password,
      username
    }
  });
}

/**
 * Login
 *
 * @param email email
 * @param password Password
 */
export function fetchLogin(email: string, password: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/login',
    method: 'post',
    data: {
      email,
      password
    }
  });
}

/** Get user info */
export function fetchGetUserInfo(id: number) {
  return request<Api.Auth.UserInfo>({ url: `/auth/getUserInfoById/${id}` });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<Api.Auth.LoginToken>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
