<template lang="pug">
  .born-data
    .born-data__item.born-data__item--date
      strong.born-data__label Дата рождения:
      | {{ bornData.bornDate }}
    .born-data__item.born-data__item--weight
      strong.born-data__label Вес:
      | {{ bornData.bornWeight }}
    .born-data__item.born-data__item--height
      strong.born-data__label Рост:
      | {{ bornData.bornHeight }}
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
    margin: 0 0 25px -5px;
  }

  .born-data__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    padding: 10px;
    background: rgba(255,255,255,0.5);
  }

  .born-data__label {
    margin-bottom: 5px;
  }
</style>
