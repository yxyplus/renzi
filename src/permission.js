import router from './router'
import NProgress from 'nprogress' // 导入进度条插件
import 'nprogress/nprogress.css' // 导入进度条样式
import store from '@/store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单数组  // 白名单: 无需登录,可以跳转查看的路由地址(必须在路由表里)
const whiteList = ['/login', '/404']

// 前置导航守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = store.getters.token
  if (token) { // 登陆了
    if (to.path === '/login') { // 去登录页
      // 中断要跳转 /login 这次导航，重新跳转到/(首页)
      next('/')
      NProgress.done()
    } else { // 去别的页面
      next()
      if (!store.getters.name) {
        store.dispatch('user/getUserInfoActions')
      }
    }
  } else { // 没有登陆
    if (whiteList.includes(to.path)) { // 要去的路由地址字符串，是否在白名单数组里出现过，如果出现过就放行
      next()
    } else { // 去别的页面
      next('/login')
      NProgress.done()
    }
  }
})

// 后置导航守卫
router.afterEach(() => {
  NProgress.done()
})
