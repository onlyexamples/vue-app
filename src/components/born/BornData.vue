<template lang="pug">
  .born-data(v-if=`!bornData.editing`)
    .born-data__item.born-data__item--date
      strong.born-data__label Дата рождения:
      | {{ bornData.date }}
    .born-data__item.born-data__item--weight
      strong.born-data__label Вес:
      | {{ bornData.weight }}
    .born-data__item.born-data__item--height
      strong.born-data__label Рост:
      | {{ bornData.height }}
    button.button.button--edit(v-on:click=`bornData.editing=!bornData.editing` title="edit")
</template>

<script>
export default {
  name: 'BornData',

  props: {
    bornData: {
      type: Object,
      require: true
    }
  }
}
</script>

<style lang="postcss">
  .born-data {
    display: flex;
    align-items: center;
    /* display: grid;
    grid-template-areas: "a b e"
                          "a c e"
                          "a d e";
    grid-template-columns: minmax(auto, 200px) auto;
    grid-gap: 10px; */
    /* margin-bottom: 100px; */
    height: 70px;
    margin-bottom: 40px;
    background: rgba(255,255,255,0.5);
  }

  .born-data__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
  }

  /* .born-data__item--date {
    grid-area: b;
  }

  .born-data__item--weight {
    grid-area: c;
  }

  .born-data__item--height {
    grid-area: d;
  } */

  .button--edit {
    /* grid-area: e; */
    margin: 15px;
  }

  .born-data__label {
    margin-bottom: 5px;
  }
</style>
