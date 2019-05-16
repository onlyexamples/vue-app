<template lang="pug">
  .profile.page
    header.profile-header
      h1.title Профиль
      button.button(@click="showModal = true") + Добавить месяц

    profile-user-data
    profile-born-data
    modal-window(v-show="showModal" @close="showModal = false")
</template>

<script>
import ModalWindow from '@/components/modalWin/ModalWindow'
import ProfileUserData from './ProfileUserData'
import ProfileBornData from './ProfileBornData'

export default {
  name: 'Profile',

  components: {
    'profile-user-data': ProfileUserData,
    'profile-born-data': ProfileBornData,
    'modal-window': ModalWindow
  },

  data () {
    return {
      showModal: false
    }
  }
}
</script>

<style lang="postcss">
  .profile {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
  }

  .form--profile {
    position: relative;
    width: 50%;
    margin: 0 15px 30px;
    padding: 60px 25px 25px;
    border: 0;
    background: rgba(255, 255, 255, 0.3);
  }

  .form-button {
    display: flex;
    justify-content: flex-end;
  }

  .form-button .button:last-child {
    margin-left: 15px;
  }

  .form-title {
    position: absolute;
    top: 20px;
    left: 15px;
    font-weight: bold;
  }
</style>
