<template lang="pug">
  .profile

    form.form.form--profile(name="user" @submit.prevent="updateUserData")
      .form-header
        h1.title Профиль
        button.button(@click="showModal = true") + Добавить месяц

      .form-content
        profile-user-data
        profile-born-data

        .form-section--button
          button.button(:disabled="loading") Редактировать

    modal-window(v-show="showModal" @close="showModal = false")
</template>

<script>
import { mapGetters } from 'vuex'
import ModalWindow from '@/components/modalWin/ModalWindow'
import ProfileUserData from './ProfileUserData'
import ProfileBornData from './ProfileBornData'

export default {
  name: 'Profile',

  components: {
    'modal-window': ModalWindow,
    'profile-user-data': ProfileUserData,
    'profile-born-data': ProfileBornData
  },

  data () {
    return {
      showModal: false
    }
  },

  computed: {
    ...mapGetters(['error', 'loading', 'isAuthenticated'])
  },

  methods: {
    updateBornData () {
      this.$store.dispatch('addBornData', { date: this.bornDate, weight: this.bornWeight, height: this.bornHeight })
    }
  }
}
</script>

<style lang="postcss">
  .form--profile {
    max-width: 100%;
  }

  .form-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 20px;
  }

  .form-content {
    display: grid;
    grid-template-areas: "userData bornData"
                          ". button";
    background: rgba(255, 255, 255, 0.3);
  }

  .form-section {
    position: relative;
    width: 100%;
    max-width: 300px;
    padding: 60px 25px 25px;
    border: 0;
  }

  .form-section:nth-child(1) {
    grid-area: userData;
  }

  .form-section:nth-child(2) {
    grid-area: bornData;
  }

  .form-section--button {
    grid-area: button;
    display: flex;
    justify-content: flex-end;
    padding: 15px 25px;
  }

  .form-title {
    position: absolute;
    top: 20px;
    left: 15px;
    font-weight: bold;
  }
</style>
