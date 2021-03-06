import Vue from 'vue'

const state = {
  bornData: {},
  months: {}
}

const mutations = {
  SET_USER_DATA (state, payload) {
    state.bornData = payload.bornData
    state.months = payload.months
  },

  UNSET_USER_DATA (state) {
    state.bornData = {}
    state.months = {}
  },

  UPDATE_BORN_DATA (state, payload) {
    Vue.set(state.bornData, payload)
  },

  UPDATE_MONTHS_DATA (state, payload) {
    state.months = { ...state.months, [payload.monthNumber]: payload.data }
  },

  REMOVE_MONTH (state, payload) {
    Vue.delete(state.months, payload)
  }
}

const actions = {
  loadUserBabyData ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    let userBabyDataDoc = Vue.$db.collection('userBabyData').doc(payload)
    userBabyDataDoc.get()
      .then((data) => {
        let userBabyData = data.exists ? data.data() : console.log('Данный документ не существует!')

        commit('SET_USER_DATA', userBabyData)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  updateBornData ({ commit, getters }, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    let userBabyDataDoc = Vue.$db.collection('userBabyData').doc(getters.userId)

    userBabyDataDoc.set({
      bornData: payload
    }, { merge: true })
      .then(() => {
        commit('UPDATE_BORN_DATA', payload)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  updateMonthsData ({ commit, getters }, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    let userBabyDataDoc = Vue.$db.collection('userBabyData').doc(getters.userId)

    let monthData = {
      monthNumber: parseInt(payload.monthNumber),
      tooth: parseInt(payload.tooth),
      weight: parseInt(payload.weight),
      height: parseInt(payload.height),
      photo: payload.photo
    }

    userBabyDataDoc.set({
      months: {
        [payload.monthNumber]: monthData
      }
    }, { merge: true }) // merge: true - чтобы не перезаписывалось, а добавлялось
      .then(() => {
        commit('UPDATE_MONTHS_DATA', { monthNumber: payload.monthNumber, data: monthData })
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  removeMonthData ({ commit, getters }, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    let userBabyDataDoc = Vue.$db.collection('userBabyData').doc(getters.userId)

    userBabyDataDoc.update({
      [`months.${payload}`]: Vue.$ff.FieldValue.delete()
    })
      .then(() => {
        commit('REMOVE_MONTH', payload)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  unsetUserBabyData ({ commit }) {
    commit('CLEAR_ERROR')
    commit('UNSET_USER_DATA')
  }
}

const getters = {
  bornData: state => state.bornData,
  months: state => state.months
}

const userBabyDataModule = {
  state,
  mutations,
  actions,
  getters
}

export default userBabyDataModule
