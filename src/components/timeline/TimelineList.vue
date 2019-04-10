<template lang="pug">
  ul.timeline-list(v-if="isMonthsListExists")
    timeline-item(
      v-for="(month, key) in months"
      :month="month"
      :key="key"
      :id="`item-${key}`"
      :class="{ 'timeline-item--active': isActiveItem == key }"
      @openModalWindow="$emit('showModalWindow')"
    )

    timeline-item-empty(
      v-for="monthNumber in emptyMonths"
      :monthNumber="countMounthNumber(monthNumber)"
      :key="countMounthNumber(monthNumber)"
      :id="`item-${countMounthNumber(monthNumber)}`"
      @openModalWindow="$emit('showModalWindow')"
    )

  .timeline-list--empty(v-else="isMonthsListExists")
    .timeline-list__text
      | Данные отсутствуют.
      br
      | Для заполнения данных перейдите в #[router-link.link(to="/profile") профиль]
</template>

<script>
// import Vue from 'vue'
import TimelineItem from '@/components/timeline/TimelineItem'
import TimelineItemEmpty from '@/components/timeline/TimelineItemEmpty'

export default {
  name: 'TimelineList',

  components: {
    'timeline-item': TimelineItem,
    'timeline-item-empty': TimelineItemEmpty
  },

  data () {
    return {
      isActiveItem: 1,
      monthsLength: 0,
      emptyMonths: 0,
      emptyMonthsArr: []
    }
  },

  props: {
    months: {
      type: Object,
      required: true
    },

    isMonthsListExists: {
      type: Boolean,
      required: true
    },

    showModal: {
      type: Boolean,
      required: true
    }
  },

  created () {
    this.monthsLength = Object.keys(this.months).length
    this.emptyMonths = 12 - this.monthsLength
  },

  methods: {
    countMounthNumber (monthNumber) {
      return this.monthsLength + monthNumber
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
