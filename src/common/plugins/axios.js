import Vue from 'vue'

export default (errcb, showError) => {
  const { t } = Vue
  axios.defaults.timeout = 60000
  axios.interceptors.response.use(
    response => {
      if(response.data.code !== 0) {
        if(errcb(response.data.code) !== false) {
          showError(response.data.msg || t('common.network.exception'))
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
      showError(error.message)

      return Promise.resolve({
        data: {},
        code: error.code || 10001,
        msg: error.message
      })
    }
  )
}
