import router from "../../../router";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    authUser: {},
    accessToken: '',
  },
  getters: {
    //
  },
  mutations: {
    updateLoginStatus (state, isAuthenticated) {
     state.isAuthenticated = isAuthenticated
    },
    updateAuthUser (state, authUser) {
     state.authUser = authUser
    },
    updateAccessToken (state, token) {
      state.accessToken = token
    }
  },
  actions: {
    logout ({commit}) {
      commit('updateLoginStatus', false)
      commit('updateAuthUser', {})
      commit('updateAccessToken', '')
      return router.push({name: 'Login'})
    }
  }
}