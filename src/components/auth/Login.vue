<template lang="pug">
  .login
    form.login-form(name="login-form" autocomplete="on" @submit.prevent="login")
      h1.title Вход

      .form-overlay
        .form-field
          label.label
            | Элекронная почта
            input.field(name="email" type="text" placeholder="Введите e-mail" v-model="email" required)

        .form-field
          label.label
            | Пароль
            input.field(name="password" type="password" placeholder="Введите пароль" v-model="password" required)

        button.button(type="submit") Войти
</template>

<script>
export default {
  name: 'Login',

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
    signIn () {
      this.$store.dispatch('signIn', { email: this.email, password: this.password })
    }
  }
}
</script>

<style lang="postcss">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .login-form {
    width: 100%;
    max-width: 300px;
  }
</style>
