import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    store.commit('UPDATE_TITLE', to.meta.title)
  }
  Message.closeAll()

  const n = to.params.eventId
  const o = from.params.eventId
  const paths = to.path.replace(/^\//, '').split('/')
  if(!n && o && o !== paths[1]) {
    paths.splice(1, 0, from.params.eventId)
    next(`/${paths.join('/')}`)
    return
  }
  next()
})
