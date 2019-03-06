import Vue from 'vue'
import Vuex from 'vuex'
import bornData from './modules/bornData'
import months from './modules/months'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bornData,
    months
  }
})
