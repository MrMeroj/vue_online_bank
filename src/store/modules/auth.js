import axios from 'axios'
import { error } from '../../utils/error'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem('jwt-token')
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('jwt-token', token)
    },
    logout(state) {
      state.token = null
      localStorage.removeItem('jwt-token')
    }
  },
  actions: {
    async login({ commit, dispatch }, payload) {
      try {
        console.log(process.env.VUE_APP_FB_KEY)
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const { data } = await axios.post(url, {...payload, returnSecureToken: true})
        commit('setToken', data?.idToken)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('setMessage', {
          value: error(e.response.data.error.message),
          type: 'danger'
        }, { root: true })
        console.log(error(e.response.data.error.message))
        console.dir(e)
        throw new Error()
      }
    }
  },
  getters: {
    token(state) {
      return state.token
    },
    isAuthenticated(_, getters) {
      return !!getters.token
    }
  }
}