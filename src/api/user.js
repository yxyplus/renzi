import request from '@/utils/request'

/**
 * 用户 - 登录
 * @param {*} data 手机号+密码的数据对象
 * @returns Promise
 */
export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    // headers:{}  // axios默认会携带请求头Content-Type: 'application/json'
    data
  })
}

/**
 * 用户 - 获取用户资料
 * @returns Promise
 */
export function getUserProfileAPI() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 用户 - 获取用户头像
 * @param {*} id 用户-id
 * @returns Promise
 */
export function getUserPhotoAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
