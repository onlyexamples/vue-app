<template lang="pug">
  .timeline.page
    born-data(:bornData="bornData")

    .timeline-scale
      timeline-list(
        v-if="isMonthListExist"
        :months="months"
        :isActiveItem="isActiveItem"
        :showModal="showModal"
        @showModalWindow="showModalWindow"
      )

      timeline-buttons(v-if="isMonthListExist" :changeActiveItem="changeActiveItem")

      .timeline-message(v-if="!isMonthListExist")
        .timeline-list__text
          | Данные отсутствуют.
          br
          | Для заполнения данных перейдите в #[router-link.link(to="/profile") профиль]

    modal-window(
      v-show="showModal"
      @close="showModal = false"
      @showCurrentMonthData="showCurrentMonthData"
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

    isMonthListExist () {
      if (this.months) {
        return Object.keys(this.months).length > 0
      }
      return false
    }
  },

  methods: {
    changeActiveItem (num) {
      this.isActiveItem = num
    },

    showModalWindow (monthNumber) {
      this.showModal = true
      this.showCurrentMonthData(monthNumber)
    },

    showCurrentMonthData (monthNumber) {
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
    align-self: stretch;
  }

  .timeline-scale {
    display: flex;
    align-items: center;
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
  }

  .timeline-message {
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
