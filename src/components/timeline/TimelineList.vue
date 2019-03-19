<template lang="pug">
  ul.timeline-list
    timeline-item(v-for="month in months" :month="month" :key="month.id" :id="`item-${month.id}`" :class="{ 'timeline-item--active': isActiveItem == month.id }")
</template>

<script>
import { mapGetters } from 'vuex'
import TimelineItem from '@/components/timeline/TimelineItem'

export default {
  name: 'TimelineList',

  components: {
    'timeline-item': TimelineItem
  },

  data () {
    return {
      isActiveItem: 1
    }
  },

  computed: {
    ...mapGetters([
      'months'
    ])
  },

  created () {
    this.$store.dispatch('loadMonths')
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
</style>
