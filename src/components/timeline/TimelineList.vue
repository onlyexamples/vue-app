<template lang="pug">
  ul.timeline-list
    timeline-item(
      v-for="(month, key) in months"
      :month="month"
      :key="key"
      :id="`item-${key}`"
      :class="{ 'timeline-item--active': isActiveItem == key }"
      @openModalWindow="$emit('showModalWindow', key)"
    )

    li.timeline-list__item(v-if="activeEmptyItem")
      p Данные {{ activeEmptyItem }}-го месяца отсутствуют.
      button.button.button--transparent(@click="$emit('showModalWindow', activeEmptyItem)") + Добавить данные

</template>

<script>
import TimelineItem from '@/components/timeline/TimelineItem'

export default {
  name: 'TimelineList',

  components: {
    'timeline-item': TimelineItem
  },

  props: {
    isActiveItem: {
      type: Number,
      required: true
    },

    months: {
      type: Object,
      required: true
    },

    showModal: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    activeEmptyItem () {
      if (!this.months[this.isActiveItem]) { return this.isActiveItem }
    }
  }
}
</script>

<style lang="postcss">
  .timeline-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
    transition: all 1s;
  }

  .timeline-list__item {
    position: absolute;
    z-index: 5;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    padding: 70px 80px 20px 15px;
    transition: opacity 0.6s;
  }
</style>
