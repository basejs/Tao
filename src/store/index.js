import Vue from 'vue'
import Vuex from 'vuex'
import state from './state/index'
import actions from './actions/index'
import mutations from './mutations/index'
import getters from './getters/index'
import modules from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules
})
