<template>
  <div class="mt-4">
    <h1 class="posts_title text-center">
      お問い合わせ
    </h1>
    <client-only>
      <b-form @reset="onReset" v-if="show" netlify>
        <b-icon-envelope-fill />

        <b-form-group id="input-group-2" label="お名前" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="山田太郎"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Emailアドレス"
          label-for="input-1"
          description="Emailの利用については、プライバシーポリシーをご覧ください"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="xxxxx@example.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-3"
          label="お問い合わせカテゴリ"
          label-for="input-3"
        >
          <b-form-select
            id="input-3"
            v-model="form.category"
            :options="category"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="お問い合わせ内容"
          label-for="input-4"
        >
          <b-form-textarea
            id="input-4"
            v-model="form.text"
            placeholder="お問い合わせ内容を入力してください。"
            rows="20"
            max-rows="20"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">送信</b-button>
        <b-button type="reset" variant="danger">リセット</b-button>
      </b-form>
    </client-only>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        cateogry: null,
        text: ''
      },
      category: [
        { text: '選択してください', value: null },
        'ご質問',
        'ご依頼',
        'ご提案',
        'その他'
      ],
      show: true
    }
  },
  methods: {
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
