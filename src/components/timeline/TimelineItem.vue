<template lang="pug">
  li.timeline-item
    img.timeline-item__photo(:src="getImgUrl(month.photo)")
    //- img.timeline-item__photo(:src="`@/assets/images/photos/${month.photo}`")
    //- .timeline-item__photo(:style="{ backgroundImage: `url(${require(`@/assets/images/photos/${month.photo}`)})` }")

    .timeline-item__sizes
      .timeline-item__size.timeline-item__size--height
        span {{ month.height }} см
        img(src="@/assets/images/icons/ruler.svg")

      .timeline-item__size.timeline-item__size--weight
        span {{ month.weight }} кг
        img(src="@/assets/images/icons/weight-tool.svg")

      .timeline-item__tooth(v-if="month.tooth")
        span.timeline-item__tooth-count +{{ month.tooth }}
</template>

<script>
export default {
  name: 'TimelineItem',

  props: ['month'],

  methods: {
    getImgUrl (url) {
      const images = require.context('@/assets/images/photos/', false, /\.jpg$/)
      return images(`./${url}`)
    }
  }
}
</script>

<style lang="postcss">
  .timeline-item {
    position: absolute;
    top: 0;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    width: 100vw;
    height: 100vh;
    padding: 70px 80px 20px 15px;
    transition: opacity 0.6s;
  }

  .timeline-item--active {
    opacity: 1;
  }

  .timeline-item__photo {
    overflow: hidden;
    max-width: 700px;
    max-height: 500px;
    width: 100%;
    height: 90%;
    object-fit: contain;
    /* background-size: contain;
    background-repeat: no-repeat;
    background-position: center; */
  }

  .timeline-item__sizes {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .timeline-item__size {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
    border-radius: 50%;
    border: 3px solid var(--bg-color);
    background: white;
    font-weight: bold;
  }

  .timeline-item--active .timeline-item__size,
  .timeline-item--active .timeline-item__tooth {
    animation: pulse 1.5s forwards;
    transition: all .4s;
  }

  .timeline-item--active .timeline-item__size:nth-child(2) {
    animation-delay: 500ms;
  }

  .timeline-item--active .timeline-item__tooth {
    animation-delay: 1000ms;
  }

  .timeline-item__size img {
    width: 22px;
    height: 22px;
  }

  .timeline-item__tooth {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 70px;
    background: url("~@/assets/images/icons/tooth.svg") no-repeat center;
    font-weight: bold;
  }

  .timeline-item__tooth-count {
    margin-top: -8px;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    70% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
