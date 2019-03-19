<template lang="pug">
  transition(name="fade")
    .modal-window__overlay
      .modal-window__wrapper
        button.modal-button(@click="$emit('close')") Закрыть

        .modal-window
          h3.modal-window__title Создание нового месяца

          form.form(name="month" @submit.prevent="saveNewMonthData")
            .form-field.form-field--twice
              .form-field__part
                label.label(for="month_number") Номер месяца
                select.field(id="month_number" name="monthNumber" v-model="monthNumber" required)
                  option(v-for="monthNumber in 12" :value="monthNumber") {{ monthNumber }}

              .form-field__part
                label.label(for="month_tooth") Зубы (шт.)
                input.field(name="monthTooth" type="number" v-model="tooth")

            .form-field.form-field--twice
              .form-field__part
                label.label(for="month_weight") Вес (гр.)
                input.field(name="monthWeight" type="number" v-model="weight" required)

              .form-field__part
                label.label(for="month_height") Рост (см.)
                input.field(name="monthHeight" type="number" v-model="height" required)

            .form-field
              label.label(for="month_photo") Фото месяца

              .button-upload__file
                span.button-upload__progress Загруженно: {{ progressUpload }}%
                span.button-upload__file-name {{ photoName }}
                button.button.button--delete(@click="deletePhoto") Удалить
              .button-upload
                span.button-upload__text Загрузить фото
                input.field(id="month_photo" name="photo" type="file" @change="getFileName($event)" required)

            button.button(:disabled="loading") Сохранить
</template>

<script>
import { mapGetters } from 'vuex'
import Vue from 'vue'

export default {
  name: 'ModalWindow',

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
      this.$store.dispatch('addNewMonth', {
        monthNumber: this.monthNumber,
        tooth: this.tooth,
        weight: this.weight,
        height: this.height,
        photo: this.downloadURL
      })

      this.clearForm()
    },

    clearForm () {
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
    }
  }
}
</script>

<style lang="postcss">
  .modal-window__overlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.7);
  }

  .modal-window__wrapper {
    position: relative;
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
    background: white;
    text-indent: -9999px;
  }
</style>
