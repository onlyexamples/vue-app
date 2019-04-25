<template lang="pug">
  .timeline
    //- born-data(:bornData="bornData")
    div.timeline-scale
      timeline-buttons(v-if="isMonthListExist" :changeActiveItem="changeActiveItem")
      timeline-list(
        :isMonthListExist="isMonthListExist"
        :months="months"
        :isActiveItem="isActiveItem"
        :showModal="showModal"
        @showModalWindow="showModalWindow"
      )

      .timeline__empty-month(v-if="isMonthListExist && activeEmptyItem")
        p Данные {{ activeEmptyItem }}-го месяца отсутствуют.
        button.button.button--transparent(@click="showModalWindow(activeEmptyItem)") + Добавить данные

    modal-window(
      v-show="showModal"
      @close="showModal = false"
      :activeItemData="activeItemData"
      :isExistsMonth="isExistsMonth"
    )
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
      isExistsMonth: false,
      isActiveItem: 1,
      activeItemData: {},
      showModal: false
    }
  },

  computed: {
    ...mapGetters(['bornData', 'months']),

    activeEmptyItem () {
      if (!this.months[this.isActiveItem]) { return this.isActiveItem }
    },

    isMonthListExist () {
      return Object.keys(this.months).length > 0
    }
  },

  methods: {
    changeActiveItem (num) {
      this.isActiveItem = num
    },

    showModalWindow (monthNumber) {
      this.showModal = true

      if (monthNumber) {
        const currentMonth = Object.keys(this.months).find(item => item === monthNumber)

        if (currentMonth) {
          this.activeItemData = this.months[currentMonth]
          this.isExistsMonth = true
        } else {
          this.activeItemData = { monthNumber }
          this.isExistsMonth = false
        }
      }
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

  .timeline__empty-month {
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
