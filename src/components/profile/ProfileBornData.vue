<template lang="pug">
  form.form.form--profile(name="userBaby" :class="{ 'form--editable': !editableMode }" @submit.prevent="saveBornData")
    legend.form-title Данные ребенка при рождении:

    .form-field.form-field--error
      span(v-if="error" :value="error") {{ error.message }}

    .form-field
      label.label(for="born_date") Дата рождения ребенка
      input.field(id="born_date" name="userBaby_bornDate" type="date" v-model="bornDate" :disabled="!editableMode")

    .form-field.form-field--twice
      .form-field__part
        label.label(for="born_weight") Вес при рождении
        input.field(id="born_weight" name="userBaby_bornWeight" type="number" v-model="bornWeight" required :disabled="!editableMode")

      .form-field__part
        label.label(for="born_height") Рост при рождении
        input.field(id="born_height" name="userBaby_bornHeight" type="number" v-model="bornHeight" :disabled="!editableMode")

    .form-button
      button.button(v-if="editableMode" :disabled="loading" type="submit") {{ loading ? 'Загрузка...' : 'Сохранить' }}
      button.button.button--transparent(@click="toggleEditFields" type="button") {{ editableMode ? 'Отмена' : 'Редактировать' }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProfileBornData',

  data () {
    return {
      bornDate: '',
      bornWeight: 0,
      bornHeight: 0,
      editableMode: false
    }
  },

  computed: {
    ...mapGetters([
      'error',
      'loading',
      'bornData'
    ])
  },

  created () {
    this.bornDate = this.bornData.bornDate || ''
    this.bornWeight = this.bornData.bornWeight || 0
    this.bornHeight = this.bornData.bornHeight || 0
  },

  methods: {
    toggleEditFields () {
      this.editableMode = !this.editableMode
    },

    saveBornData () {
      let bornData = {}

      if (this.bornDate && this.bornDate.length > 0) { bornData.bornDate = this.bornDate }
      if (this.bornWeight > 0) { bornData.bornWeight = this.bornWeight }
      if (this.bornHeight > 0) { bornData.bornHeight = this.bornHeight }

      this.$store.dispatch('updateBornData', bornData)
        .then(() => {
          this.toggleEditFields()
        })
    }
  }
}
</script>

<style lang="postcss">
</style>
