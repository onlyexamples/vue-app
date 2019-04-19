// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import config from '@/db/firebase/config/index'
import store from './store'
import App from './App'
import router from './router'

Vue.config.productionTip = false
firebase.initializeApp(config)
const db = firebase.firestore()
const firebaseStorage = firebase.storage()
Vue.$db = db
Vue.$ff = firebase.firestore
Vue.$firebaseStorage = firebaseStorage

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('stateChanged', user)
    })
  }
}).$mount('#app')
