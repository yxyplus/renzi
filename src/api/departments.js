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
