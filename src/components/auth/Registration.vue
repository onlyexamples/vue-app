<template lang="pug">
  .registration
    form.form(name="registration-form" @submit.prevent="signUp")
      h1.title Регистрация

      .form-overlay
        .form-field.form-field--error
          span(v-if="error" :value="error") {{ error.message }}

        .form-field
          label.label Элекронная почта
          input.field(name="email" type="text" placeholder="Введите e-mail" v-model="email" required)

        .form-field
          label.label Пароль
          input.field(name="password" type="password" placeholder="Введите пароль" v-model="password" required)

        .form-field
          label.label Подтверждение
          input.field(name="confirm_password" type="password" placeholder="Повторите пароль" v-model="confirmPassword" required)

        .form-field
          label.label
            input.checkbox(type="checkbox")
            | Я согласен с правилами

        button.button(:disabled="loading") Зарегистрироваться
</template>

<script>
export default {
  name: 'Registration',

  data () {
    return {
      email: null,
      password: null,
      confirmPassword: null
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
      if (val === true) {
        this.$router.push('/timeline')
      }
    }
  },

  methods: {
    signUp () {
      this.$store.dispatch('signUp', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="postcss">
  .registration {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
