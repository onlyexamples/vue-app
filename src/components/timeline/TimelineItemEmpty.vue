<template lang="pug">
  li.timeline-item.timeline-item--empty
    p Данные {{ monthNumber }}-го месяца отсутствуют.
    button.button.button--transparent(@click="openModalWindow") + Добавить данные
</template>

<script>
export default {
  name: 'TimelineItemEmpty',

  props: {
    monthNumber: {
      type: Number,
      required: true
    }
  },

  methods: {
    openModalWindow () {
      this.$emit('openModalWindow')
    }
  }
}
</script>

<style lang="postcss">
  .timeline-item--empty {
    flex-direction: column;
  }
</style>
