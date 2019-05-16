import firebase from 'firebase'

const state = {
  email: '',
  emailVerified: false,
  authenticated: false,
  uid: null
}

const mutations = {
  SET_USER (state, payload) {
    state.authenticated = true
    state.email = payload.email
    state.emailVerified = payload.emailVerified
    state.uid = payload.id
  },

  UNSET_USER (state) {
    state.authenticated = false
    state.email = ''
    state.emailVerified = false
    state.uid = null
  },

  UPDATE_EMAIL (state, payload) {
    state.email = payload.email
  }
}

const actions = {
  signUp ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification()
          .then(() => {
            console.log('send Verification')
          })
          .catch(error => {
            commit('SET_ERROR', error)
          })
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  signIn ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  changeUserProfileData ({ commit }, payload) {
    let user = firebase.auth().currentUser
    let credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      payload.oldPassword
    )

    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    user.reauthenticateAndRetrieveDataWithCredential(credential)
      .then(async () => {
        commit('SET_LOADING', false)

        if (payload.email) {
          await user.updateEmail(payload.email)
            .then(() => { commit('UPDATE_EMAIL', payload.email) })
            .catch((error) => {
              commit('SET_ERROR', error)
              commit('SET_LOADING', false)
            })
        }

        if (payload.newPassword) {
          await user.updatePassword(payload.newPassword)
            .then(() => { console.log('Пароль обновлен!') })
            .catch((error) => {
              commit('SET_ERROR', error)
              commit('SET_LOADING', false)
            })
        }
      })
      .catch((error) => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  signOut ({ dispatch }) {
    dispatch('unsetUserBabyData')
    firebase.auth().signOut()
  },

  stateChanged ({ commit, dispatch }, payload) {
    if (payload) {
      commit('SET_USER', {
        id: payload.uid,
        email: payload.email,
        emailVerified: payload.emailVerified
      })
      dispatch('loadUserBabyData', payload.uid)
    } else {
      commit('UNSET_USER')
    }
  }
}

const getters = {
  userSettings: (state) => {
    return {
      email: state.email,
      emailVerified: state.emailVerified
    }
  },
  isAuthenticated: state => state.authenticated,
  userId: state => state.uid
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}

export default userModule
