import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import Notification from './modules/notification'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user: User,
    notification: Notification
  }
})
