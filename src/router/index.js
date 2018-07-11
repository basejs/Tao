import Vue from 'vue'
import Router from 'vue-router'

const routerApp = require.context('@/apps/', true, /\/router\/index\.js$/)
let routesApp = []
routerApp.keys().forEach(r => {
  const route = routerApp(r).default
  if (Array.isArray(route)) {
    routesApp = routesApp.concat(route)
  } else {
    routesApp.push(route)
  }
})

const routerModule = require.context('@/containers/', true, /\/router\/index\.js$/)

let routesModule = []
routerModule.keys().forEach(r => {
  const route = routerModule(r).default
  if (Array.isArray(route)) {
    routesModule = routesModule.concat(route)
  } else {
    routesModule.push(route)
  }
})

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/containers/main.vue'),
      children: [
        ...routesApp,
        ...routesModule,
        {
          path: '*',
          component: () => import('@/components/404/index.vue'),
          meta: {
            title: '404',
          },
        }
      ],
    },
  ]
})
