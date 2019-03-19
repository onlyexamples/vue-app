<template lang="pug">
  fieldset.form-section
    legend.form-title Личные данные:

    .form-field
      label.label(for="user_name") Имя
      input.field(id="user_name" name="name" type="text" placeholder="Введите Ваше имя" v-model="name")

    .form-field
      label.label(for="user_email") Элекронная почта
      input.field(id="user_email" name="userEmail" type="text" placeholder="Введите e-mail" v-model="email" required)

    .form-field
      label.label(for="user_password") Пароль
      input.field(id="user_password" name="userPassword" type="password" placeholder="Введите пароль" v-model="password" required)
</template>

<script>
export default {
  name: 'Profile',

  data () {
    return {
      'name': '',
      'email': '',
      'password': ''
    }
  }
}
</script>
<style lang="postcss">
</style>
