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

/**
 * 角色设置 - 根据公司ID->获取公司详细信息
 * @param {*} companyId 公司ID
 * @returns Promise
 */
export function getCompanyInfoAPI(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 * 角色设置 - 新增角色
 * @param {*} data {name:角色名字,description:角色描述}
 * @returns Promise
 */
export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 角色设置 - 根据角色ID->获取角色详情
 * @param {*} roleId 角色ID值
 * @returns Promise
 */
export function getRoleDetailAPI(roleId) {
  return request({
    url: `/sys/role/${roleId}`
  })
}

/**
 * 角色设置 - 根据角色ID->编辑角色
 * @param {*} data 角色对象
 * @returns Promise
 */
export function updateRoleAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 * 角色设置 - 根据角色ID->删除角色
 * @param {*} roleId 角色ID
 * @returns Promise
 */
export function deleteRoleAPI(roleId) {
  return request({
    url: `/sys/role/${roleId}`,
    method: 'DELETE'
  })
}
