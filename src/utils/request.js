import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  // process.env 是nodejs内置的固定环境变量对象
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const { success, message } = response.data
    if (success) {
      return response.data
    } else {
      Message.error(message)
      return Promise.reject(message)
    }
  },
  error => {
    // 4xx/5xx的响应状态，如果后台返回了响应数据，我们就用一下；如果没有，就用error对象本身的message值
    Message.error((error.response && error.response.data && error.response.data
      .message) || error.message)
    // 上面是报错就提示，下面是具体分析
    // 可以通过http状态码来判断 error.response.status === 401
    // 或者还可以用code逻辑码来判断 (10002 和后台商定的值，代表token过期)
    // ?.(可选链操作符) 新版的语法,需要babel支持才能用
    // 也就是: 左侧有值才会继续往下去点属性 (防止空值去.任意的属性报错)
    if (error?.response?.data?.code === 10002) {
      // 清空token(vuex和本地都要清除),用户信息，返回到登录页
      store.dispatch('user/logoutActions')
      router.replace(`/login?redirect=${encodeURIComponent(router.currentRoute.fullPath)}`)
    }
    return Promise.reject(error)
  }
)

export default service
