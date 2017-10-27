import Vue from 'vue'

let timer = null
export default (showErr, cb) => {
  const { t } = Vue
  axios.defaults.timeout = 60000
  axios.interceptors.response.use(
    response => {
      if(response.data.code !== 0) {
        if(typeof cb === 'function') {
          if(cb(response.data.code) !== false) {
            showErr(response.data.msg || t('common.network.exception'))
          }
        } else {
          switch (response.data.code) {
            // 登陆失效
            case 20001:
              if(!timer) {
                timer = setTimeout(() => {
                  clearTimeout(timer)
                  timer = null
                  // 清除本地缓存
                  // 跳转登录页
                }, 500)
              }
              break
            default:
              break
          }
        }
      }
      try {
        if(!response.data) {
          response.data = {}
        }
        if(!response.data.data) {
          response.data.data = {}
        }
      } catch (err) {
        response.data = {
          code: 10000,
          data: {},
          msg: t('common.network.exception')
        }
      }
      return response.data
    },
    error => {
      switch (error.code) {
        case 'ECONNABORTED':
          error.message = t('common.network.timeout')
          break
        default:
          error.message = t('common.network.exception')
          break
      }
      showErr(error.message)

      return Promise.resolve({
        data: {},
        code: error.code || 10001,
        msg: error.message
      })
    }
  )
}
