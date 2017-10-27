import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      // 为兼容history需要一个全局路由
      path: '/*',
      component: () => import('@/manager/main.vue'),
      children: [
        {
          path: 'index',
          component: () => import('@/manager/home/index.vue'),
        },
        // 404
        {
          path: '',
          component: () => import('@/manager/notfound/index.vue'),
        }
      ]
    },
  ]
})
