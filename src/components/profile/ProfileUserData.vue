<template lang="pug">
  form.form.form--profile(:class="{ 'form--editable': !editableMode }" name="user" @submit.prevent="saveUserData")
    legend.form-title Личные данные:

    .form-field.form-field--error
      span(v-if="error" :value="error") {{ error.message }}

    .form-field
      label.label(for="user_email") Элекронная почта
      input.field(id="user_email" name="user_email" type="text" placeholder="Введите e-mail" v-model="email" required :disabled="!editableMode")

    .form-field
      label.label(for="user_old_password") Текущй пароль
      input.field(id="user_old_password" name="user_old_password" type="password" :placeholder="editableMode ? 'Введите старый пароль' : '******'" v-model="oldPassword" :disabled="!editableMode")

    .form-field(v-if="editableMode")
      label.label(for="user_new_password") Новый пароль
      input.field(id="user_new_password" name="user_new_password" type="password" placeholder="Введите новый пароль" v-model="newPassword")

    .form-button
      button.button(v-if="editableMode" :disabled="loading" type="submit") {{ loading ? 'Загрузка...' : 'Сохранить' }}
      button.button.button--transparent(@click="toggleEditFields" type="button") {{ editableMode ? 'Отмена' : 'Редактировать' }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileUserData',

  data () {
    return {
      email: '',
      oldPassword: '',
      newPassword: '',
      editableMode: false
    }
  },

  computed: {
    ...mapGetters([
      'error',
      'loading',
      'userSettings'
    ])
  },

  created () {
    this.email = this.userSettings.email
  },

  methods: {
    toggleEditFields () {
      this.editableMode = !this.editableMode
    },

    saveUserData () {
      this.$store.dispatch('changeUserProfileData', {
        email: this.email,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      })
        .then(() => {
          this.toggleEditFields()
        })
    }
  }
}
</script>

<style lang="postcss">
</style>
