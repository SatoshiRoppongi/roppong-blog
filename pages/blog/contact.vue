<template>
  <div class="mt-4">
    <h1 class="posts_title text-center">お問い合わせ</h1>
    <div>
      下記フォームは正しく動作していない可能性があります。<br />
      ご用件がある方はこちらまで<br />
      roppongblog@gmail.com
    </div>
    <b-form v-if="show" @submit="onSubmit">
      <b-form-group id="input-group-1" label="お名前:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="例) 山田太郎"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="メールアドレス:"
        label-for="input-2"
        description="お問い合わせに返信する際に利用させていただきます(それ以外には利用しません)。"
      >
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="例) abcdefg@example.com"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-3"
        label="お問い合わせ内容:"
        label-for="input-3"
      >
        <b-form-textarea
          id="input-4"
          v-model="form.text"
          placeholder="お問い合わせ内容を入力してください。"
          rows="20"
          max-rows="20"
          name="text"
        ></b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="primary">送信</b-button>
    </b-form>
    <b-alert
      :show="alert.dismissCountDown"
      :variant="alert.color"
      dismissible
      @dismissed="alert.dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ alert.message }}
    </b-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        text: '',
        loading: false,
      },
      show: true,
      alert: {
        show: false,
        color: '',
        message: '',
        dismissSecs: 5,
        dismissCountDown: 0,
        showDismissibleAlert: false,
      },
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.form.loading = true
      // eslint-disable-next-line no-undef
      const mailer = firebase
        .app()
        .functions('asia-northeast1')
        .httpsCallable('sendMail')
      this.showAlert('info', '送信中です...')

      mailer(this.form)
        .then(() => {
          this.formReset()
          this.showAlert(
            'success',
            'お問い合わせありがとうございます。送信完了しました。'
          )
        })
        .catch((err) => {
          this.showAlert(
            'danger',
            '送信に失敗しました。時間をおいて再度お試しください。'
          )
          console.log(err)
        })
        .finally(() => {
          this.form.loading = false
        })
    },
    formReset() {
      this.form.email = ''
      this.form.name = ''
      this.form.text = ''
    },
    showAlert(color, message) {
      this.alert.message = message
      this.alert.color = color
      this.alert.show = true
      this.alert.dismissCountDown = this.alert.dismissSecs
    },
    countDownChanged(dismissCountDown) {
      this.alert.dismissCountDown = dismissCountDown
    },
  },
}
</script>
