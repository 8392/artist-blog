import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  }
}

const actions = {
  setToken ({ commit }, token) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', token)
      resolve()
    })
  },
  // remove token
  resetToken ({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // user logout
  logout ({ commit, state }) {
    // 退出登录
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')

      resolve()
    })
  },
  redirectLogin ({ state }) {
    console.log('重定向到 login 页面')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
