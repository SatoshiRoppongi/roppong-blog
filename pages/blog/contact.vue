<template>
  <div class="mt-4">
    <h1 class="posts_title text-center">
      お問い合わせ
    </h1>
    <div>
      お問い合わせフォームは現時点未実装です 何かある方はこちらへ。
      satoshiroppongi@gmail.com
    </div>
    <div>
      ※下記は現時点正しく動作する保証はありません
    </div>
    <b-form @submit="onSubmit" v-if="show">
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
        label="メールアドレス"
        label-for="input-2"
        description="メールアドレスの利用については、プライバシーポリシーをご覧ください"
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
        label="お問い合わせ内容"
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
      @dismissed="alert.dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      dismissible
    >
      {{ alert.message }}
    </b-alert>
  </div>
</template>

<script>
import { functions } from '@/plugins/firebase'
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        text: '',
        loading: false
      },
      show: true,
      alert: {
        show: false,
        color: '',
        message: '',
        dismissSecs: 5,
        dissmissCountDown: 0,
        showDismissibleAlert: false
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      this.form.loading = true
      const mailer = functions.httpsCallable('sendMail')

      mailer(this.form)
        .then(() => {
          this.formRset()
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
      this.$refs.form.reset()
    },
    showAlert(color, message) {
      this.alert.message = message
      this.alert.color = color
      this.alert.show = true
      this.dismissCountDown = this.dismissSecs
    },
    countDownChanged(dismissCountDown) {
      this.dissmissCountDown = dismissCountDown
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.category = null
      this.form.text = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
