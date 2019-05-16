<template lang="pug">
  .notify
    i.notify__icon &#10004;
    span.notify__message(v-if="submitStatus === 'ERROR'") {{ error.message }}
</template>

<script>
export default {
  name: 'InputError',

  props: {
    submitStatus: {
      type: String
    },

    error: {
      type: String
    }
  }
}
</script>

<style lang="postcss">
  .notify {
    position: fixed;
    top: 15px;
    right: 15px;
    display: flex;
    align-items: center;
    min-width: 180px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.9);
    font-weight: bold;
  }

  .notify--error {
    color: var(--color-error);
  }

  .notify--success {
    color: var(--color-success);
  }

  .notify__icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
</style>
