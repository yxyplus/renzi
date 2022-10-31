import router, { asyncRoutes } from './router'
import NProgress from 'nprogress' // 导入进度条插件
import 'nprogress/nprogress.css' // 导入进度条样式
import store from '@/store'
import getPageTitle from '@/utils/get-page-title'

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
        const menus = await store.dispatch('user/getUserInfoActions')

        // 用menus权限点英文字符串, 和路由规则对象name匹配
        /* 把所有准备好的8个路由规则对象取出, 看看名字和menus里是否匹配, 匹配就证明:
        此登录的用户有这个页面的访问权限, 让filter收集此路由规则对象到新数组里*/
        const filterList = asyncRoutes.filter(routeObj => {
          const routeName = routeObj.children[0].name.toLowerCase()
          return menus.includes(routeName)
        })

        filterList.push({ path: '*', redirect: '/404', hidden: true })

        // 始终都动态先添加8个路由规则对象
        router.addRoutes(filterList)
        store.commit('permission/setRoutes', filterList)

        // 路由再跳转一次, 因为上面next() 会导致白屏(因为放行时, 动态路由还没有加入到内存中路由表里)
        // 添加完, 立刻在跳转一次
        next({
          path: to.path,
          replace: true // 不让回退, 类似于this.$router.replace
        })
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
router.afterEach((to, from) => {
  document.title = getPageTitle(to.meta.title)
  NProgress.done()
})
