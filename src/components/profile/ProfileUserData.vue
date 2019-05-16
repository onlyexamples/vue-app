<template lang="pug">
  form.form.form--profile(:class="{ 'form--editable': !editableMode }" @submit.prevent="saveUserData")
    legend.form-title Личные данные:

    .form-field(:class="{ 'form-field--error': $v.email.$error }")
      label.label(for="email") Элекронная почта
      input.field(
        id="email"
        name="email"
        type="email"
        placeholder="Введите e-mail"
        v-model="email"
        :disabled="!editableMode"
        @change="$v.email.$touch()"
        required
      )
      input-error(:fieldRequired="!$v.email.required" :emailIncorrect="!$v.email.email")

    .form-field
      label.label(for="old_password") Текущй пароль
      input.field(
        id="old_password"
        name="old_password"
        type="password"
        :placeholder="editableMode ? 'Введите старый пароль' : '******'"
        v-model="oldPassword"
        :disabled="!editableMode"
        @change="$v.oldPassword.$touch()"
      )
      input-error(
        :fieldRequired="!$v.oldPassword.required"
        :passwordIsShort="!$v.oldPassword.minLength"
        :passwordLength="$v.oldPassword.$params.minLength.min"
      )

    .form-field(v-if="editableMode")
      label.label(for="new_password") Новый пароль
      input.field(
        id="new_password"
        name="new_password"
        type="password"
        placeholder="Введите новый пароль"
        v-model="newPassword"
        @change="$v.newPassword.$touch()"
      )
      input-error(
        :fieldRequired="!$v.newPassword.required"
        :passwordIsShort="!$v.newPassword.minLength"
        :passwordLength="$v.newPassword.$params.minLength.min"
      )

    .form-button
      button.button(v-if="editableMode" :disabled="loading" type="submit") {{ loading ? 'Загрузка...' : 'Сохранить' }}
      button.button.button--transparent(@click="toggleEditFields" type="button") {{ editableMode ? 'Отмена' : 'Редактировать' }}

    notifier(
      v-if="error || submitStatus"
      :class="{ 'notify--error': submitStatus === 'ERROR' }"
      :submitStatus="submitStatus"
    )
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import InputError from '@/components/elements/InputError'
import Notifier from '@/components/Notifier'

export default {
  name: 'ProfileUserData',

  components: {
    'input-error': InputError,
    'notifier': Notifier
  },

  data () {
    return {
      email: '',
      oldPassword: '',
      newPassword: '',
      editableMode: false,
      submitStatus: null
    }
  },

  validations: {
    email: {
      required,
      email
    },

    oldPassword: {
      minLength: minLength(6)
    },

    newPassword: {
      minLength: minLength(6)
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
      this.$v.$touch()

      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$store.dispatch('changeUserProfileData', {
          email: this.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
          .then(() => {
            this.submitStatus = 'OK'
            this.toggleEditFields()
          })
          .catch((error) => {
            this.submitStatus = error.message
          })
      }
    }
  }
}
</script>

<style lang="postcss">
</style>
