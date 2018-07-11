import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    store.commit('updateTitle', to.meta.title)
  }
  Message.closeAll()

  // 跨端跳转需要走location.href
  if (to.path !== from.path) {
    if(from.path !== '/' && from.path !== to.path) {
      if(to.path.split('/')[1] !== from.path.split('/')[1]) {
        location.href = to.path
        return
      }
    }
  }
  
  next()
})
