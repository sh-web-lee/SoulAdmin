import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchFlag: false,
    loginFlag: false,
    registerFlag: false,
    forgetFlag: false,
    emailFlag: false,
    drawer: false,
    snackbar: {
      color: '',
      status: false,
      mes: '',
      icon: ''
    }
  },
  mutations: {
    closeModel (state) {
      state.registerFlag = false
      state.loginFlag = false
      state.searchFlag = false
      state.emailFlag = false
    }
  },
  actions: {
  },
  modules: {
  }
})
