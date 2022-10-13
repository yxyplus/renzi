import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

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
    return Promise.reject(error)
  }
)

export default service
