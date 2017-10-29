import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/manager',
      component: () => import('../main.vue'),
      children: [
        {
          path: '',
          component: () => import('../home/index.vue'),
        },
        {
          path: '*',
          component: () => import('@/notfound/index.vue'),
        }
      ]
    },
  ]
})
