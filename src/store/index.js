import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import bornData from './modules/bornData'
import months from './modules/months'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    user,
    bornData,
    months
  }
})
