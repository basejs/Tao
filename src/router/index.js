import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routejs = require.context('@/apps/', true, /\/router\/index\.js$/)
let routes = []
routejs.keys().forEach(r => {
  const route = routejs(r).default
  if(Array.isArray(route)) {
    routes = routes.concat(route)
  } else {
    routes.push(route)
  }
})

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/containers/main.vue'),
      children: [
        {
          path: '',
          component: () => import('@/containers/home/index.vue'),
          meta: {
            title: '首页',
          },
        },
      ],
    },
    ...routes,
    {
      path: '*',
      component: () => import('@/status/404/index.vue'),
      meta: {
        title: '404',
      },
    },
  ]
})
