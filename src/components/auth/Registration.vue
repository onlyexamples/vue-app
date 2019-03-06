<template lang="pug">
  .registration
    form.registration-form(name="registration-form" autocomplete="on")
      h1.title Регистрация

      .form-overlay
        .form-field
          label.label
            | Элекронная почта
            input.field(type="text" placeholder="Введите e-mail")

        .form-field
          label.label
            | Пароль
            input.field(type="password" placeholder="Введите пароль")

        .form-field
          label.label
            input.checkbox(type="checkbox")
            | Я согласен с правилами

        button.button Зарегистрироваться
        //- v-button(:text="Зарегистрироваться")
</template>

<script>
// import Button from '@/components/forms/Button'

export default {
  // name: 'Registration',

  // components: {
  //   'v-button': Button
  // }
}
</script>

<style lang="postcss">
  .registration,
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .login-form,
  .registration-form {
    width: 100%;
    max-width: 300px;
  }

  .form-overlay {
    padding: 20px 15px;
    background: rgba(255, 255, 255, 0.3);
   }

  .form-field {
    width: 100%;
    margin-bottom: 25px;
  }

  .label {
    color: currentColor;
    font-size: 12px;
  }

  .field {
    width: 100%;
    padding: 10px;
    border: 0;
    border-bottom: 1px solid var(--primary-color);
    background: transparent;
    outline: var(--bg-color--2);
    font-size: 14px;
  }

  /* .form-field:has(.field:focus) {
    box-shadow: 0 0 15px var(--primary-color);
  } */

  form .button {
    display: flex;
    align-items: center;
    padding: 10px 25px;
    border: 0;
    border-radius: 30px;
    background: var(--main-gradient);
    color: white;
    text-shadow: 0 0 3px var(--primary-color);
    box-shadow: 0 0 5px var(--primary-color);
    outline: none;
    font-weight: bold;
  }

  form .button:focus {
    box-shadow: 0 0 15px var(--primary-color);
  }

  .checkbox {
    margin-right: 5px;
    vertical-align: middle;
    outline: none;
  }

  .checkbox:focus {
    box-shadow: 0 0 5px var(--primary-color);
  }
</style>
