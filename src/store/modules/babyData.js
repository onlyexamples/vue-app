import Vue from 'vue'
import axios from 'axios'

const defaultUserData = {
  'accountData': {},
  'userBaby': {
    'bornData': {},
    'months': {}
  }
}

const state = {
  userData: defaultUserData
}

const mutations = {
  SET_USER_DATA (state, payload) {
    state.userData = payload
  },

  ADD_BORN_DATA (state, payload) {
    Vue.set(state.userBaby.bornData, payload)
  },

  ADD_NEW_MONTH (state, payload) {
    Vue.set(state.userBaby.months, payload)
  },

  LOAD_BORN_DATA (state, payload) {
    console.log(payload)
    state.userBaby.bornData = payload
  },

  LOAD_MONTHS (state, payload) {
    state.months = payload
  }
}

const actions = {
  loadUserData ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    let userDataRef = Vue.$db.collection('userData').doc(payload)
    userDataRef.get()
      .then((data) => {
        let userData = data.exists ? data.data() : defaultUserData

        // if (!userData.userBaby.bornData) { userData.userBaby.bornData = {} }

        commit('SET_USER_DATA', userData)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_LOADING', false)
        throw error
      })
  },

  addBornData ({ commit, getters }, payload) {
    commit('SET_LOADING', true)
    let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
    const bornData = {
      date: payload.bornDate,
      weight: payload.bornWeight,
      height: payload.bornHeight
    }
    userDataRef.set({
      userBaby: {
        bornData: bornData
      }
    }, { merge: true }) // merge: true - чтобы не перезаписывалось, а добавлялось
      .then(() => {
        commit('SET_LOADING', false)
        commit('ADD_BORN_DATA', payload)
      })
      .catch((error) => {
        commit('SET_LOADING', false)
        throw error
      })
  },

  addNewMonth ({ commit, getters }, payload) {
    console.log(payload)
    commit('SET_LOADING', true)
    let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
    let babyMonthsRef = userDataRef.collection('userBaby').doc('months')

    babyMonthsRef.set({
      [payload.monthNumber]: {
        tooth: payload.tooth,
        weight: payload.weight,
        height: payload.height,
        photo: payload.photo
      }
    }, { merge: true }) // merge: true - чтобы не перезаписывалось, а добавлялось
      .then(() => {
        commit('SET_LOADING', false)
        commit('ADD_NEW_MONTH', payload)
      })
      .catch((error) => {
        commit('SET_LOADING', false)
        throw error
      })
  },

  loadBornData ({ commit }) {
    axios.get('./static/data.json').then((response) => {
      commit('LOAD_BORN_DATA', response.data.userBaby.bornData)
    })
  },

  loadMonths ({ commit }) {
    axios.get('./static/data.json').then((response) => {
      commit('LOAD_MONTHS', response.data.userBaby.months)
    })
  }
}

const getters = {
  bornData: state => state.bornData,
  months: state => state.months
}

const babyDataModule = {
  state,
  mutations,
  actions,
  getters
}

export default babyDataModule
