<template lang="pug">
  .registration.page.page--centered
    form.form(name="registration-form" @submit.prevent="signUp")
      h1.title Регистрация

      .form-overlay
        .form-field(:class="{ 'form-field--error': $v.email.$error }")
          label.label Элекронная почта
          input.field(
            name="email" type="text"
            placeholder="Введите e-mail"
            v-model="email"
            @change="$v.email.$touch()"
            required
          )
          input-error(:fieldRequired="!$v.email.required" :emailIncorrect="!$v.email.email")

        .form-field(:class="{ 'form-field--error': $v.password.$error }")
          label.label Пароль
          input.field(
            name="password"
            type="password"
            placeholder="Введите пароль"
            v-model="password"
            @change="$v.password.$touch()"
            required
          )
          input-error(
            :fieldRequired="!$v.password.required"
            :passwordIsShort="!$v.password.minLength"
            :passwordLength="$v.password.$params.minLength.min"
          )

        .form-field(:class="{ 'form-field--error': $v.confirmPassword.$error }")
          label.label Подтверждение
          input.field(
            name="confirm_password"
            type="password"
            placeholder="Повторите пароль"
            v-model="confirmPassword"
            @change="$v.confirmPassword.$touch()"
            required
          )
          input-error(:fieldRequired="!$v.confirmPassword.required" :confirmPasswordIsWrong="!$v.confirmPassword.sameAsPassword")

        //- .form-field
        //-   label.label
        //-     input.checkbox(type="checkbox")
        //-     | Я согласен с #[a.link(href="#") правилами]

        button.button(type="submit" :disabled="loading") {{ loading ? 'Сохранение...' : 'Зарегистрироваться'}}

      notifier(
        v-if="error || submitStatus"
        :class="{ 'notify--error': submitStatus === 'ERROR' }"
        :submitStatus="submitStatus"
      )
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import InputError from '@/components/elements/InputError'
import Notifier from '@/components/Notifier'

export default {
  name: 'Registration',

  components: {
    'input-error': InputError,
    'notifier': Notifier
  },

  data () {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      submitStatus: null
    }
  },

  validations: {
    email: {
      required,
      email
    },

    password: {
      required,
      minLength: minLength(6)
    },

    confirmPassword: {
      sameAsPassword: sameAs('password')
    }
  },

  computed: {
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    },
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },

  watch: {
    isAuthenticated (val) {
      if (val) {
        this.$router.push('/timeline')
      }
    }
  },

  methods: {
    signUp () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.$store.dispatch('signUp', { email: this.email, password: this.password })
          .then(() => {
            this.submitStatus = 'OK'
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
