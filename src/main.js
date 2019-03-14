// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueFire from 'vuefire'
// import firebase from 'firebase/app'
// import 'firebase/firestore'
import firebase from 'firebase'
import config from '@/db/firebase/config/index'
import store from './store'
import App from './App'
import router from './router'

Vue.config.productionTip = false
firebase.initializeApp(config)
// Vue.use(VueFire)
// firebase.initializeApp({
//   projectId: 'first-year-8753e',
//   databaseURL: 'https://first-year-8753e.firebaseio.com'
// })
// export const db = firebase.firestore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // const vm = this
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('STATE_CHANGED', user)
    })
  }
})
