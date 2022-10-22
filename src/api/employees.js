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

/**
 * 员工 - 根据员工ID->删除员工
 * @param {*} id 员工ID
 * @returns Promise
 */
export function delEmployeeAPI(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

/**
 * 员工 - (批量导入员工)导入excel
 * @param {*} data [{},{},{}]
 * @returns Promise
 */
export function importEmployeeAPI(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}

/**
 * 员工 - 根据员工ID,更新员工基本信息
 * @param {*} data 员工数据对象
 * @returns Promise
 */
export function updateEmployeesAPI(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 员工 - 给员工->分配保存角色
 * @param {*} data { id:当前用户id, roleIds:选中的角色id组成的数组 }
 * @returns Promise
 */
export function saveEmployeesRoleAPI(data) {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
