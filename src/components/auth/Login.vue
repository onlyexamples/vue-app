<template lang="pug">
  .login
    form.login-form(name="login-form" autocomplete="on")
      h1.login-title Вход

      .form-overlay
        .form-field
          label.label
            | Элекронная почта
            input.field(type="text" placeholder="Введите e-mail")

        .form-field
          label.label
            | Пароль
            input.field(type="password" placeholder="Введите пароль")

      button.button Войти
</template>

<script>
export default {
  name: 'Login'
}
</script>
