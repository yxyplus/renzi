import request from '@/utils/request'

/**
 * 权限- 获取所有权限列表
 * @param {*} params 数据对象
 * @returns Promise
 */
export function getPermissionListAPI() {
  return request({
    url: '/sys/permission'
  })
}

/**
 * 权限- 新增权限
 * @param {*} data 数据对象
 * @returns Promise
 */
export function addPermissionAPI(data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

/**
 * 权限- 根据权限ID->更新权限
 * @param {*} data 数据对象
 * @returns Promise
 */
export function updatePermissionAPI(data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 权限- 根据权限ID-删除权限
 * @param {*} id 权限ID
 * @returns Promise
 */
export function delPermissionAPI(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}

/**
 * 权限- 获取权限详情
 * @param {*} id 权限ID
 * @returns Promise
 */
export function getPermissionDetailAPI(id) {
  return request({
    url: `/sys/permission/${id}`
  })
}
