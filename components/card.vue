<template>
  <div class="mt-4">
    <b-card class="text-center">
      {{ createdAt }}
      <span v-if="updatedAt !== createdAt"> (更新日：{{ updatedAt }}) </span>
      <b-badge v-if="dateDiff < 15" pill>New</b-badge>
      <nuxt-link
        :to="{
          name: 'blog-slug',
          params: {
            slug: slug
          }
        }"
        class="wrapper"
      >
        <b-card-title title-tag="h2" center class="mt-3">
          {{ title }}
        </b-card-title>
      </nuxt-link>
      <b-badge
        v-if="categorySlug"
        :to="{
          name: 'blog-category-slug',
          params: {
            slug: categorySlug
          }
        }"
        class="mb-2"
        variant="danger"
      >
        {{ categoryTitle }}
      </b-badge>
      <b-card-img :src="eyeCatchImageUrl" :alt="eyeCatchImageAlt" />
      <b-card-text v-html="abstruct" class="text-left my-5"> </b-card-text>
      <nuxt-link
        :to="{
          name: 'blog-slug',
          params: {
            slug: slug
          }
        }"
      >
        <b-button block variant="outline-primary">続きを見る</b-button>
      </nuxt-link>
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
    dateDiff() {
      const dateDiff =
        (new Date() - new Date(this.dateFormat(this.item.sys.createdAt))) /
        86400000
      return dateDiff
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
    },
    eyeCatchImageUrl() {
      return this.item.eyeCatchImageUrl
        ? 'https:' + this.item.eyeCatchImageUrl
        : 'https://picsum.photos/900/300/?random'
    },
    eyeCatchImageAlt() {
      return this.item.fields.images
        ? this.item.fields.images.fields.description
        : 'random eye catch image'
    },
    abstruct() {
      if (this.item.fields.body) {
        let endStr = this.item.fields.body.indexOf('[[toc]]')
        const maxStr = 200
        if (endStr === -1) {
          endStr = maxStr
        }
        return (
          this.item.fields.body
            .substring(0, Math.min(endStr, maxStr)) // 目次までの or maxStr文字数まで 表示する
            .replace(/\s+$/, '')
            .replace(/\r?\n/g, '<br>') + '...' // 文章が続く感を出したいので
        )
      } else {
        return ''
      }
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
