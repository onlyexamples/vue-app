<template lang="pug">
  .errors
    .error(v-if="fieldRequired && fieldIsEmpty") Это поле обязательное
    .error(v-if="emailIncorrect") Введите корректное значение (пример: user@test.com)
    .error(v-if="passwordIsShort") Пароль должен содержать не менее {{ passwordLength }} символов
    .error(v-if="confirmPasswordIsWrong") Значение поля не совпадает с паролем
</template>

<script>
export default {
  name: 'InputError',

  props: {
    fieldRequired: {
      type: Boolean,
      required: true
    },

    emailIncorrect: {
      type: Boolean
    },

    passwordIsShort: {
      type: Boolean
    },

    passwordLength: {
      type: Number
    },

    confirmPasswordIsWrong: {
      type: Boolean
    }
  },

  computed: {
    fieldIsEmpty () {
      return !this.emailIncorrect && !this.passwordIsShort && !this.confirmPasswordIsWrong
    }
  }
}
</script>

<style lang="postcss">
  .form-field .error {
    display: none;
    margin-top: 5px;
    color: var(--color-error);
    font-size: 12px;
  }

  .form-field--error .error {
    display: block;
  }
</style>
