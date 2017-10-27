import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/*',
      component: () => import('@/mobile/main.vue'),
      meta: {
        title: Vue.t('mobile.title'),
      },
      children: [
        {
          path: 'index',
          component: () => import('@/mobile/home/index.vue'),
          meta: {
            title: Vue.t('mobile.title'),
          },
        },
        {
          path: '',
          component: () => import('@/mobile/notfound/index.vue'),
          meta: {
            title: Vue.t('mobile.notfound.title'),
          },
        }
      ]
    },
  ]
})
