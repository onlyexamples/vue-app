<template lang="pug">
  .timeline-buttons
    .timeline-steps__wrap
      button.timeline-arrow.timeline-arrow--top(@click="slideStepsBtn" :disabled="isDisabledTopArrow") &#11165;
      button.timeline-arrow.timeline-arrow--bottom(@click="slideStepsBtn" :disabled="isDisabledBottomArrow") &#11167;

      ul.timeline-steps(ref="timelineSteps")
        li.timeline-step(
          v-for="step in 12"
          :key="step"
          :ref="`timelineStep-${step}`"
          :class="{ 'timeline-step--active': isActive == step }"
          @click="changeActiveStep(step)"
        )
          .timeline-step__line
          .timeline-step__line
          .timeline-step__line
          .timeline-step__line

          button.timeline-step__button {{ step }}
</template>

<script>
export default {
  name: 'TimelineButtons',

  data () {
    return {
      isDisabledTopArrow: true,
      isDisabledBottomArrow: false,
      isActive: 1
    }
  },

  methods: {
    slideStepsBtn (e) {
      const slider = this.$refs.timelineSteps
      const slide = slider.querySelectorAll('.timeline-step')
      const slideHeight = slide[0].offsetHeight
      const isTopArrow = e.currentTarget.classList.contains('timeline-arrow--top')
      const sliderShift = slider.offsetTop
      const visibleSlides = 4
      const sliderEndShift = -(((slide.length - visibleSlides) * slideHeight) - slideHeight)

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
    },

    changeActiveStep (newStep) {
      this.slideStep(newStep)
      this.isActive = newStep
    },

    slideStep (newStep) {
      const item = document.getElementById(`item-${newStep}`)

      this.changeActiveItem(item)
    },

    changeActiveItem (item) {
      const activeClass = 'timeline-item--active'

      document.querySelector(`.${activeClass}`).classList.remove(activeClass)
      item.classList.add(activeClass)
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
    z-index: 15;
    top: 75px;
    bottom: 75px;
    right: 0;
    height: calc(90px * 4);
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

  .timeline-steps {
    margin: 0;
    padding: 0;
    transition: all .2s;
  }

  .timeline-step {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 50px;
    height: 90px;
    border-right: 2px solid white;
  }

  .timeline-step__button {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 5px 10px;
    border: 0;
    background: transparent;
    transition: all .4s;
    color: inherit;
    text-align: left;
    outline: none;
    font-weight: bold;
  }

  .timeline-step--active .timeline-step__button,
  .timeline-step__button:hover:not(:disabled) {
    color: var(--primary-color);
    transform: scale(1.4);
  }

  .timeline-step__line {
    width: 10px;
    height: 2px;
    margin-top: 20px;
    background: white;
  }

  .timeline-step__line:nth-child(4) {
    width: 20px;
  }
</style>
