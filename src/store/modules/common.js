const state = {
  loading: false,
  error: null
}

const mutations = {
  SET_LOADING (state, payload) {
    state.loading = payload
  },

  SET_ERROR (state, payload) {
    state.error = payload
  },

  CLEAR_ERROR (state) {
    state.error = null
  }
}

const actions = {
  setLoading ({ commit }) {
    commit('SET_LOADING')
  },

  setError ({ commit }) {
    commit('SET_ERROR')
  },

  clearError ({ commit }) {
    commit('CLEAR_ERROR')
  }
}

const getters = {
  loading: state => state.loading,
  error: state => state.error
}

const commonModule = {
  state,
  mutations,
  actions,
  getters
}

export default commonModule
