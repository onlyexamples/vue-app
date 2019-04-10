<template lang="pug">
  .timeline
    //- born-data(:bornData="bornData")
    div.timeline-scale
      timeline-buttons(v-if="isMonthsListExists")
      timeline-list(
        :isMonthsListExists="isMonthsListExists"
        :months="months"
        :showModal="showModal"
        @showModalWindow="showModalWindow"
      )

    modal-window(v-show="showModal" @close="showModal = false")
</template>

<script>
import { mapGetters } from 'vuex'
import BornData from '@/components/born/BornData'
import TimelineButtons from '@/components/timeline/TimelineButtons'
import TimelineList from '@/components/timeline/TimelineList'
import ModalWindow from '@/components/modalWin/ModalWindow'

export default {
  name: 'Timeline',

  components: {
    'born-data': BornData,
    'timeline-buttons': TimelineButtons,
    'timeline-list': TimelineList,
    'modal-window': ModalWindow
  },

  data () {
    return {
      showModal: false,
      monthsLength: 0
    }
  },

  computed: {
    ...mapGetters(['bornData', 'months']),

    isMonthsListExists () {
      if (this.monthsLength > 0) {
        return true
      }
      return false
    }
  },

  created () {
    this.monthsLength = Object.keys(this.months).length
  },

  methods: {
    showModalWindow () {
      this.showModal = true
    }
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
