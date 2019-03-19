<template lang="pug">
  fieldset.form-section
    legend.form-title Данные ребенка при рождении:

    .form-field
      label.label(for="born_date") Дата рождения ребенка
      input.field(id="born_date" name="bornDate" type="date" v-model="bornDate")

    .form-field.form-field--twice
      .form-field__part
        label.label(for="born_weight") Вес при рождении
        input.field(id="born_weight" name="bornWeight" type="number" v-model="bornWeight" required)

      .form-field__part
        label.label(for="born_height") Рост при рождении
        input.field(id="born_height" name="bornHeight" type="number" v-model="bornHeight")
</template>

<script>
export default {
  name: 'ProfileBornData',

  data () {
    return {
      bornDate: '',
      bornWeight: '',
      bornHeight: ''
    }
  }
}
</script>
<style lang="postcss">
</style>
