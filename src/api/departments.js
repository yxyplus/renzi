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
