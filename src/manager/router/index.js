import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/manager',
      component: () => import('@/manager/main.vue'),
      children: [
        {
          path: '',
          component: () => import('@/manager/home/index.vue'),
        },
        {
          path: 'xxx',
          component: () => import('@/manager/home/index.vue'),
        },
      ]
    },
  ]
})
