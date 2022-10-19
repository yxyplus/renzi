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

/**
 * 员工 - 新增员工
 * @param {*} data 员工的信息对象(7对key+value但是有些不是必须传递的)
 * @returns Promise
 */
export function addEmployeeAPI(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
