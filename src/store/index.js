import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {    
    url : 'http://localhost:8000/',
  },
  getters: {
    url (state) {
        return state.url
    }
},

  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})
