<template lang="pug">
  ul.timeline-list(v-if="isMonthListExist")
    timeline-item(
      v-for="(month, key) in months"
      :month="month"
      :key="key"
      :id="`item-${key}`"
      :class="{ 'timeline-item--active': isActiveItem == key }"
      @openModalWindow="$emit('showModalWindow', key)"
    )

  .timeline-list--empty(v-else="isMonthListExist")
    .timeline-list__text
      | Данные отсутствуют.
      br
      | Для заполнения данных перейдите в #[router-link.link(to="/profile") профиль]
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

    isMonthListExist: {
      type: Boolean,
      required: true
    },

    showModal: {
      type: Boolean,
      required: true
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

  .timeline-list--empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 15px;
    background: rgba(255, 255, 255, 0.3);
  }

  .timeline-list__text {
    text-align: center;
    font-size: 16px;
    line-height: 1.4;
  }
</style>
