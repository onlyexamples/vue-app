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

  ADD_BORN_DATA (state, payload) {
    Vue.set(state.bornData, payload)
  },

  ADD_NEW_MONTH (state, payload) {
    state.months = { ...state.months, [payload.monthNumber]: payload.data }
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
        // console.log(data)
        // console.log(data.exists)
        console.log(userBabyData)

        commit('SET_USER_DATA', userBabyData)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_LOADING', false)
        throw error
      })
  },

  addBornData ({ commit, getters }, payload) {
    commit('SET_LOADING', true)
    let userBabyDataDoc = Vue.$db.collection('userBabyData').doc(getters.userId)
    const bornData = {
      date: payload.bornDate,
      weight: payload.bornWeight,
      height: payload.bornHeight
    }
    userBabyDataDoc.set({
      bornData: bornData
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
    commit('SET_LOADING', true)
    let userBabyDataDoc = Vue.$db.collection('userBabyData').doc(getters.userId)
    // let babyMonths = userBabyDataDoc.collection('months')
    let monthData = {
      tooth: payload.tooth,
      weight: payload.weight,
      height: payload.height,
      photo: payload.photo
    }

    userBabyDataDoc.set({
      months: {
        [payload.monthNumber]: monthData
      }
    }, { merge: true }) // merge: true - чтобы не перезаписывалось, а добавлялось
      .then(() => {
        commit('ADD_NEW_MONTH', { monthNumber: payload.monthNumber, data: monthData })
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_LOADING', false)
        throw error
      })
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
