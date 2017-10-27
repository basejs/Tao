import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/mobile',
      component: () => import('@/mobile/main.vue'),
      meta: {
        title: Vue.t('mobile.title'),
      },
      children: [
        {
          path: '',
          component: () => import('@/mobile/home/index.vue'),
          meta: {
            title: Vue.t('mobile.title'),
          },
        },
      ]
    },
  ]
})
