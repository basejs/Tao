import router from '@/router'
import Vue from 'vue'

router.beforeEach((to, from, next) => {
  const n = to.params.EventId
  const o = from.params.EventId
  if(to.meta.title) {
    to.meta.title = Vue.t(to.meta.title)
  }
  if(!n && o && o !== to.path.split('/')[1]) {
    next(`/${from.params.EventId}${to.fullPath}`)
    return
  }
  next()
})

router.afterEach(() => {

})
