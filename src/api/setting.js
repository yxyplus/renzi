import request from '@/utils/request'

/**
 * 角色设置 - 获取所有角色信息
 * @param {*} params {page:页码数, pagesize:每页条数}
 * @returns Promise
 */
export function getRoleListAPI(params) {
  return request({
    url: '/sys/role',
    params
  })
}
