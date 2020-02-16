<template>
  <div class="mt-4">
    <b-card class="text-center">
      {{ createdAt }}
      <span v-if="updatedAt !== createdAt"> (更新日：{{ updatedAt }}) </span>
      <nuxt-link
        :to="{
          name: 'blog-slug',
          params: {
            slug: slug
          }
        }"
        class="wrapper"
      >
        <b-card-title center class="mt-3"> {{ title }} </b-card-title>
      </nuxt-link>
      <b-card-sub-title class="mb-2">
        <nuxt-link
          :to="{
            name: 'blog-category-slug',
            params: {
              slug: categorySlug
            }
          }"
        >
          {{ categoryTitle }}
        </nuxt-link>
      </b-card-sub-title>
      <b-card-img src="https://picsum.photos/900/300/?random" />
      <b-card-text>
        あああああああああああああああああああああああああああああああ
        あああああああああああああああああああああああああああああああ
        あああああああああああああああああああああああああああああああ
      </b-card-text>
      todo:続きを見るボタン-> フル記事へのリンク
      <p class="card_date">{{ updatedAt }}</p>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    createdAt() {
      return this.dateFormat(this.item.sys.createdAt)
    },
    updatedAt() {
      return this.dateFormat(this.item.sys.updatedAt)
    },
    fields() {
      return this.item.fields
    },
    slug() {
      return this.item.fields.slug
    },
    title() {
      return this.item.fields.title
    },
    categoryTitle() {
      return this.item.categoryTitle
    },
    categorySlug() {
      return this.item.categorySlug
    }
  },
  methods: {
    dateFormat(dateString) {
      return dateString
        ? dateString
            .split('T')[0]
            .split('-')
            .join('/')
        : ''
    }
  }
}
</script>
