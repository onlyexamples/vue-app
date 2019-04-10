<template lang="pug">
  fieldset.form-section
    legend.form-title Личные данные:

    .form-field
      label.label(for="user_name") Имя
      input.field(id="user_name" name="name" type="text" placeholder="Введите Ваше имя" v-model="name" :disabled="!editableMode")

    .form-field
      label.label(for="user_email") Элекронная почта
      input.field(id="user_email" name="userEmail" type="text" placeholder="Введите e-mail" v-model="email" required :disabled="!editableMode")

    //- .form-field
    //-   label.label(for="user_password") Пароль
    //-   input.field(id="user_password" name="userPassword" type="password" placeholder="Введите пароль" v-model="password" required)
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',

  data () {
    return {
      'name': '',
      'email': ''
      // 'password': ''
    }
  },

  props: {
    editableMode: {
      type: Boolean,
      require: true
    }
  },

  computed: {
    ...mapGetters(['userSettings'])
  },

  created () {
    this.name = this.userSettings.name
    this.email = this.userSettings.email
    // this.password = this.userSettings.password
  }
}
</script>

<style lang="postcss">
</style>
