<template lang="pug">
  button.button {{ text }}
</template>

<script>
export default {
  name: 'Button',

  props: ['text']
}
</script>

<style lang="postcss" scoped>
  .button {
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

  .button:focus {
    box-shadow: 0 0 15px var(--primary-color);
  }

  /* .button--edit {
    width: 25px;
    height: 25px;
    background: url("~@/assets/images/icons/edit.svg") no-repeat center;
    background-size: cover;
  } */
</style>
