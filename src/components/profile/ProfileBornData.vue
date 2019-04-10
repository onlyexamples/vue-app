<template lang="pug">
  fieldset.form-section
    legend.form-title Данные ребенка при рождении:

    .form-field
      label.label(for="born_date") Дата рождения ребенка
      input.field(id="born_date" name="bornDate" type="date" v-model="bornDate" :disabled="!editableMode")

    .form-field.form-field--twice
      .form-field__part
        label.label(for="born_weight") Вес при рождении
        input.field(id="born_weight" name="bornWeight" type="number" v-model="bornWeight" required :disabled="!editableMode")

      .form-field__part
        label.label(for="born_height") Рост при рождении
        input.field(id="born_height" name="bornHeight" type="number" v-model="bornHeight" :disabled="!editableMode")
</template>

<script>
export default {
  name: 'ProfileBornData',

  data () {
    return {
      bornDate: null,
      bornWeight: 0,
      bornHeight: 0
    }
  },

  props: {
    editableMode: {
      type: Boolean,
      require: true
    }
  }
}
</script>
<style lang="postcss">
</style>
