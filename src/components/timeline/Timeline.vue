<template lang="pug">
  .timeline
    //- born-data(:bornData="bornData")
    div.timeline-scale
      timeline-buttons(v-if="isMonthListExist" :changeActiveItem="changeActiveItem")
      timeline-list(
        v-if="isMonthListExist"
        :isMonthListExist="isMonthListExist"
        :months="months"
        :isActiveItem="isActiveItem"
        :showModal="showModal"
        @showModalWindow="showModalWindow"
      )

      .timeline-message(v-if="!isMonthListExist")
        .timeline-list__text
          | Данные отсутствуют.
          br
          | Для заполнения данных перейдите в #[router-link.link(to="/profile") профиль]

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
