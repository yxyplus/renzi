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
 * 权限- 根据ID->更新权限
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

