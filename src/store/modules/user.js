import firebase from 'firebase'

const state = {
  profile: {},
  authenticated: false,
  uid: null
}

const mutations = {
  SET_USER (state, payload) {
    state.authenticated = true
    state.uid = payload
  },

  UNSET_USER (state) {
    state.profile = {}
    state.authenticated = false
    state.uid = null
  }
}

const actions = {
  signUp ({commit}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        // console.log(user)
        // commit('SET_USER', user.uid)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        // console.log(error)
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  signIn ({commit}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        console.log(user)
        // commit('SET_USER', user.uid)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        console.log(error)
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  signOut () {
    firebase.auth().signOut()
  },

  STATE_CHANGED ({commit}, payload) {
    if (payload) {
      commit('SET_USER', payload.uid)
    } else {
      commit('UNSET_USER')
    }
  }
}

const getters = {
  isAuthenticated: state => state.authenticated
  // profile: state => state.profile,
  // userId: state => state.profile.userId
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}

export default userModule
