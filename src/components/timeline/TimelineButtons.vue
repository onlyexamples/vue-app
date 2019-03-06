<template lang="pug">
  .timeline-buttons
    .timeline-arrows
      button.timeline-arrow.timeline-arrow--top(@click="slideStepsBtn" :disabled="isDisabledTopArrow") &#11165;
      button.timeline-arrow.timeline-arrow--bottom(@click="slideStepsBtn" :disabled="isDisabledBottomArrow") &#11167;
    .timeline-steps__wrap
      timeline-steps
</template>

<script>
import TimelineSteps from '@/components/timeline/TimelineSteps'

export default {
  name: 'TimelineButtons',

  components: {
    'timeline-steps': TimelineSteps
  },

  data () {
    return {
      isDisabledTopArrow: true,
      isDisabledBottomArrow: false
    }
  },

  methods: {
    slideStepsBtn (e) {
      // setTimeout()
      const slider = document.querySelector('.timeline-steps')
      const slide = document.getElementsByClassName('timeline-step')
      const isTopArrow = e.currentTarget.classList.contains('timeline-arrow--top')
      const sliderShift = slider.offsetTop
      const slideHeight = document.querySelector('.timeline-step').offsetHeight
      const visibleSlides = 4
      const sliderEndShift = -(((slide.length - visibleSlides) * slideHeight) - slideHeight)

      console.log(slider.style.transition)
      // console.log('sliderShift:', sliderShift)
      if (isTopArrow) {
        if (sliderShift >= -slideHeight) { this.isDisabledTopArrow = true }
        if (sliderShift >= (sliderEndShift - slideHeight)) { this.isDisabledBottomArrow = false }
        slider.style.marginTop = `${sliderShift + slideHeight}px`
      } else {
        if (sliderShift <= 0) { this.isDisabledTopArrow = false }
        if (sliderShift <= sliderEndShift) { this.isDisabledBottomArrow = true }
        slider.style.marginTop = `${sliderShift - slideHeight}px`
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
  button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;
  }

  .timeline-buttons {
    position: fixed;
    z-index: 5;
    top: 75px;
    bottom: 75px;
    right: 0;
    height: calc(95px * 4);
    margin: auto 15px;
  }

  .timeline-arrow {
    position: absolute;
    left: 12.5px;
    z-index: 15;
    width: 25px;
    height: 25px;
    background: url("~@/assets/images/icons/chevron-down.svg") center no-repeat;
    background-size: cover;
    transition: transform .2s;
    text-indent: 9999px;
    font-size: 40px;
    line-height: 1.1;
  }

  .timeline-arrow:disabled {
    opacity: 0.2;
  }

  .timeline-arrow:hover:not(:disabled) {
    transform: scale(1.4);
  }

  .timeline-arrow--top {
    top: -40px;
    transform: rotate(180deg);
  }

  .timeline-arrow--top:hover:not(:disabled) {
    transform: scale(1.5) rotate(180deg);
  }

  .timeline-arrow--bottom {
    bottom: -40px;
  }

  .timeline-steps__wrap {
    height: 100%;
    overflow: hidden;
  }
</style>
