<template lang="pug">
  .timeline
    //- born-data(:bornData="bornData")
    div.timeline-scale
      timeline-buttons
      timeline-list
</template>

<script>
import { mapGetters } from 'vuex'
import BornData from '@/components/born/BornData'
import TimelineButtons from '@/components/timeline/TimelineButtons'
import TimelineList from '@/components/timeline/TimelineList'

export default {
  name: 'Timeline',

  components: {
    'born-data': BornData,
    'timeline-buttons': TimelineButtons,
    'timeline-list': TimelineList
  },

  computed: {
    ...mapGetters([
      'bornData'
    ])
  },

  created () {
    this.$store.dispatch('getBornData')
  }
}
</script>

<style lang="postcss">
  .timeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    margin: -70px -15px -20px -15px;
  }

  .timeline-scale {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
