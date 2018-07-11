export default {
  path: '/m',
  component: () => import('../containers/main.vue'),
  children: [
    {
      path: '',
      component: () => import('../containers/home/index.vue'),
      meta: {
        title: '移动端首页'
      }
    },
  ]
}
