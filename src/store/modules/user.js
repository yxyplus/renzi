import { loginAPI, getUserProfileAPI, getUserPhotoAPI } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(), // 用户token，默认为 ''
    userInfo: {}, // 用户信息对象
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token // vuex里state存一份
    setToken(token) // 给本地也存一份
  },
  // 设置用户名
  SER_USER: (state, value) => {
    state.userInfo = value
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 删除token
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  // 删除用户信息
  REMOVE_USER(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 封装-登录逻辑
  async loginActions({ commit }, data) {
    try {
      const res = await loginAPI(data)
      commit('SET_TOKEN', res.data)
      // 逻辑页面还在接收数组, 外面写成功/失败的逻辑, 所以这里要把数组返回出去
      // return到actions调用的地方(login/index.vue)
      return res
    } catch (err) {
      return Promise.reject(err)
    }
  },
  // 封装-获取用户基本信息
  async getUserInfoActions({ commit }) {
    const { data: userObj } = await getUserProfileAPI()
    const { data: photoObj } = await getUserPhotoAPI(userObj.userId)
    const newObj = { ...userObj, ...photoObj } // 合并一个信息非常全的对象
    commit('SER_USER', newObj)

    // 返回页面权限点英文字符串数组['employees', ...]
    return userObj.roles.menus
  },
  // 封装-退出登录逻辑 (被动退出token过期 / 主动退出)
  logoutActions({ commit }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_USER')

    resetRouter() // 让内存里router对象, 重置
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

