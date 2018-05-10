export default {
  path: '/m',
  component: () => import('../containers/main.vue'),
  children: [
    {
      path: '',
      component: () => import('../containers/home/index.vue'),
      meta: {
        title: '移动端首页',
      },
    },
    {
      path: '*',
      component: () => import('@/components/404/index.vue'),
      meta: {
        title: '404',
      },
    }
  ]
}
