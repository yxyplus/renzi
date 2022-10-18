import request from '@/utils/request'

/**
 * 员工 - 获取员工列表
 * @param {*} params {page:当前页码,size：每页条数}
 * @returns Promise
 */
export function getEmployeesListAPI(params) {
  return request({
    url: '/sys/user',
    params
  })
}
