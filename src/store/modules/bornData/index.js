import axios from 'axios'

const state = {
  bornData: []
}

const mutations = {
  UPDATE_BORN_DATA (state, payload) {
    state.bornData = payload
  }
}

const actions = {
  getBornData ({ commit }) {
    axios.get('./static/data.json').then((response) => {
      commit('UPDATE_BORN_DATA', response.data.bornData)
    })
  }
}

const getters = {
  bornData: state => state.bornData
}

const bornModule = {
  state,
  mutations,
  actions,
  getters
}

export default bornModule
