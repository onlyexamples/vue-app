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
  --primary-color: #6f59ae;
  --title-color: var(--primary-color);
  /* --primary-color: #b715a2; */
  --second-color: #F9AA33;
  --bg-color: #fca5f1;
  --bg-color--2: #b5ffff;
  --main-gradient: linear-gradient(45deg, var(--bg-color), var(--bg-color--2));
  --second-gradient: linear-gradient(to right, #6f59ae, #AA59C6);
  /* --second-gradient: linear-gradient(to right, #444991, #7552aa);
  --second-gradient: linear-gradient(to right, #C55EB6, #FF698B); */
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

  .form {
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

  .form-field--twice {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-field__part {
    display: flex;
    flex-direction: column;
    width: 48%;
  }

  .form-field--error {
    color: tomato;
  }

  .label {
    display: block;
    margin-bottom: 10px;
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

  .field:focus {
    border-bottom-color: transparent;
    box-shadow: 0 0 5px var(--primary-color);
  }

  .button-upload,
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 25px;
    border: 0;
    border-radius: 30px;
    background: var(--second-gradient);
    color: white;
    outline: none;
    font-weight: bold;
  }

  .button--delete {
    width: 25px;
    height: 30px;
    padding: 0;
    color: var(--primary-color);
    background: url("~@/assets/images/icons/delete.svg") center no-repeat;
    background-size: cover;
    text-indent: -9999px;
  }

  .button-upload {
    max-width: 180px;
    padding: 0;
    color: var(--primary-color);
    cursor: pointer;
    border: 1px solid;
    background: none;
  }

  .button-upload__text {
    padding: 10px 15px 10px 40px;
    background: url("~@/assets/images/icons/image.svg") 10px center no-repeat;
    background-size: 20px;
  }

  .button-upload:focus,
  .button:focus {
    box-shadow: 5px 5px 40px var(--primary-color);
  }

  .button-upload:disabled,
  .button:disabled {
    background: var(--disable-color);
    box-shadow: none;
  }

  .button-upload__info {
    display: flex;
    justify-content: space-beatween;
    margin-bottom: 15px;
  }

  .button-upload__file {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 15px;
  }

  .checkbox {
    margin-right: 5px;
    vertical-align: middle;
    outline: none;
  }

  .checkbox:focus {
    box-shadow: 0 0 5px var(--primary-color);
  }

  .button-upload {
    position: relative;
    overflow: hidden;
  }

  .button-upload input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: 30px;
    opacity: 0;
  }
</style>
