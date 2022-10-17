import request from '@/utils/request'

/**
 * 组织架构 - 获取列表
 * @returns Promise
 */
export function getDepartmentsListAPI() {
  return request({
    url: '/company/department'

  })
}

/**
 * 组织架构 - 部门负责人列表数据
 * @returns Promise
 */
export function getEmployeeSimpleAPI() {
  return request({
    url: '/sys/user/simple'

  })
}

/**
 * 组织架构 - 新增子部门
 * @param {*} data 5对key+value的数据对象
 * @returns Promise
 */
export function addDepartmentsAPI(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
    // params:{}  里面的参数和值会出现在url?后面
    // data:{} 里面的参数和值会出现在请求体body中
  })
}

/**
 * 组织架构 - 根据部门ID->获取部门详情
 * @param {*} departId 部门ID
 * @returns Promise
 */
export function getDepartDetailAPI(departId) {
  return request({
    url: `/company/department/${departId}`
  })
}

/**
 * 组织架构 - 更新部门详情
 * @param {*} data 9对key+value的数据对象
 * @returns Promise
 */
export function updateDepartmentsAPI(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 组织架构 - 根据ID->删除某个部门
 * @param {*} departId 部门ID
 * @returns Promise
 */
export function delDepartmentAPI(departId) {
  return request({
    url: `/company/department/${departId}`,
    method: 'DELETE'
  })
}
