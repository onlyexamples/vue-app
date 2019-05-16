<template lang="pug">
  transition(name="fade")
    .modal
      .modal-window__overlay(@click="$emit('close')")
      .modal-window__wrapper
        button.modal-button(@click="$emit('close')") Закрыть

        .modal-window
          h3.modal-window__title Создание нового месяца

          form.form(name="month" @submit.prevent="saveNewMonthData")
            .form-field.form-field--twice
              .form-field__part
                label.label(for="month_number") Номер месяца
                select.field(
                  id="month_number"
                  name="monthNumber"
                  v-model="monthNumber"
                  :disabled="activeItemData"
                  required
                )
                  option(
                    v-for="monthNumber in 12"
                    :value="monthNumber"
                  ) {{ monthNumber }}

              .form-field__part
                label.label(for="month_tooth") Зубы (шт.)
                input.field(name="monthTooth" type="number" min="0" v-model="tooth")

            .form-field.form-field--twice
              .form-field__part
                label.label(for="month_weight") Вес (гр.)
                input.field(name="monthWeight" type="number" min="0" v-model="weight" required)

              .form-field__part
                label.label(for="month_height") Рост (см.)
                input.field(name="monthHeight" type="number" min="0" v-model="height" required)

            .form-field
              label.label(for="month_photo") Фото месяца

              .upload
                .button-upload__info(v-show="uploading")
                  .button-upload__file
                    span.button-upload__progress {{ uploadEnd ? "Файл загружен!" : `Загруженно: ${progressUpload} %` }}
                    span.button-upload__file-name(v-if="photoName") {{ photoName }}
                  button.button.button--delete(v-if="photoName" @click.prevent="deletePhoto") Удалить

                .button-upload
                  span.button-upload__text {{ activeItemData ? 'Загрузить новое фото' : 'Загрузить фото'}}
                  input(ref="uploadInput" id="month_photo" name="photo" type="file" @change="getFileName($event)")

            button.button(:disabled="loading") Сохранить
            //- .notify.notify--success
            //-   .notify__icon &#10004;
            //-   .notify__message Данные успешно сохранены!
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'

export default {
  name: 'ModalWindow',

  props: {
    activeItemData: {
      type: Object
    },

    isExistsMonth: {
      type: Boolean
    }
  },

  data () {
    return {
      photoName: '',
      monthNumber: 0,
      tooth: 0,
      weight: 0,
      height: 0,
      uploadTask: '',
      uploading: false,
      progressUpload: 0,
      uploadEnd: false,
      downloadURL: ''
    }
  },

  computed: {
    ...mapGetters(['loading', 'userId'])
  },

  methods: {
    saveNewMonthData () {
      let data = {
        monthNumber: this.monthNumber,
        tooth: this.tooth,
        weight: this.weight,
        height: this.height,
        photo: this.downloadURL
      }

      this.$store.dispatch('updateMonthsData', data)
      // this.$emit('showCurrentMonthData', this.monthNumber)
      if (!this.isExistsMonth) {
        this.clearform()
      }
    },

    clearform () {
      this.monthNumber = 0
      this.tooth = 0
      this.weight = 0
      this.height = 0
      this.downloadURL = ''
      this.$refs.uploadInput.value = null
      this.uploading = false
    },

    getFileName (e) {
      let selectedFile = e.target.files[0] || e.dataTransfer.files[0]
      this.uploadPhoto(selectedFile)
    },

    uploadPhoto (file) {
      this.photoName = file.name
      this.uploading = true
      this.uploadTask = Vue.$firebaseStorage.ref(`userPhotos/${this.userId}/${this.monthNumber}`).put(file)
    },

    deletePhoto () {
      Vue.$firebaseStorage
        .ref(`userPhotos/${this.userId}/${this.monthNumber}`)
        .delete()
        .then(() => {
          this.uploading = false
          this.uploadEnd = false
          this.downloadURL = ''
        })
        .catch((error) => {
          console.error(`file delete error occured: ${error}`)
        })
    }
  },

  watch: {
    uploadTask: function () {
      this.uploadTask.on('state_changed', sp => {
        this.progressUpload = Math.floor(sp.bytesTransferred / sp.totalBytes * 100)
      },
      null,
      () => {
        this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.uploadEnd = true
          this.downloadURL = downloadURL
        })
      })
    },

    activeItemData () {
      if (this.activeItemData) {
        this.monthNumber = this.activeItemData.monthNumber || 0
        this.tooth = this.activeItemData.tooth || 0
        this.weight = this.activeItemData.weight || 0
        this.height = this.activeItemData.height || 0
        this.downloadURL = this.activeItemData.photo || ''
      }
    }
  }
}
</script>

<style lang="postcss">
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal,
  .modal-window__overlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 15px;
    background: rgba(0, 0, 0, 0.7);
  }

  .modal-window__wrapper {
    position: relative;
    z-index: 2000;
  }

  .modal-window {
    padding: 15px;
    background: white;
  }

  .modal-button {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 40px;
    height: 40px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    background: white url("~@/assets/images/icons/close.svg") center no-repeat;
    background-size: 70%;
    text-indent: -9999px;
  }
</style>
