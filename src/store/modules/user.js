import firebase from 'firebase'

const state = {
  // password: '',
  name: '',
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
    state.name = payload.displayName
    state.uid = payload.id
  },

  UNSET_USER (state) {
    state.authenticated = false
    state.email = ''
    state.username = ''
    state.uid = null
  }
}

const actions = {
  signUp ({commit}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(userData => {
        firebase.auth().currentUser.sendEmailVerification()
          .then(() => {
            // console.log(`https://first-year-8753e.firebaseapp.com/__/auth/action?mode=verifyEmail&oobCode=${userData.user.uid}`)
            console.log('send Verification')
          })
          .catch(error => {
            console.log('not send Verification')
            throw error
          })
        // commit('SET_USER', user.uid)
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  signIn ({commit}, payload) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        commit('SET_LOADING', false)
      })
      .catch((error) => {
        console.log(error)
        commit('SET_ERROR', error)
        commit('SET_LOADING', false)
      })
  },

  changeUserProfileData ({commit}, payload) {
    let user = firebase.auth().currentUser
    let credential = firebase.auth.EmailAuthProvider.credential(
      payload.email,
      payload.password
    )

    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)
    // user.updateProfile({})
    user.reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        commit('SET_LOADING', false)

        user.updateProfile({
          email: payload.email,
          password: payload.password,
          displayName: payload.name
        })
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

  stateChanged ({ commit, dispatch }, payload) {
    if (payload) {
      commit('SET_USER', {
        id: payload.uid,
        email: payload.email,
        name: payload.displayName,
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
      'name': state.name,
      'email': state.email,
      'emailVerified': state.emailVerified
      // 'password': state.password
    }
  },
  isAuthenticated: state => state.authenticated,
  userId: state => state.uid
  // profile: state => state.profile,
}

const userModule = {
  state,
  mutations,
  actions,
  getters
}

export default userModule
