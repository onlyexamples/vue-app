<template lang="pug">
  main#app
    nav.header-nav
      navigation
    .content
      //- router-view(:months="months" :bornData="bornData")
      router-view
</template>

<script>
import Navigation from '@/components/Navigation'
import Timeline from '@/components/timeline/Timeline'

export default {
  name: 'App',

  components: {
    'navigation': Navigation,
    'timeline': Timeline
  }
}
</script>

<style lang="postcss">
@import "normalize-css/normalize.css";

  :root {
  --font-color: #4A6572;
  --title-color: darkcyan;
  --second-color: #F9AA33;
  --primary-color: #b715a2;
  --bg-color: #fca5f1;
  --bg-color--2: #b5ffff;
  --main-gradient: linear-gradient(45deg, var(--bg-color), var(--bg-color--2));
  }

  * {
    box-sizing: border-box;
  }

  body {
    min-height: 100vh;
    background: var(--main-gradient);
    color: var(--font-color);
    font-family: "Yanone Kaffeesatz", sans-serif;
    font-family: "Ropa Sans", sans-serif;
    font-family: "Nord", sans-serif;
    font-size: 14px;
  }

  .header-nav {
    position: fixed;
    z-index: 10;
    width: 100%;
  }

  .content {
    padding: 70px 15px 20px 15px;
  }

  .title {
    margin: 0 0 25px;
    color: var(--title-color);
    font-size: 1.4em;
  }
</style>
