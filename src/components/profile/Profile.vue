<template lang="pug">
  .profile

    form.form.form--profile(:class="{ 'form--editable': !editableMode }" ref="profileForm" name="user" @submit.prevent="saveUserData")
      .form-header
        h1.title Профиль
        button.button(@click="showModal = true") + Добавить месяц

      .form-content
        profile-user-data(:editableMode="editableMode")
        profile-born-data(:editableMode="editableMode")

        .form-section--button
          button.button.button--transparent(v-if="!editableMode" @click="toggleEditFields" type="button") Редактировать
          button.button(v-if="editableMode" :disabled="loading" @click="sentData" type="submit") Сохранить

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
      showModal: false,
      editableMode: false
    }
  },

  computed: {
    ...mapGetters(['error', 'loading', 'isAuthenticated'])
  },

  methods: {
    toggleEditFields () {
      this.editableMode = !this.editableMode
    },

    sentData () {
      this.toggleEditFields()
    },

    saveUserData () {
      // this.$store.dispatch('addBornData', { date: this.bornDate, weight: this.bornWeight, height: this.bornHeight })
      this.$store.dispatch('changeUserProfileData', {
        name: this.name,
        email: this.email,
        password: this.password,
        date: this.bornDate,
        weight: this.bornWeight,
        height: this.bornHeight
      })
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
