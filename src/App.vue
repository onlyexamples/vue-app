<template lang="pug">
  main#app
    nav.header-nav
      navigation
    .content
      //- router-view(:months="months" :bornData="bornData")
      router-view
</template>

<script>
import Navigation from '@/components/Navigation'
import Timeline from '@/components/timeline/Timeline'

export default {
  name: 'App',

  components: {
    'navigation': Navigation,
    'timeline': Timeline
  }
}
</script>

<style lang="postcss">
@import "normalize-css/normalize.css";

  :root {
  --font-color: #4A6572;
  --title-color: darkcyan;
  --primary-color: #b715a2;
  --second-color: #F9AA33;
  --bg-color: #fca5f1;
  --bg-color--2: #b5ffff;
  --main-gradient: linear-gradient(45deg, var(--bg-color), var(--bg-color--2));
  --disable-color: rgb(202, 202, 202);
  }

  * {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    background: var(--main-gradient);
    color: var(--font-color);
    /* font-family: "Yanone Kaffeesatz", sans-serif;
    font-family: "Ropa Sans", sans-serif; */
    font-family: "Nord", sans-serif;
    font-size: 14px;
  }

  .header-nav {
    position: fixed;
    z-index: 10;
    width: 100%;
  }

  .content {
    padding: 70px 15px 20px 15px;
  }

  .title {
    margin: 0 0 25px;
    color: var(--title-color);
    font-size: 1.4em;
  }

  .form-overlay {
    padding: 20px 15px;
    background: rgba(255, 255, 255, 0.3);
   }

  .form-field {
    width: 100%;
    margin-bottom: 25px;
  }

  .form-field--error {
    color: tomato;
  }

  .label {
    color: currentColor;
    font-size: 12px;
  }

  .field {
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    border: 0;
    border-bottom: 1px solid var(--primary-color);
    background: transparent;
    outline: var(--bg-color--2);
    font-size: 14px;
  }

  .field:focus {
    border-bottom-color: transparent;
    box-shadow: 0 0 5px var(--bg-color);
  }

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

  form .button:disabled {
    background: var(--disable-color);
    box-shadow: none;
    text-shadow: none;
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
