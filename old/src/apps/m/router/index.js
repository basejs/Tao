export default {
  path: '/m',
  component: () => import('../containers/main.vue'),
  children: [
    {
      path: '',
      component: () => import('../containers/home/index.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '*',
      component: () => import('@/status/404/index.vue'),
      meta: {
        title: '404',
      },
    }
  ]
}
