
const state = {
  resize: {
    width: document.documentElement.offsetWidth,
    height: document.documentElement.offsetHeight
  }
}

const mutations = {
  CHANGE_RESIZE: (state, { width, height }) => {
    state.resize = { width, height }
  }
}

const actions = {
  changeResize ({ commit }, data) {
    commit('CHANGE_RESIZE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
