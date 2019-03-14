import axios from 'axios'

const state = {
  months: []
}

const mutations = {
  UPDATE_MONTHS (state, payload) {
    state.months = payload
  }
}

const actions = {
  getMonths ({ commit }) {
    axios.get('./static/data.json').then((response) => {
      commit('UPDATE_MONTHS', response.data.months)
    })
  }
}

const getters = {
  months: state => state.months
}

const monthsModule = {
  state,
  mutations,
  actions,
  getters
}

export default monthsModule
