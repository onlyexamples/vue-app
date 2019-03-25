import Vue from 'vue'
// import axios from 'axios'

const defaultUserData = {
  bornData: {},
  months: {}
}

const state = {
  userBaby: defaultUserData
}

const mutations = {
  SET_USER_DATA (state, payload) {
    state.userBaby.bornData = payload.bornData
    state.userBaby.months = payload.months
  },

  ADD_BORN_DATA (state, payload) {
    Vue.set(state.userBaby.bornData, payload)
  },

  ADD_NEW_MONTH (state, payload) {
    state.userBaby.months = { ...state.userBaby.months, [payload.monthNumber]: payload.data }
  },

  LOAD_BORN_DATA (state, payload) {
    // console.log(payload)
    state.userBaby.bornData = payload
  },

  LOAD_MONTHS (state, payload) {
    state.userBaby.months = payload
  }
}

const actions = {
  loadUserData ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    // console.log(payload)
    let userDataRef = Vue.$db.collection('userData').doc(payload)
    userDataRef.get()
      .then((data) => {
        // console.log(data)
        // console.log(data.exists)
        let userData = data.exists ? data.data() : defaultUserData

        if (!userData.userBaby.months) {
          userData.userBaby.months = {}
        }

        if (!userData.userBaby.bornData) {
          userData.userBaby.bornData = {}
        }

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
        commit('ADD_BORN_DATA', payload)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_LOADING', false)
        throw error
      })
  },

  addNewMonth ({ commit, getters }, payload) {
    // console.log(payload)
    commit('SET_LOADING', true)
    let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
    let babyMonthsRef = userDataRef.collection('userBaby').doc('months')
    let monthData = {
      tooth: payload.tooth,
      weight: payload.weight,
      height: payload.height,
      photo: payload.photo
    }

    babyMonthsRef.set({
      [payload.monthNumber]: monthData
    }, { merge: true }) // merge: true - чтобы не перезаписывалось, а добавлялось
      .then(() => {
        commit('ADD_NEW_MONTH', { monthNumber: payload.monthNumber, data: monthData })
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_LOADING', false)
        throw error
      })
  },

  // loadBornData ({ commit }) {
  //   axios.get('./static/data.json').then((response) => {
  //     commit('LOAD_BORN_DATA', response.data.userBaby.bornData)
  //   })
  // },

  loadMonths ({ commit }) {
    // let userDataRef = Vue.$db.collection('userData').doc(getters.userId)
    // userDataRef.collection('userBaby').doc('months')
    let userDataRef = Vue.$db.doc(`userBaby/${getters.userId}/userBaby/months`)
    userDataRef
      .get()
      .then((months) => {
        // console.log(months)
        commit('LOAD_MONTHS', months)
      })
      .catch((error) => {
        throw error
      })
  }
}

const getters = {
  bornData: state => state.userBaby.bornData,
  months: state => state.userBaby.months
}

const UserDataModule = {
  state,
  mutations,
  actions,
  getters
}

export default UserDataModule
