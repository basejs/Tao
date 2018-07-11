import Vue from 'vue'
// import Qs from 'qs'

axios.defaults.timeout = 0
const { t, prototype: { $message } } = Vue
const duration = 3000
const showErrorMsg = (msg) => {
  const errMsg = msg || t('common.network.exception')
  $message({
    showClose: true,
    message: errMsg,
    type: 'error',
    duration
  })
}

axios.interceptors.request.use(
  config => {
    // config.headers['X-Requested-With'] = 'XMLHttpRequest'
    // config.data = Qs.stringify(config.data)
    return config
  }
)

axios.interceptors.response.use(
  response => {
    const res = response.data
    switch (res.action) {
      case 'alertOk':
        $message({
          message: res.msg,
          type: 'success',
          duration
        })
        break
      case 'alertError':
        showErrorMsg(res.msg)
        break
      case 'alertErrors':
        Object.keys(res.data).forEach(key => {
          showErrorMsg(res.data[key])
        })
        break
      case 'goTo':
        location.href = res.data
        break
      case 'sendGoTo':
        $message({
          message: res.msg,
          type: 'success',
          duration,
          onClose: () => {
            location.href = res.data
          }
        })
        break
      case 'reload':
        $message({
          message: res.msg,
          type: 'success',
          duration,
          onClose: () => {
            location.reload(true)
          }
        })
        break
      case 'eval':
        // eval(res.msg)
        if(res.msg) {
          const script = document.createElement('script')
          script.type = 'text/javascript'
          script.text = `try{${res.data}}catch(err){console.error(err)}`
          document.head.appendChild(script)
          document.head.removeChild(document.head.lastChild)
        }
        break
      // 用户需要点击后消失
      case 'notDisappearAlert':
        $message({
          showClose: true,
          message: res.msg,
          type: 'error',
          duration: 0
        })
        break
      case 'reloadError':
        $message({
          showClose: true,
          message: res.msg,
          type: 'error',
          duration,
          onClose: () => {
            location.reload(true)
          }
        })
        break
      default:
        break
    }
    if(res.code !== 0) {
      return Promise.reject(res)
    } else {
      return res.data
    }
  },
  error => {
    // 服务端异常
    const errorMsg = t('common.network.exception')
    showErrorMsg(errorMsg)
    const errCode = error.response ? error.response.status : '-1'
    return Promise.reject({
      data: null,
      code: errCode,
      msg: errorMsg
    })
  }
)
