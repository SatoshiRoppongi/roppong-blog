<template>
  <div class="mt-4">
    <b-card class="text-center">
      <nuxt-link
        :to="{
          name: 'blog-slug',
          params: {
            slug: fields.slug
          }
        }"
        class="wrapper"
      >
        <b-card-title center class="mt-3"> {{ fields.title }} </b-card-title>
      </nuxt-link>
      <b-card-sub-title class="mb-2">カテゴリ</b-card-sub-title>
      <b-card-img src="https://picsum.photos/900/300/?random" />
      <b-card-text>
        あああああああああああああああああああああああああああああああ
        あああああああああああああああああああああああああああああああ
        あああああああああああああああああああああああああああああああ
      </b-card-text>
      todo:続きを見るボタン-> フル記事へのリンク
      <p class="card_text">{{ id }}</p>
      <p class="card_date">{{ date }}</p>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    fields: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  }
}
</script>
