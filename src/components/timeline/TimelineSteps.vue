<template lang="pug">
  ul.timeline-steps
    li.timeline-step(v-for="step in 12" :key="step" :class="{ 'timeline-step--active': isActive == step }" @click="changeActiveStep(step)")
      .timeline-step__line
      .timeline-step__line
      .timeline-step__line
      .timeline-step__line
      button.timeline-step__button {{ step }}
</template>

<script>
export default {
  name: 'TimelineSteps',

  data () {
    return {
      isActive: 1
    }
  },

  methods: {
    changeActiveStep (newStep) {
      this.slideStep(newStep)
      this.isActive = newStep
    },

    slideStep (newStep) {
      const list = document.querySelector('.timeline-list')
      const item = document.getElementById(`item-${newStep}`)

      if (list.getAttribute('style')) { list.removeAttribute('style') }
      list.style.marginTop = `${-item.offsetTop}px`

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

<style lang="postcss">
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
    margin-bottom: 5px;
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
    opacity: 0.5;
    outline: none;
    font-weight: bold;
  }

  .timeline-step--active .timeline-step__button,
  .timeline-step__button:hover {
    transform: scale(1.4);
    opacity: 1;
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
